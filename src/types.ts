export type FileType = 'image' | 'video' | 'audio' | 'unknown';

export interface EntryContent {
  isFolder: boolean;
  type: FileType;
  mimeType: string;
  name: string;
  getPreview: () => string;
  blob?: Blob;
}
