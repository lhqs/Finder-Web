'use client';

import { FileItem } from '@/types/file';
import { 
  DocumentIcon,
  PhotoIcon,
  FilmIcon,
  MusicalNoteIcon,
  CodeBracketIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline';
import { MarkdownPreview } from './MarkdownPreview';
import { CodePreview } from './CodePreview';
import { CSVPreview } from './CSVPreview';
import { TextPreview } from './TextPreview';
import { OfficePreview } from './OfficePreview';
import { formatFileSize } from '@/utils/formatters';

interface FilePreviewProps {
  file: FileItem;
  isExpanded: boolean;
}

export function FilePreview({ file, isExpanded }: FilePreviewProps) {
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

  // Office 文档预览 (Word, Excel, PowerPoint)
  if (mimeType.includes('application/msword') || 
      mimeType.includes('application/vnd.openxmlformats-officedocument.wordprocessingml') ||
      mimeType.includes('application/vnd.ms-excel') || 
      mimeType.includes('application/vnd.openxmlformats-officedocument.spreadsheetml') ||
      mimeType.includes('application/vnd.ms-powerpoint') || 
      mimeType.includes('application/vnd.openxmlformats-officedocument.presentationml') ||
      ['doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx'].includes(fileExt)) {
    return <OfficePreview file={file} isExpanded={isExpanded} />;
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