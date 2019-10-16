import * as Jszip from 'jszip';
import { ZipEntry } from './zipEntry';

export class ZipiZape {
  async readFile(file: File): Promise<ZipEntry[]> {
    const zip = await Jszip.loadAsync(file);
    const entries: ZipEntry[] = [];

    zip.forEach(zipEntry => {
      const entry = new ZipEntry(zip, zipEntry);
      entries.push(entry);
    })

    return entries
  }
}