// import * as zip from './ziplib/zip';
// TODO: import dynamically 
// const {zip} = require('./ziplib/zip');
// import * as zip from './ziplib/zip';
import {zip} from './ziplib/zip';

zip.useWebWorkers = false;

console.log(zip)

export class ZipiZape {
  async read(file: File) {
    return new Promise((resolve, reject) => {
      const onEnd = (entries: any) => {
        console.log({entries})

        entries.forEach((entry: any) => {
          console.log({entry})
          // entry.getData(writer, function(blob) {
					// 	console.log({blob});
					// 	var blobURL = creationMethod == "Blob" ? URL.createObjectURL(blob) : zipFileEntry.toURL();
					// 	onend(blobURL);
					// }, onprogress);
        })

        resolve(entries)
      };

      zip.createReader(new zip.BlobReader(file), (zipReader: any) => {
        zipReader.getEntries(onEnd);
      }, reject);
    })
  }
}