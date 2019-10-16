jest.mock('jszip', () => {
  return {
    loadAsync() {
      return {
        forEach(callback) {
          callback('file_name.png')
          callback('video.mp4')
        }
      }
    }
  }
});

import { ZipiZape } from "../src";

describe('zipizape', () => {
  const setup = () => {
    return {
      
    };
  };
  
  it('should return all the entries from the zip', async () => {
    const zipi = new ZipiZape();
    const file = new File([new Blob()], '');
    const entries = await zipi.readFile(file);

    expect(entries).toHaveLength(2)
    expect(entries[0].name).toEqual('file_name.png');
  });
});
