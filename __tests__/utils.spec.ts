import { getTypeFromMimeType } from "../src/utils";

describe('utils', () => {
  describe('getTypeFromMimeType()', () => {
    it('should return the right type', () => {
      expect(getTypeFromMimeType('image/gif')).toEqual('image');
      expect(getTypeFromMimeType('image/png')).toEqual('image');
      expect(getTypeFromMimeType('video/mp4')).toEqual('video');
      expect(getTypeFromMimeType('audio/mp3')).toEqual('audio');
    });

    it('should return unknown when its a not supported type', () => {
      expect(getTypeFromMimeType('audioaudio/mp3')).toEqual('unknown');
    })
  })
})