'use client';

import { useState, useRef, useEffect } from 'react';
import { FileItem, Column } from '@/types/file';
import { 
  ChevronRightIcon, 
  FolderIcon, 
  DocumentIcon,
  ArrowsPointingOutIcon,
  ArrowsPointingInIcon,
  ArrowDownTrayIcon,
  EyeIcon,
  DocumentTextIcon,
  PhotoIcon,
  FilmIcon,
  MusicalNoteIcon,
  CodeBracketIcon
} from '@heroicons/react/24/outline';
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
  const [isPreviewExpanded, setIsPreviewExpanded] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

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
    
    // 如果是文件夹，自动滚动到最右侧
    if (item.type === 'folder' && item.children) {
      setTimeout(() => {
        if (scrollContainerRef.current) {
          scrollContainerRef.current.scrollLeft = scrollContainerRef.current.scrollWidth;
        }
      }, 50);
    }
  };

  const getFileIcon = (item: FileItem) => {
    if (item.type === 'folder') {
      return <FolderIcon className="w-4 h-4 text-blue-500" />;
    }
    
    const mimeType = item.mimeType || '';
    const fileName = item.name.toLowerCase();
    
    if (mimeType.startsWith('image/')) {
      return <PhotoIcon className="w-4 h-4 text-green-500" />;
    }
    if (mimeType.startsWith('video/')) {
      return <FilmIcon className="w-4 h-4 text-purple-500" />;
    }
    if (mimeType.startsWith('audio/')) {
      return <MusicalNoteIcon className="w-4 h-4 text-pink-500" />;
    }
    if (mimeType.startsWith('text/') || ['js', 'ts', 'jsx', 'tsx', 'py', 'java', 'cpp', 'c', 'go', 'rs'].some(ext => fileName.endsWith(`.${ext}`))) {
      return <CodeBracketIcon className="w-4 h-4 text-orange-500" />;
    }
    if (fileName.endsWith('.md')) {
      return <DocumentTextIcon className="w-4 h-4 text-blue-600" />;
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

  const handleDownload = (file: FileItem) => {
    const downloadUrl = `/api/file?path=${encodeURIComponent(file.path)}&download=true`;
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = file.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex h-full bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
      {/* Columns Container */}
      <div 
        ref={scrollContainerRef}
        className={`${isPreviewExpanded ? 'w-1/4' : 'w-2/3'} transition-all duration-300 overflow-x-auto border-r border-gray-200`}
      >
        <div className="flex min-w-max h-full">
          {columns.map((column, index) => (
            <div
              key={column.id}
              className="flex-shrink-0 w-64 border-r border-gray-100 last:border-r-0"
            >
              <div className="h-full overflow-y-auto">
                {column.items.map((item) => (
                  <div
                    key={item.id}
                    className={`flex items-center px-3 py-2.5 cursor-pointer transition-all duration-150 hover:bg-gray-50 ${
                      column.selectedItem?.id === item.id 
                        ? 'bg-blue-50 border-r-2 border-blue-500 text-blue-900' 
                        : 'text-gray-700'
                    }`}
                    onClick={() => handleItemClick(column.id, item)}
                  >
                    {getFileIcon(item)}
                    <span className="ml-3 text-sm truncate flex-1 font-medium">{item.name}</span>
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

      {/* Preview Panel */}
      <div className={`${isPreviewExpanded ? 'w-3/4' : 'w-1/3'} transition-all duration-300 bg-gray-50`}>
        {selectedFile ? (
          <div className="h-full flex flex-col">
            {/* Preview Header */}
            <div className="flex-shrink-0 bg-white border-b border-gray-200 p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-2">
                    {getFileIcon(selectedFile)}
                    <h3 className="text-lg font-semibold text-gray-900 truncate">{selectedFile.name}</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                    <div>
                      <span className="font-medium">类型:</span> {getFileTypeDisplay(selectedFile)}
                    </div>
                    {selectedFile.size && (
                      <div>
                        <span className="font-medium">大小:</span> {formatFileSize(selectedFile.size)}
                      </div>
                    )}
                    {selectedFile.modified && (
                      <div className="col-span-2">
                        <span className="font-medium">修改时间:</span> {formatDate(selectedFile.modified)}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-2 ml-4">
                  <button
                    onClick={() => handleDownload(selectedFile)}
                    className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="下载文件"
                  >
                    <ArrowDownTrayIcon className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setIsPreviewExpanded(!isPreviewExpanded)}
                    className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                    title={isPreviewExpanded ? "收起预览" : "展开预览"}
                  >
                    {isPreviewExpanded ? (
                      <ArrowsPointingInIcon className="w-5 h-5" />
                    ) : (
                      <ArrowsPointingOutIcon className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>
            </div>
            
            {/* Preview Content */}
            <div className="flex-1 overflow-y-auto p-2">
              <FilePreview file={selectedFile} isExpanded={isPreviewExpanded} />
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <EyeIcon className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <p className="text-gray-500 text-lg font-medium">选择文件查看预览</p>
              <p className="text-gray-400 text-sm mt-2">支持图片、视频、音频、文档等多种格式</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function FilePreview({ file, isExpanded }: { file: FileItem; isExpanded: boolean }) {
  const mimeType = file.mimeType || '';
  const fileName = file.name.toLowerCase();
  const fileExt = fileName.split('.').pop() || '';

  // 图片预览
  if (mimeType.startsWith('image/')) {
    const imagePath = `/api/file?path=${encodeURIComponent(file.path)}`;
    return (
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="p-2 bg-gray-50 border-b border-gray-200">
          <h4 className="font-medium text-gray-900 flex items-center">
            <PhotoIcon className="w-4 h-4 mr-2 text-green-500" />
            图片预览
          </h4>
        </div>
        <div className="p-6 text-center">
          <img
            src={imagePath}
            alt={file.name}
            className={`max-w-full h-full rounded-lg shadow-sm ${isExpanded ? 'max-h-none' : 'max-h-96'}`}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              const errorDiv = target.nextElementSibling as HTMLElement;
              if (errorDiv) errorDiv.style.display = 'block';
            }}
          />
          <div className="hidden text-gray-500 text-sm mt-4 p-4 bg-red-50 rounded-lg border border-red-200">
            <p>无法加载图片</p>
            <p className="text-xs mt-1">请检查文件是否存在或格式是否支持</p>
          </div>
        </div>
      </div>
    );
  }

  // PDF 预览
  if (mimeType === 'application/pdf') {
    const pdfPath = `/api/file?path=${encodeURIComponent(file.path)}`;
    return (
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden h-full">
        <div className="p-2 bg-gray-50 border-b border-gray-200">
          <h4 className="font-medium text-gray-900 flex items-center">
            <DocumentIcon className="w-4 h-4 mr-2 text-red-500" />
            PDF 文档
          </h4>
        </div>
        <div className="h-full">
          <iframe
            src={pdfPath}
            className="w-full h-full border-0"
            title={file.name}
          />
        </div>
      </div>
    );
  }

  // 视频预览
  if (mimeType.startsWith('video/') || ['mp4', 'webm', 'ogv', 'mov', 'avi'].includes(fileExt)) {
    const videoPath = `/api/file?path=${encodeURIComponent(file.path)}`;
    return (
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="p-2 bg-gray-50 border-b border-gray-200">
          <h4 className="font-medium text-gray-900 flex items-center">
            <FilmIcon className="w-4 h-4 mr-2 text-purple-500" />
            视频播放
          </h4>
        </div>
        <div className="p-6">
          <video
            controls
            className={`w-full rounded-lg shadow-sm ${isExpanded ? 'max-h-none' : 'max-h-96'}`}
            preload="metadata"
          >
            <source src={videoPath} type={mimeType} />
            <div className="text-center p-8 text-gray-500">
              <FilmIcon className="w-12 h-12 mx-auto mb-2 text-gray-300" />
              <p>您的浏览器不支持视频播放</p>
            </div>
          </video>
        </div>
      </div>
    );
  }

  // 音频预览
  if (mimeType.startsWith('audio/') || ['mp3', 'wav', 'ogg', 'aac', 'm4a'].includes(fileExt)) {
    const audioPath = `/api/file?path=${encodeURIComponent(file.path)}`;
    return (
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="p-2 bg-gray-50 border-b border-gray-200">
          <h4 className="font-medium text-gray-900 flex items-center">
            <MusicalNoteIcon className="w-4 h-4 mr-2 text-pink-500" />
            音频播放
          </h4>
        </div>
        <div className="p-6">
          <div className="flex items-center justify-center p-8 bg-gradient-to-br from-pink-50 to-purple-50 rounded-lg">
            <div className="text-center">
              <MusicalNoteIcon className="w-16 h-16 mx-auto mb-4 text-pink-400" />
              <audio
                controls
                className="w-full max-w-md"
                preload="metadata"
              >
                <source src={audioPath} type={mimeType} />
                您的浏览器不支持音频播放
              </audio>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 文本内容预览
  if (file.content) {
    // Markdown 预览
    if (mimeType === 'text/markdown' || fileExt === 'md') {
      return <MarkdownPreview content={file.content} isExpanded={isExpanded} />;
    }

    // JSON 预览
    if (mimeType === 'application/json' || fileExt === 'json') {
      try {
        const formatted = JSON.stringify(JSON.parse(file.content), null, 2);
        return <CodePreview content={formatted} language="json" title="JSON 数据" isExpanded={isExpanded} />;
      } catch {
        return <CodePreview content={file.content} language="json" title="JSON 数据" isExpanded={isExpanded} />;
      }
    }

    // 各种代码文件预览
    const codeLanguages: { [key: string]: { lang: string; title: string } } = {
      'sql': { lang: 'sql', title: 'SQL 查询' },
      'js': { lang: 'javascript', title: 'JavaScript' },
      'jsx': { lang: 'jsx', title: 'React JSX' },
      'ts': { lang: 'typescript', title: 'TypeScript' },
      'tsx': { lang: 'tsx', title: 'React TSX' },
      'py': { lang: 'python', title: 'Python' },
      'java': { lang: 'java', title: 'Java' },
      'c': { lang: 'c', title: 'C 语言' },
      'cpp': { lang: 'cpp', title: 'C++' },
      'cc': { lang: 'cpp', title: 'C++' },
      'cxx': { lang: 'cpp', title: 'C++' },
      'h': { lang: 'c', title: 'C/C++ 头文件' },
      'hpp': { lang: 'cpp', title: 'C++ 头文件' },
      'php': { lang: 'php', title: 'PHP' },
      'go': { lang: 'go', title: 'Go' },
      'rs': { lang: 'rust', title: 'Rust' },
      'sh': { lang: 'bash', title: 'Shell 脚本' },
      'bash': { lang: 'bash', title: 'Bash 脚本' },
      'zsh': { lang: 'zsh', title: 'Zsh 脚本' },
      'css': { lang: 'css', title: 'CSS 样式' },
      'html': { lang: 'html', title: 'HTML 文档' },
      'htm': { lang: 'html', title: 'HTML 文档' },
      'xml': { lang: 'xml', title: 'XML 文档' },
      'yml': { lang: 'yaml', title: 'YAML 配置' },
      'yaml': { lang: 'yaml', title: 'YAML 配置' },
    };

    if (codeLanguages[fileExt]) {
      const { lang, title } = codeLanguages[fileExt];
      return <CodePreview content={file.content} language={lang} title={title} isExpanded={isExpanded} />;
    }

    // CSV 预览
    if (fileExt === 'csv') {
      return <CSVPreview content={file.content} isExpanded={isExpanded} />;
    }

    // 其他文本文件
    if (mimeType.startsWith('text/') || ['txt', 'log'].includes(fileExt)) {
      return <TextPreview content={file.content} title="文本文档" isExpanded={isExpanded} />;
    }
  }

  // 大文件或二进制文件
  if (file.size && file.size > 1024 * 1024) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="p-6 text-center">
          <DocumentIcon className="w-16 h-16 mx-auto mb-4 text-gray-300" />
          <h4 className="text-lg font-medium text-gray-900 mb-2">文件过大</h4>
          <p className="text-gray-500 mb-4">文件大小: {formatFileSize(file.size)}</p>
          <p className="text-sm text-gray-400">为了性能考虑，暂不支持预览大于 1MB 的文件</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="p-6 text-center">
        <DocumentIcon className="w-16 h-16 mx-auto mb-4 text-gray-300" />
        <h4 className="text-lg font-medium text-gray-900 mb-2">暂不支持预览</h4>
        <p className="text-gray-500">此文件类型暂不支持预览</p>
        <p className="text-sm text-gray-400 mt-2">支持的格式：图片、视频、音频、文本、代码等</p>
      </div>
    </div>
  );
}

// Markdown 预览组件
function MarkdownPreview({ content, isExpanded }: { content: string; isExpanded: boolean }) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="p-2 bg-gray-50 border-b border-gray-200">
        <h4 className="font-medium text-gray-900 flex items-center">
          <DocumentTextIcon className="w-4 h-4 mr-2 text-blue-600" />
          Markdown 文档
        </h4>
      </div>
      <div className={`p-6 overflow-y-auto ${isExpanded ? 'max-h-none' : 'max-h-96'}`}>
        <div className="prose prose-sm max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-blue-600 prose-strong:text-gray-900 prose-code:text-pink-600 prose-code:bg-pink-50 prose-pre:bg-gray-900 prose-pre:text-gray-100">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}

// 代码预览组件
function CodePreview({ content, language, title, isExpanded }: { 
  content: string; 
  language: string; 
  title: string;
  isExpanded: boolean;
}) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="p-2 bg-gray-50 border-b border-gray-200">
        <h4 className="font-medium text-gray-900 flex items-center">
          <CodeBracketIcon className="w-4 h-4 mr-2 text-orange-500" />
          {title}
        </h4>
      </div>
      <div className={`overflow-hidden ${isExpanded ? 'max-h-none' : 'max-h-96'}`}>
        <SyntaxHighlighter
          language={language}
          style={tomorrow}
          customStyle={{
            margin: 0,
            fontSize: '13px',
            lineHeight: '1.5',
            maxHeight: isExpanded ? 'none' : '384px',
          }}
          showLineNumbers={true}
        >
          {content}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}

// CSV 预览组件
function CSVPreview({ content, isExpanded }: { content: string; isExpanded: boolean }) {
  const lines = content.split('\n').filter(line => line.trim());
  if (lines.length === 0) return <div className="text-gray-500 text-sm">空文件</div>;
  
  const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
  const maxRows = isExpanded ? 50 : 10;
  const rows = lines.slice(1, maxRows + 1).map(line => 
    line.split(',').map(cell => cell.trim().replace(/"/g, ''))
  );
  
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="p-2 bg-gray-50 border-b border-gray-200">
        <h4 className="font-medium text-gray-900 flex items-center">
          <DocumentIcon className="w-4 h-4 mr-2 text-green-600" />
          CSV 数据表格
        </h4>
      </div>
      <div className={`overflow-auto ${isExpanded ? 'max-h-none' : 'max-h-96'}`}>
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 sticky top-0">
            <tr>
              {headers.map((header, index) => (
                <th key={index} className="px-4 py-3 text-left font-semibold text-gray-900 border-b border-gray-200">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-gray-50">
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex} className="px-4 py-3 text-gray-700">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        {lines.length > maxRows + 1 && (
          <div className="px-4 py-3 text-sm text-gray-500 bg-gray-50 border-t border-gray-200 text-center">
            显示前 {maxRows} 行，共 {lines.length - 1} 行数据
          </div>
        )}
      </div>
    </div>
  );
}

// 文本预览组件
function TextPreview({ content, title, isExpanded }: { 
  content: string; 
  title: string;
  isExpanded: boolean;
}) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="p-2 bg-gray-50 border-b border-gray-200">
        <h4 className="font-medium text-gray-900 flex items-center">
          <DocumentTextIcon className="w-4 h-4 mr-2 text-gray-600" />
          {title}
        </h4>
      </div>
      <div className={`p-6 overflow-auto ${isExpanded ? 'max-h-none' : 'max-h-96'}`}>
        <pre className="text-sm text-gray-700 whitespace-pre-wrap font-mono leading-relaxed">
          {content}
        </pre>
      </div>
    </div>
  );
}

function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date));
}

function getFileTypeDisplay(file: FileItem): string {
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
  if (mimeType.startsWith('text/')) return '文本文件';
  
  return fileExt.toUpperCase() + ' 文件';
}