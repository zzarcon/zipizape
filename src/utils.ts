import {getExtension} from 'mime';
import { FileType, FilePreview } from "./types";

export const getTypeFromMimeType = (mimeType: string): FileType => {
  if (mimeType.startsWith('video/')) return 'video';
  if (mimeType.startsWith('image/')) return 'image';
  if (mimeType.startsWith('audio/')) return 'audio';
  if (mimeType.startsWith('application/pdf')) return 'doc';
  
  return 'unknown';
}

export  const getPreviewFromBlob = (blob?: Blob) => (): FilePreview | undefined => {
  if (!blob) return;

  const src = URL.createObjectURL(blob);
  const revoke = () => URL.revokeObjectURL(src);

  return {
    src,
    revoke
  }
}
