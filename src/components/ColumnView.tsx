'use client';

import { useState, useEffect } from 'react';
import { FileItem, Column } from '@/types/file';
import { ChevronRightIcon, FolderIcon, DocumentIcon } from '@heroicons/react/24/outline';

interface ColumnViewProps {
  data: FileItem[];
}

export default function ColumnView({ data }: ColumnViewProps) {
  const [columns, setColumns] = useState<Column[]>([
    {
      id: 'root',
      items: data,
      path: '/',
    }
  ]);

  const handleItemClick = (columnId: string, item: FileItem) => {
    const columnIndex = columns.findIndex(col => col.id === columnId);
    
    // Update selected item in current column
    const updatedColumns = [...columns];
    updatedColumns[columnIndex] = {
      ...updatedColumns[columnIndex],
      selectedItem: item,
    };

    if (item.type === 'folder' && item.children) {
      // Remove columns after current one
      updatedColumns.splice(columnIndex + 1);
      
      // Add new column for folder contents
      updatedColumns.push({
        id: `${columnId}-${item.id}`,
        items: item.children,
        path: item.path,
      });
    } else {
      // For files, remove columns after current one and show preview
      updatedColumns.splice(columnIndex + 1);
    }

    setColumns(updatedColumns);
  };

  const getFileIcon = (item: FileItem) => {
    if (item.type === 'folder') {
      return <FolderIcon className="w-4 h-4 text-blue-500" />;
    }
    return <DocumentIcon className="w-4 h-4 text-gray-500" />;
  };

  const getSelectedFile = () => {
    for (let i = columns.length - 1; i >= 0; i--) {
      const column = columns[i];
      if (column.selectedItem && column.selectedItem.type === 'file') {
        return column.selectedItem;
      }
    }
    return null;
  };

  const selectedFile = getSelectedFile();

  return (
    <div className="flex h-full bg-white border border-gray-200 rounded-lg overflow-hidden">
      {/* Columns */}
      <div className="flex flex-1 min-w-0">
        {columns.map((column, index) => (
          <div
            key={column.id}
            className="flex-shrink-0 w-64 border-r border-gray-200 last:border-r-0"
          >
            <div className="h-full overflow-y-auto">
              {column.items.map((item) => (
                <div
                  key={item.id}
                  className={`flex items-center px-3 py-2 cursor-pointer hover:bg-gray-50 ${
                    column.selectedItem?.id === item.id ? 'bg-blue-50 border-r-2 border-blue-500' : ''
                  }`}
                  onClick={() => handleItemClick(column.id, item)}
                >
                  {getFileIcon(item)}
                  <span className="ml-2 text-sm truncate flex-1">{item.name}</span>
                  {item.type === 'folder' && (
                    <ChevronRightIcon className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Preview Panel */}
      {selectedFile && (
        <div className="flex-shrink-0 w-80 bg-gray-50 border-l border-gray-200">
          <div className="p-4 h-full overflow-y-auto">
            <div className="mb-4">
              <h3 className="text-lg font-medium text-gray-900 mb-2">{selectedFile.name}</h3>
              <div className="text-sm text-gray-500 space-y-1">
                <div>类型: {selectedFile.mimeType || '未知'}</div>
                {selectedFile.size && (
                  <div>大小: {formatFileSize(selectedFile.size)}</div>
                )}
                {selectedFile.modified && (
                  <div>修改时间: {selectedFile.modified.toLocaleDateString()}</div>
                )}
              </div>
            </div>
            
            <div className="border-t pt-4">
              <FilePreview file={selectedFile} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function FilePreview({ file }: { file: FileItem }) {
  if (!file.content) {
    return <div className="text-gray-500 text-sm">无法预览此文件</div>;
  }

  const mimeType = file.mimeType || '';

  if (mimeType.startsWith('image/')) {
    return (
      <div className="text-center">
        <img
          src={file.content}
          alt={file.name}
          className="max-w-full h-auto rounded border"
        />
      </div>
    );
  }

  if (mimeType.startsWith('text/') || mimeType === 'application/json') {
    return (
      <pre className="text-xs bg-white p-3 rounded border overflow-x-auto whitespace-pre-wrap">
        {file.content}
      </pre>
    );
  }

  return <div className="text-gray-500 text-sm">不支持预览此文件类型</div>;
}

function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}