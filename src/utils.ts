import { FileType, FilePreview } from "./types";

export const getTypeFromMimeType = (mimeType: string): FileType => {
  if (mimeType.startsWith('video/')) return 'video';
  if (mimeType.startsWith('image/')) return 'image';
  if (mimeType.startsWith('audio/')) return 'audio';
  
  return 'unknown';
}

export  const getPreviewFromBlob = (blob?: Blob) => (): FilePreview => {
  const src = URL.createObjectURL(blob);
  const revoke = () => URL.revokeObjectURL(src);

  return {
    src,
    revoke
  }
}
