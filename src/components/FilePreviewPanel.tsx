import { FileItem } from '@/types/file';
import { 
  ArrowsPointingOutIcon,
  ArrowsPointingInIcon,
  ArrowDownTrayIcon,
  EyeIcon,
  FolderIcon, 
  DocumentIcon,
  PhotoIcon,
  FilmIcon,
  MusicalNoteIcon,
  CodeBracketIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline';
import { FilePreview } from './FilePreview';
import { getFileIconType, getFileTypeDisplay } from '@/utils/fileHelpers';
import { formatFileSize, formatDate } from '@/utils/formatters';

interface FilePreviewPanelProps {
  selectedFile: FileItem | null;
  isPreviewExpanded: boolean;
  onToggleExpanded: () => void;
  onDownload: (file: FileItem) => void;
}

export function FilePreviewPanel({ 
  selectedFile, 
  isPreviewExpanded, 
  onToggleExpanded, 
  onDownload 
}: FilePreviewPanelProps) {
  const getFileIcon = (item: FileItem) => {
    const iconType = getFileIconType(item);
    
    switch (iconType) {
      case 'folder':
        return <FolderIcon className="w-4 h-4 text-blue-500" />;
      case 'image':
        return <PhotoIcon className="w-4 h-4 text-green-500" />;
      case 'video':
        return <FilmIcon className="w-4 h-4 text-purple-500" />;
      case 'audio':
        return <MusicalNoteIcon className="w-4 h-4 text-pink-500" />;
      case 'code':
        return <CodeBracketIcon className="w-4 h-4 text-orange-500" />;
      case 'markdown':
        return <DocumentTextIcon className="w-4 h-4 text-blue-600" />;
      default:
        return <DocumentIcon className="w-4 h-4 text-gray-500" />;
    }
  };

  if (!selectedFile) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <EyeIcon className="w-16 h-16 mx-auto mb-4 text-gray-300" />
          <p className="text-gray-500 text-lg font-medium">选择文件查看预览</p>
          <p className="text-gray-400 text-sm mt-2">支持图片、视频、音频、文档等多种格式</p>
        </div>
      </div>
    );
  }

  return (
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
              onClick={() => onDownload(selectedFile)}
              className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              title="下载文件"
            >
              <ArrowDownTrayIcon className="w-5 h-5" />
            </button>
            <button
              onClick={onToggleExpanded}
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
  );
}