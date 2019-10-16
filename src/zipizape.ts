import * as Jszip from 'jszip';
import { ZipEntry } from './zipEntry';

export class ZipiZape {
  async readFile(file: File): Promise<ZipEntry[]> {
    const zip = await Jszip.loadAsync(file);
    const entries: ZipEntry[] = [];

    zip.forEach(zipEntry => {
      const isMACOSX = zipEntry.startsWith('__MACOSX');
      if (!isMACOSX) {
        const entry = new ZipEntry(zip as any, zipEntry);
        entries.push(entry);
      }
    })

    return entries
  }
}