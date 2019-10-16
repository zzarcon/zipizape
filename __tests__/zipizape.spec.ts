jest.mock('jszip')
import * as Jszip from 'jszip';
import { ZipiZape } from "../src";

describe('zipizape', () => {
  const setup = async (mockValue?: any) => {
    const defaultMockValue = {
      forEach(callback) {
        callback('file_name.png')
        callback('video.mp4')
      }
    }

    jest.spyOn(Jszip, 'loadAsync').mockReturnValue(mockValue || defaultMockValue)
    
    const zipi = new ZipiZape();
    const file = new File([new Blob()], '');
    const entries = await zipi.readFile(file);

    return {
      entries
    };
  };
  
  it('should return all the entries from the zip', async () => {
    const {entries} = await setup();

    expect(entries).toHaveLength(2)
    expect(entries[0].name).toEqual('file_name.png');
  });

  it('should ignore macox entries', async () => {
    const {entries} = await setup({
      forEach(callback) {
        callback('__MACOSX/foo.png')
        callback('__MACOSX');
        callback('video.mp4')
      }
    });
    
    expect(entries).toHaveLength(1)
    expect(entries[0].name).toEqual('video.mp4');
  })
});
