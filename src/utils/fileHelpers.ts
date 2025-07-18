import { FileItem } from '@/types/file';

export type FileIconType = 'folder' | 'image' | 'video' | 'audio' | 'code' | 'markdown' | 'document' | 'word' | 'excel' | 'powerpoint';

export function getFileIconType(item: FileItem): FileIconType {
  if (item.type === 'folder') {
    return 'folder';
  }
  
  const mimeType = item.mimeType || '';
  const fileName = item.name.toLowerCase();
  
  if (mimeType.startsWith('image/')) {
    return 'image';
  }
  if (mimeType.startsWith('video/')) {
    return 'video';
  }
  if (mimeType.startsWith('audio/')) {
    return 'audio';
  }
  if (mimeType.startsWith('text/') || ['js', 'ts', 'jsx', 'tsx', 'py', 'java', 'cpp', 'c', 'go', 'rs'].some(ext => fileName.endsWith(`.${ext}`))) {
    return 'code';
  }
  if (fileName.endsWith('.md')) {
    return 'markdown';
  }
  
  // Office 文档类型检测
  if (['doc', 'docx'].some(ext => fileName.endsWith(`.${ext}`)) || 
      mimeType.includes('application/msword') || 
      mimeType.includes('application/vnd.openxmlformats-officedocument.wordprocessingml')) {
    return 'word';
  }
  
  if (['xls', 'xlsx'].some(ext => fileName.endsWith(`.${ext}`)) || 
      mimeType.includes('application/vnd.ms-excel') || 
      mimeType.includes('application/vnd.openxmlformats-officedocument.spreadsheetml')) {
    return 'excel';
  }
  
  if (['ppt', 'pptx'].some(ext => fileName.endsWith(`.${ext}`)) || 
      mimeType.includes('application/vnd.ms-powerpoint') || 
      mimeType.includes('application/vnd.openxmlformats-officedocument.presentationml')) {
    return 'powerpoint';
  }
  
  return 'document';
}

export function getFileTypeDisplay(file: FileItem): string {
  const mimeType = file.mimeType || '';
  const fileName = file.name.toLowerCase();
  const fileExt = fileName.split('.').pop() || '';
  
  if (mimeType.startsWith('image/')) return '图片文件';
  if (mimeType.startsWith('video/')) return '视频文件';
  if (mimeType.startsWith('audio/')) return '音频文件';
  if (mimeType === 'application/pdf') return 'PDF 文档';
  if (mimeType === 'text/markdown' || fileExt === 'md') return 'Markdown 文档';
  if (mimeType === 'application/json' || fileExt === 'json') return 'JSON 数据';
  if (['js', 'jsx', 'ts', 'tsx'].includes(fileExt)) return 'JavaScript/TypeScript';
  if (['py'].includes(fileExt)) return 'Python 脚本';
  if (['java'].includes(fileExt)) return 'Java 源码';
  if (['c', 'cpp', 'cc', 'cxx', 'h', 'hpp'].includes(fileExt)) return 'C/C++ 源码';
  if (['sql'].includes(fileExt)) return 'SQL 查询';
  if (['csv'].includes(fileExt)) return 'CSV 数据';
  
  // Office 文档类型显示
  if (['doc', 'docx'].includes(fileExt) || 
      mimeType.includes('application/msword') || 
      mimeType.includes('application/vnd.openxmlformats-officedocument.wordprocessingml')) {
    return 'Word 文档';
  }
  
  if (['xls', 'xlsx'].includes(fileExt) || 
      mimeType.includes('application/vnd.ms-excel') || 
      mimeType.includes('application/vnd.openxmlformats-officedocument.spreadsheetml')) {
    return 'Excel 表格';
  }
  
  if (['ppt', 'pptx'].includes(fileExt) || 
      mimeType.includes('application/vnd.ms-powerpoint') || 
      mimeType.includes('application/vnd.openxmlformats-officedocument.presentationml')) {
    return 'PowerPoint 演示文稿';
  }
  
  if (mimeType.startsWith('text/')) return '文本文件';
  
  return fileExt.toUpperCase() + ' 文件';
}