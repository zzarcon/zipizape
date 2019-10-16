import { FileType } from "./types";

export const getTypeFromMimeType = (mimeType: string): FileType => {
  if (mimeType.startsWith('video/')) return 'video';
  if (mimeType.startsWith('image/')) return 'image';
  if (mimeType.startsWith('audio/')) return 'audio';
  
  return 'unknown';
}