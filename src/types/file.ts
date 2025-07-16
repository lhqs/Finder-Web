export interface FileItem {
  id: string;
  name: string;
  type: 'file' | 'folder';
  path: string;
  size?: number;
  modified?: Date;
  children?: FileItem[];
  content?: string;
  mimeType?: string;
}

export interface Column {
  id: string;
  items: FileItem[];
  selectedItem?: FileItem;
  path: string;
}