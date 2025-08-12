import { FileItem } from '@/types/file';
import fileListData from '@/data/fileList.json';

// 转换静态数据为 FileItem 格式
function convertToFileItem(item: any): FileItem {
  return {
    ...item,
    modified: item.modified ? new Date(item.modified) : undefined,
    children: item.children ? item.children.map(convertToFileItem) : undefined,
  };
}

// 静态文件系统，用于 Vercel 部署
export async function readDirectory(dirPath: string = ''): Promise<FileItem[]> {
  try {
    // 如果是根目录，返回完整的文件列表
    if (!dirPath || dirPath === '/') {
      return fileListData.map(convertToFileItem);
    }
    
    // 查找指定路径的子目录
    const findInDirectory = (items: FileItem[], targetPath: string): FileItem[] => {
      for (const item of items) {
        if (item.path === targetPath && item.type === 'folder' && item.children) {
          return item.children;
        }
        if (item.children) {
          const found = findInDirectory(item.children, targetPath);
          if (found.length > 0) {
            return found;
          }
        }
      }
      return [];
    };
    
    return findInDirectory(fileListData.map(convertToFileItem), dirPath);
  } catch (error) {
    console.error('Error reading static directory:', error);
    return [];
  }
}

// 根据路径查找文件
export function findFileByPath(filePath: string): FileItem | null {
  const findInItems = (items: FileItem[], targetPath: string): FileItem | null => {
    for (const item of items) {
      if (item.path === targetPath) {
        return item;
      }
      if (item.children) {
        const found = findInItems(item.children, targetPath);
        if (found) {
          return found;
        }
      }
    }
    return null;
  };
  
  return findInItems(fileListData.map(convertToFileItem), filePath);
}