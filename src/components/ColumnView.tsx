'use client';

import { useState, useEffect } from 'react';
import { FileItem, Column } from '@/types/file';
import { ChevronRightIcon, FolderIcon, DocumentIcon } from '@heroicons/react/24/outline';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/cjs/styles/prism';

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
    
    // Auto scroll to show new column
    setTimeout(() => {
      const columnsContainer = document.querySelector('.columns-container');
      if (columnsContainer) {
        columnsContainer.scrollLeft = columnsContainer.scrollWidth;
      }
    }, 50);
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
      {/* Columns Container with Horizontal Scroll - 2/3 width */}
      <div className="w-2/3 overflow-x-auto border-r border-gray-200 columns-container">
        <div className="flex min-w-max h-full">
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
      </div>

      {/* Preview Panel - 1/3 width */}
      <div className="w-1/3 bg-gray-50">
        {selectedFile ? (
          <div className="p-4 h-full overflow-y-auto">
            <div className="mb-4">
              <h3 className="text-lg font-medium text-gray-900 mb-2 break-words">{selectedFile.name}</h3>
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
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            <div className="text-center">
              <DocumentIcon className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <p>选择文件查看预览</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function FilePreview({ file }: { file: FileItem }) {
  const mimeType = file.mimeType || '';
  const fileName = file.name.toLowerCase();
  const fileExt = fileName.split('.').pop() || '';

  // 图片预览
  if (mimeType.startsWith('image/')) {
    if (file.content) {
      return (
        <div className="text-center">
          <img
            src={file.content}
            alt={file.name}
            className="max-w-full h-auto rounded border shadow-sm"
          />
        </div>
      );
    } else {
      // 对于真实文件系统中的图片，使用文件路径
      const imagePath = `/api/file?path=${encodeURIComponent(file.path)}`;
      return (
        <div className="text-center">
          <img
            src={imagePath}
            alt={file.name}
            className="max-w-full h-auto rounded border shadow-sm"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
              (e.target as HTMLImageElement).nextElementSibling!.textContent = '无法加载图片';
            }}
          />
          <div className="text-gray-500 text-sm mt-2 hidden">无法加载图片</div>
        </div>
      );
    }
  }

  // PDF 预览
  if (mimeType === 'application/pdf') {
    const pdfPath = `/api/file?path=${encodeURIComponent(file.path)}`;
    return (
      <div className="w-full h-96">
        <iframe
          src={pdfPath}
          className="w-full h-full border rounded"
          title={file.name}
        />
      </div>
    );
  }

  // 视频预览
  if (mimeType.startsWith('video/') || ['mp4', 'webm', 'ogg', 'mov', 'avi'].includes(fileExt)) {
    const videoPath = `/api/file?path=${encodeURIComponent(file.path)}`;
    return (
      <div className="w-full">
        <video
          controls
          className="w-full max-h-64 rounded border"
          preload="metadata"
        >
          <source src={videoPath} type={mimeType} />
          您的浏览器不支持视频播放
        </video>
      </div>
    );
  }

  // 音频预览
  if (mimeType.startsWith('audio/') || ['mp3', 'wav', 'ogg', 'aac', 'm4a'].includes(fileExt)) {
    const audioPath = `/api/file?path=${encodeURIComponent(file.path)}`;
    return (
      <div className="w-full">
        <audio
          controls
          className="w-full"
          preload="metadata"
        >
          <source src={audioPath} type={mimeType} />
          您的浏览器不支持音频播放
        </audio>
      </div>
    );
  }

  // 文本内容预览
  if (file.content) {
    // Markdown 预览
    if (mimeType === 'text/markdown' || fileExt === 'md') {
      return <MarkdownPreview content={file.content} />;
    }

    // JSON 预览
    if (mimeType === 'application/json' || fileExt === 'json') {
      try {
        const formatted = JSON.stringify(JSON.parse(file.content), null, 2);
        return <CodePreview content={formatted} language="json" />;
      } catch {
        return <CodePreview content={file.content} language="json" />;
      }
    }

    // SQL 预览
    if (fileExt === 'sql') {
      return <CodePreview content={file.content} language="sql" />;
    }

    // JavaScript/TypeScript 预览
    if (['js', 'jsx', 'ts', 'tsx'].includes(fileExt)) {
      return <CodePreview content={file.content} language={fileExt} />;
    }

    // CSS 预览
    if (fileExt === 'css') {
      return <CodePreview content={file.content} language="css" />;
    }

    // HTML 预览
    if (fileExt === 'html' || fileExt === 'htm') {
      return <CodePreview content={file.content} language="html" />;
    }

    // Python 预览
    if (fileExt === 'py') {
      return <CodePreview content={file.content} language="python" />;
    }

    // Java 预览
    if (fileExt === 'java') {
      return <CodePreview content={file.content} language="java" />;
    }

    // C/C++ 预览
    if (['c', 'cpp', 'cc', 'cxx', 'h', 'hpp'].includes(fileExt)) {
      return <CodePreview content={file.content} language="cpp" />;
    }

    // PHP 预览
    if (fileExt === 'php') {
      return <CodePreview content={file.content} language="php" />;
    }

    // Go 预览
    if (fileExt === 'go') {
      return <CodePreview content={file.content} language="go" />;
    }

    // Rust 预览
    if (fileExt === 'rs') {
      return <CodePreview content={file.content} language="rust" />;
    }

    // Shell 脚本预览
    if (['sh', 'bash', 'zsh'].includes(fileExt)) {
      return <CodePreview content={file.content} language="bash" />;
    }

    // YAML 预览
    if (['yml', 'yaml'].includes(fileExt)) {
      return <CodePreview content={file.content} language="yaml" />;
    }

    // XML 预览
    if (fileExt === 'xml') {
      return <CodePreview content={file.content} language="xml" />;
    }

    // CSV 预览
    if (fileExt === 'csv') {
      return <CSVPreview content={file.content} />;
    }

    // 其他文本文件
    if (mimeType.startsWith('text/') || ['txt', 'log', 'yml', 'yaml', 'xml'].includes(fileExt)) {
      return (
        <pre className="text-xs bg-white p-3 rounded border overflow-x-auto whitespace-pre-wrap font-mono">
          {file.content}
        </pre>
      );
    }
  }

  // 大文件或二进制文件
  if (file.size && file.size > 100 * 1024) {
    return (
      <div className="text-gray-500 text-sm space-y-2">
        <div>文件过大，无法预览</div>
        <div className="text-xs">文件大小: {formatFileSize(file.size)}</div>
      </div>
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

// Markdown 预览组件
function MarkdownPreview({ content }: { content: string }) {
  return (
    <div className="prose prose-sm max-w-none bg-white p-4 rounded border shadow-sm">
      <ReactMarkdown
        components={{
          h1: ({children}) => <h1 className="text-xl font-bold text-gray-900 mb-3 border-b pb-2">{children}</h1>,
          h2: ({children}) => <h2 className="text-lg font-semibold text-gray-800 mb-2 mt-4">{children}</h2>,
          h3: ({children}) => <h3 className="text-base font-medium text-gray-700 mb-2 mt-3">{children}</h3>,
          p: ({children}) => <p className="text-gray-600 mb-2 leading-relaxed">{children}</p>,
          ul: ({children}) => <ul className="list-disc list-inside text-gray-600 mb-2 space-y-1">{children}</ul>,
          ol: ({children}) => <ol className="list-decimal list-inside text-gray-600 mb-2 space-y-1">{children}</ol>,
          li: ({children}) => <li className="text-gray-600">{children}</li>,
          code: ({children}) => <code className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono text-gray-800">{children}</code>,
          pre: ({children}) => <pre className="bg-gray-100 p-3 rounded overflow-x-auto text-sm">{children}</pre>,
          blockquote: ({children}) => <blockquote className="border-l-4 border-blue-200 pl-4 italic text-gray-600 my-2">{children}</blockquote>,
          strong: ({children}) => <strong className="font-semibold text-gray-800">{children}</strong>,
          em: ({children}) => <em className="italic text-gray-700">{children}</em>,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

// 代码预览组件
function CodePreview({ content, language }: { content: string; language: string }) {
  return (
    <div className="rounded border overflow-hidden">
      <SyntaxHighlighter
        language={language}
        style={tomorrow}
        customStyle={{
          margin: 0,
          fontSize: '12px',
          maxHeight: '400px',
        }}
      >
        {content}
      </SyntaxHighlighter>
    </div>
  );
}

// CSV 预览组件
function CSVPreview({ content }: { content: string }) {
  const lines = content.split('\n').filter(line => line.trim());
  if (lines.length === 0) return <div className="text-gray-500 text-sm">空文件</div>;
  
  const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
  const rows = lines.slice(1, 11).map(line => 
    line.split(',').map(cell => cell.trim().replace(/"/g, ''))
  );
  
  return (
    <div className="bg-white rounded border overflow-x-auto">
      <table className="min-w-full text-xs">
        <thead className="bg-gray-50">
          <tr>
            {headers.map((header, index) => (
              <th key={index} className="px-2 py-1 text-left font-medium text-gray-900 border-b">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex} className="border-b border-gray-100">
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className="px-2 py-1 text-gray-700">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {lines.length > 11 && (
        <div className="px-2 py-1 text-xs text-gray-500 bg-gray-50 border-t">
          显示前 10 行，共 {lines.length - 1} 行数据
        </div>
      )}
    </div>
  );
}