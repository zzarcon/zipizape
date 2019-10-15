import * as Jszip from 'jszip';
import {getType} from 'mime';

export type FileType = 'image' | 'video' | 'unknown';

export interface EntryContent {
  blob: Blob;
  type: FileType;
  mimeType: string;
  name: string;
  getPreview: () => string;
}

const getTypeFromMimeType = (mimeType: string): FileType => {
  return mimeType.startsWith('video/') ? 'video' : (
    mimeType.startsWith('image/') ? 'image' : 'unknown'
  );
}

export class Entry {
  private zip: Jszip;
  private zipEntry: string;

  constructor(zip: Jszip, zipEntry: string) {
    this.zip = zip;
    this.zipEntry = zipEntry;
  }

  // TODO: should we flat all the files?
  async getContent(): Promise<EntryContent | undefined> {
    const isFolder = this.zip.files[this.zipEntry].dir;
    if (isFolder) {
      this.zip.folder(this.zipEntry);
      // TODO: return folder? some folders seems to be fake?
      return;
    }
    const file = this.zip.file(this.zipEntry);
    const mimeType = getType(this.zipEntry) || '';
    const blob = await file.async('blob');

    // TODO: extract into a class
    return {
      blob,
      mimeType,
      type: getTypeFromMimeType(mimeType),
      name: this.name,
      getPreview: () => URL.createObjectURL(blob)
      // TODO: add isImage, isVideo
    };
  }

  get name(): string {
    return this.zipEntry;
  }
}

export class ZipiZape {
  async readFile(file: File): Promise<Entry[]> {
    return new Promise(async resolve => {
      const zip = await Jszip.loadAsync(file);
      const entries: Entry[] = [];

      zip.forEach(zipEntry => {
        const entry = new Entry(zip, zipEntry);
        
        entries.push(entry);
      })

      resolve(entries);
    })  
  }
}