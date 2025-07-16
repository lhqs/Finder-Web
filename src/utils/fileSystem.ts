import fs from 'fs';
import path from 'path';
import { FileItem } from '@/types/file';

const ROOT_PATH = '/Users/lhqs/jijifeng';

export async function readDirectory(dirPath: string = ROOT_PATH): Promise<FileItem[]> {
  try {
    const items = await fs.promises.readdir(dirPath, { withFileTypes: true });
    const fileItems: FileItem[] = [];

    for (const item of items) {
      // 跳过隐藏文件和系统文件
      if (item.name.startsWith('.')) continue;

      const fullPath = path.join(dirPath, item.name);
      const relativePath = path.relative(ROOT_PATH, fullPath);
      const stats = await fs.promises.stat(fullPath);

      const fileItem: FileItem = {
        id: relativePath || item.name,
        name: item.name,
        type: item.isDirectory() ? 'folder' : 'file',
        path: `/${relativePath}`,
        size: item.isFile() ? stats.size : undefined,
        modified: stats.mtime,
      };

      if (item.isFile()) {
        fileItem.mimeType = getMimeType(item.name);
        // 只读取小文件的内容用于预览
        if (stats.size < 100 * 1024) { // 小于100KB
          try {
            const content = await fs.promises.readFile(fullPath, 'utf-8');
            fileItem.content = content;
          } catch (error) {
            // 如果不是文本文件，跳过内容读取
            fileItem.content = undefined;
          }
        }
      } else if (item.isDirectory()) {
        // 递归读取子目录
        try {
          fileItem.children = await readDirectory(fullPath);
        } catch (error) {
          // 如果无法读取子目录，设置为空数组
          fileItem.children = [];
        }
      }

      fileItems.push(fileItem);
    }

    // 按类型和名称排序：文件夹在前，然后按名称排序
    return fileItems.sort((a, b) => {
      if (a.type !== b.type) {
        return a.type === 'folder' ? -1 : 1;
      }
      return a.name.localeCompare(b.name, 'zh-CN');
    });

  } catch (error) {
    console.error('Error reading directory:', error);
    return [];
  }
}

function getMimeType(filename: string): string {
  const ext = path.extname(filename).toLowerCase();
  const mimeTypes: { [key: string]: string } = {
    '.txt': 'text/plain',
    '.md': 'text/markdown',
    '.json': 'application/json',
    '.js': 'text/javascript',
    '.ts': 'text/typescript',
    '.jsx': 'text/javascript',
    '.tsx': 'text/typescript',
    '.html': 'text/html',
    '.css': 'text/css',
    '.xml': 'text/xml',
    '.yml': 'text/yaml',
    '.yaml': 'text/yaml',
    '.csv': 'text/csv',
    '.log': 'text/plain',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.webp': 'image/webp',
    '.pdf': 'application/pdf',
    '.doc': 'application/msword',
    '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    '.xls': 'application/vnd.ms-excel',
    '.xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  };
  
  return mimeTypes[ext] || 'application/octet-stream';
}