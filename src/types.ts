export type FileType = 'image' | 'video' | 'audio' | 'unknown';

export interface FilePreview {
  src: string;
  revoke: Function;
}

export interface EntryContent {
  isFolder: boolean;
  type: FileType;
  mimeType: string;
  name: string;
  getPreview: () => FilePreview;
  blob?: Blob;
}
