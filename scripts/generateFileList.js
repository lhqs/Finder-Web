const fs = require('fs');
const path = require('path');

// 生成文件列表的脚本
function generateFileList(dirPath, basePath = '') {
  const items = [];
  
  try {
    const entries = fs.readdirSync(dirPath, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(dirPath, entry.name);
      const relativePath = path.join(basePath, entry.name);
      const stats = fs.statSync(fullPath);
      
      const item = {
        id: relativePath.replace(/\\/g, '/'),
        name: entry.name,
        type: entry.isDirectory() ? 'folder' : 'file',
        path: '/' + relativePath.replace(/\\/g, '/'),
        size: entry.isFile() ? stats.size : undefined,
        modified: stats.mtime.toISOString(),
        mimeType: entry.isFile() ? getMimeType(entry.name) : undefined,
      };
      
      if (entry.isDirectory()) {
        item.children = generateFileList(fullPath, relativePath);
      } else if (entry.isFile() && stats.size < 1024 * 1024 && isTextFile(entry.name)) {
        try {
          item.content = fs.readFileSync(fullPath, 'utf-8');
        } catch (error) {
          // 忽略读取错误
        }
      }
      
      items.push(item);
    }
    
    // 排序：文件夹在前，然后按名称排序
    return items.sort((a, b) => {
      if (a.type !== b.type) {
        return a.type === 'folder' ? -1 : 1;
      }
      return a.name.localeCompare(b.name, 'zh-CN');
    });
    
  } catch (error) {
    console.error('Error reading directory:', dirPath, error);
    return [];
  }
}

function getMimeType(filename) {
  const ext = path.extname(filename).toLowerCase();
  const mimeTypes = {
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
    '.sql': 'text/plain',
    '.py': 'text/plain',
    '.java': 'text/plain',
    '.cpp': 'text/plain',
    '.c': 'text/plain',
    '.h': 'text/plain',
    '.php': 'text/plain',
    '.rb': 'text/plain',
    '.go': 'text/plain',
    '.rs': 'text/plain',
    '.sh': 'text/plain',
    '.bat': 'text/plain',
    '.ps1': 'text/plain',
    '.ini': 'text/plain',
    '.conf': 'text/plain',
    '.config': 'text/plain',
    '.env': 'text/plain',
    '.gitignore': 'text/plain',
    '.dockerfile': 'text/plain',
    // 图片格式
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.webp': 'image/webp',
    '.bmp': 'image/bmp',
    '.ico': 'image/x-icon',
    // 视频格式
    '.mp4': 'video/mp4',
    '.webm': 'video/webm',
    '.ogv': 'video/ogg',
    '.mov': 'video/quicktime',
    '.avi': 'video/x-msvideo',
    '.wmv': 'video/x-ms-wmv',
    '.flv': 'video/x-flv',
    '.mkv': 'video/x-matroska',
    // 音频格式
    '.mp3': 'audio/mpeg',
    '.wav': 'audio/wav',
    '.ogg': 'audio/ogg',
    '.aac': 'audio/aac',
    '.m4a': 'audio/mp4',
    '.flac': 'audio/flac',
    '.wma': 'audio/x-ms-wma',
    // 文档格式
    '.pdf': 'application/pdf',
    '.doc': 'application/msword',
    '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    '.xls': 'application/vnd.ms-excel',
    '.xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    '.ppt': 'application/vnd.ms-powerpoint',
    '.pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  };
  
  return mimeTypes[ext] || 'application/octet-stream';
}

function isTextFile(filename) {
  const ext = path.extname(filename).toLowerCase();
  const textExtensions = [
    '.txt', '.md', '.json', '.js', '.ts', '.jsx', '.tsx',
    '.html', '.css', '.xml', '.yml', '.yaml', '.csv', '.log',
    '.sql', '.py', '.java', '.cpp', '.c', '.h', '.php',
    '.rb', '.go', '.rs', '.sh', '.bat', '.ps1', '.ini',
    '.conf', '.config', '.env', '.gitignore', '.dockerfile'
  ];
  
  return textExtensions.includes(ext);
}

// 生成文件列表
const filesPath = path.join(__dirname, '../public/files');
const fileList = generateFileList(filesPath);

// 写入到数据文件
const outputPath = path.join(__dirname, '../src/data/fileList.json');
fs.writeFileSync(outputPath, JSON.stringify(fileList, null, 2));

console.log('File list generated successfully!');
console.log(`Generated ${fileList.length} items`);