import * as Jszip from 'jszip';
import {getType} from 'mime';

export interface EntryContent {
  blob: Blob;
  type: string;
}

export class Entry {
  zip: Jszip;
  zipEntry: string;

  constructor(zip: Jszip, zipEntry: string) {
    this.zip = zip;
    this.zipEntry = zipEntry;
  }

  async getContent(): Promise<EntryContent | undefined> {
    const isFolder = this.zip.files[this.zipEntry].dir;
    if (isFolder) {
      this.zip.folder(this.zipEntry);
      // TODO: return folder? some folders seems to be fake?
      return;
    }
    const file = this.zip.file(this.zipEntry);
    const type = getType(this.zipEntry);
    const blob = await file.async('blob');

    return {blob, type};
  }
}

export class ZipiZape {
  async readFile(file: File): Promise<Entry[]> {
    return new Promise(async resolve => {
      const zip = await Jszip.loadAsync(file);
      const entries: Entry[] = [];

      zip.forEach(zipEntry => {
        console.log({zipEntry})
        const entry = new Entry(zip, zipEntry);
        
        entries.push(entry);
      })

      resolve(entries);
    })  
  }
}