export type FileType = 'image' | 'video' | 'audio' | 'doc' | 'archive' | 'unknown';

export interface FilePreview {
  src: string;
  revoke: Function;
}

export interface EntryContent {
  isFolder: boolean;
  type: FileType;
  mimeType: string;
  name: string;
  getPreview: () => FilePreview | undefined;
  blob?: Blob;
}
