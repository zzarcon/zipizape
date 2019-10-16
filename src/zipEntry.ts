import * as Jszip from 'jszip';
import {getType} from 'mime';
import { EntryContent } from './types';
import { getTypeFromMimeType } from './utils';

export class ZipEntry {
  private zip: Jszip;
  private zipEntry: string;

  constructor(zip: Jszip, zipEntry: string) {
    this.zip = zip;
    this.zipEntry = zipEntry;
  }

  // TODO: should we flat all the files?
  async getContent(): Promise<EntryContent> {
    const isFolder = this.zip.files[this.zipEntry].dir;
    let blob: Blob | undefined;
    if (!isFolder) {
      // this.zip.folder(this.zipEntry);
      // TODO: return folder? some folders seems to be fake?
      const file = this.zip.file(this.zipEntry);  
      blob = await file.async('blob');
    }
    
    const mimeType = getType(this.zipEntry) || '';

    // TODO: extract into a class
    return {
      blob,
      mimeType,
      isFolder,
      type: getTypeFromMimeType(mimeType),
      name: this.name,
      // TODO: getPreview: {preview, revoke}
      getPreview: () => URL.createObjectURL(blob)
    };
  }

  get name(): string {
    return this.zipEntry;
  }
}