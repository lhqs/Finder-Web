'use client';

import { useState, useRef } from 'react';
import { FileItem, Column } from '@/types/file';
import { 
  ChevronRightIcon,
  FolderIcon, 
  DocumentIcon,
  PhotoIcon,
  FilmIcon,
  MusicalNoteIcon,
  CodeBracketIcon,
  DocumentTextIcon,
  TableCellsIcon,
  PresentationChartLineIcon
} from '@heroicons/react/24/outline';
import { FilePreviewPanel } from './FilePreviewPanel';
import { getFileIconType } from '@/utils/fileHelpers';

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
            case 'word':
                return <DocumentTextIcon className="w-4 h-4 text-blue-700" />;
            case 'excel':
                return <TableCellsIcon className="w-4 h-4 text-green-600" />;
            case 'powerpoint':
                return <PresentationChartLineIcon className="w-4 h-4 text-orange-600" />;
            default:
                return <DocumentIcon className="w-4 h-4 text-gray-500" />;
        }
    };

    return (
        <div className="flex h-full bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
            {/* Columns Container */}
            <div
                ref={scrollContainerRef}
                className={`${isPreviewExpanded ? 'w-1/4' : 'w-2/3'} transition-all duration-300 overflow-x-auto border-r border-gray-200`}
            >
                <div className="flex min-w-max h-full">
                    {columns.map((column) => (
                        <div
                            key={column.id}
                            className="flex-shrink-0 w-64 border-r border-gray-100 last:border-r-0"
                        >
                            <div className="h-full overflow-y-auto">
                                {column.items.map((item) => (
                                    <div
                                        key={item.id}
                                        className={`flex items-center px-3 py-2.5 cursor-pointer transition-all duration-150 hover:bg-gray-50 ${column.selectedItem?.id === item.id
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
                <FilePreviewPanel
                    selectedFile={selectedFile}
                    isPreviewExpanded={isPreviewExpanded}
                    onToggleExpanded={() => setIsPreviewExpanded(!isPreviewExpanded)}
                    onDownload={handleDownload}
                />
            </div>
        </div>
    );
}