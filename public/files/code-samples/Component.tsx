import React, { useState, useEffect, useCallback } from 'react';
import { ChevronRightIcon, DocumentIcon, FolderIcon } from '@heroicons/react/24/outline';

// TypeScript 接口定义
interface FileItem {
  name: string;
  type: 'file' | 'directory';
  size?: number;
  lastModified?: Date;
  path: string;
}

interface FileExplorerProps {
  rootPath: string;
  onFileSelect?: (file: FileItem) => void;
  className?: string;
}

// React 函数组件示例
const FileExplorer: React.FC<FileExplorerProps> = ({
  rootPath,
  onFileSelect,
  className = ''
}) => {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null);

  // 获取文件列表的异步函数
  const fetchFiles = useCallback(async (path: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/files?path=${encodeURIComponent(path)}`);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      setFiles(data.files || []);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '未知错误';
      setError(`加载文件失败: ${errorMessage}`);
      console.error('文件加载错误:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // 组件挂载时获取文件
  useEffect(() => {
    fetchFiles(rootPath);
  }, [rootPath, fetchFiles]);

  // 处理文件选择
  const handleFileClick = (file: FileItem) => {
    setSelectedFile(file);
    onFileSelect?.(file);
  };

  // 格式化文件大小
  const formatFileSize = (size?: number): string => {
    if (!size) return '-';
    
    const units = ['B', 'KB', 'MB', 'GB'];
    let unitIndex = 0;
    let fileSize = size;

    while (fileSize >= 1024 && unitIndex < units.length - 1) {
      fileSize /= 1024;
      unitIndex++;
    }

    return `${fileSize.toFixed(1)} ${units[unitIndex]}`;
  };

  // 渲染文件项
  const renderFileItem = (file: FileItem) => {
    const isSelected = selectedFile?.path === file.path;
    const Icon = file.type === 'directory' ? FolderIcon : DocumentIcon;

    return (
      <div
        key={file.path}
        className={`
          flex items-center p-3 cursor-pointer rounded-lg transition-colors
          ${isSelected 
            ? 'bg-blue-100 border-blue-300' 
            : 'hover:bg-gray-50 border-transparent'
          }
          border
        `}
        onClick={() => handleFileClick(file)}
      >
        <Icon className="w-5 h-5 mr-3 text-gray-500" />
        
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 truncate">
            {file.name}
          </p>
          <p className="text-xs text-gray-500">
            {formatFileSize(file.size)} • {file.lastModified?.toLocaleDateString()}
          </p>
        </div>

        {file.type === 'directory' && (
          <ChevronRightIcon className="w-4 h-4 text-gray-400" />
        )}
      </div>
    );
  };

  return (
    <div className={`file-explorer ${className}`}>
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-900">
          文件浏览器
        </h2>
        <p className="text-sm text-gray-600">
          当前路径: {rootPath}
        </p>
      </div>

      {loading && (
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-2 text-gray-600">加载中...</span>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
          <p className="text-red-800">{error}</p>
          <button
            onClick={() => fetchFiles(rootPath)}
            className="mt-2 text-sm text-red-600 hover:text-red-800 underline"
          >
            重试
          </button>
        </div>
      )}

      {!loading && !error && (
        <div className="space-y-1">
          {files.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              此文件夹为空
            </p>
          ) : (
            files.map(renderFileItem)
          )}
        </div>
      )}
    </div>
  );
};

export default FileExplorer;