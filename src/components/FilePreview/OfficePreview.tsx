import { useState } from 'react';
import {
    DocumentTextIcon,
    TableCellsIcon,
    PresentationChartLineIcon,
    ExclamationTriangleIcon,
    ArrowDownTrayIcon
} from '@heroicons/react/24/outline';
import { FileItem } from '@/types/file';

interface OfficePreviewProps {
    file: FileItem;
    isExpanded: boolean;
}

export function OfficePreview({ file, isExpanded }: OfficePreviewProps) {
    const [previewError, setPreviewError] = useState(false);
    const [currentPreviewIndex, setCurrentPreviewIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const fileName = file.name.toLowerCase();
    const fileExt = fileName.split('.').pop() || '';
    const mimeType = file.mimeType || '';

    // 确定文档类型
    let docType = 'Office 文档';
    let IconComponent = DocumentTextIcon;
    let iconColor = 'text-blue-500';
    let bgColor = 'from-blue-50 to-blue-100';

    if (['doc', 'docx'].includes(fileExt) || mimeType.includes('wordprocessingml')) {
        docType = 'Word 文档';
        IconComponent = DocumentTextIcon;
        iconColor = 'text-blue-700';
        bgColor = 'from-blue-50 to-blue-100';
    } else if (['xls', 'xlsx'].includes(fileExt) || mimeType.includes('spreadsheetml')) {
        docType = 'Excel 表格';
        IconComponent = TableCellsIcon;
        iconColor = 'text-green-600';
        bgColor = 'from-green-50 to-green-100';
    } else if (['ppt', 'pptx'].includes(fileExt) || mimeType.includes('presentationml')) {
        docType = 'PowerPoint 演示文稿';
        IconComponent = PresentationChartLineIcon;
        iconColor = 'text-orange-600';
        bgColor = 'from-orange-50 to-orange-100';
    }

    const filePath = `/api/file?path=${encodeURIComponent(file.path)}`;
    const fullFileUrl = `${window.location.origin}${filePath}`;

    // 检查是否为本地开发环境
    const isLocalDev = window.location.hostname === 'localhost' ||
        window.location.hostname === '127.0.0.1' ||
        window.location.hostname.includes('local');

    // 使用多个在线预览服务作为备选
    const previewUrls = isLocalDev ? [] : [
        // Google Docs Viewer (更稳定的选择)
        `https://docs.google.com/gview?url=${encodeURIComponent(fullFileUrl)}&embedded=true`,
        // Microsoft Office Online Viewer (备选)
        `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(fullFileUrl)}`,
    ];

    const handleDownload = () => {
        const downloadUrl = `${filePath}&download=true`;
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = file.name;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // 如果是本地开发环境或没有可用的预览服务，直接显示错误状态
    if (isLocalDev || previewUrls.length === 0) {
        return (
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden h-full">
                <div className="p-2 bg-gray-50 border-b border-gray-200">
                    <h4 className="font-medium text-gray-900 flex items-center">
                        <IconComponent className={`w-4 h-4 mr-2 ${iconColor}`} />
                        {docType}
                    </h4>
                </div>
                <div className="flex items-center justify-center h-full p-8">
                    <div className="text-center max-w-md">
                        <div className={`w-20 h-20 mx-auto mb-6 bg-gradient-to-br ${bgColor} rounded-2xl flex items-center justify-center`}>
                            <IconComponent className={`w-10 h-10 ${iconColor}`} />
                        </div>
                        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                            <ExclamationTriangleIcon className="w-5 h-5 text-blue-600 mx-auto mb-2" />
                            <p className="text-sm text-blue-800 font-medium">开发环境限制</p>
                        </div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-2">{docType}</h4>
                        <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                            在线预览服务在本地开发环境中不可用。
                            <br />
                            请下载文件后使用相应的应用程序打开，或在生产环境中查看。
                        </p>
                        <button
                            onClick={handleDownload}
                            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            <ArrowDownTrayIcon className="w-4 h-4 mr-2" />
                            下载文件
                        </button>
                        <div className="mt-4 text-xs text-gray-400">
                            支持的应用：Microsoft Office、WPS Office、LibreOffice 等
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const handleIframeError = () => {
        if (currentPreviewIndex < previewUrls.length - 1) {
            // 尝试下一个预览服务
            setCurrentPreviewIndex(currentPreviewIndex + 1);
            setIsLoading(true);
        } else {
            // 所有预览服务都失败了
            setPreviewError(true);
            setIsLoading(false);
        }
    };

    const handleIframeLoad = () => {
        setIsLoading(false);
        // 延迟检查是否真正加载成功
        setTimeout(() => {
            const iframe = document.querySelector(`iframe[title="${file.name}"]`) as HTMLIFrameElement;
            if (iframe) {
                try {
                    // 检查 iframe 是否显示错误页面
                    const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
                    if (iframeDoc && (iframeDoc.title.includes('error') || iframeDoc.body.innerHTML.includes('error'))) {
                        handleIframeError();
                    }
                } catch (error) {
                    // 跨域限制，无法检查内容，假设加载成功
                }
            }
        }, 2000);
    };

    if (previewError) {
        return (
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden h-full">
                <div className="p-2 bg-gray-50 border-b border-gray-200">
                    <h4 className="font-medium text-gray-900 flex items-center">
                        <IconComponent className={`w-4 h-4 mr-2 ${iconColor}`} />
                        {docType}
                    </h4>
                </div>
                <div className="flex items-center justify-center h-full p-8">
                    <div className="text-center max-w-md">
                        <div className={`w-20 h-20 mx-auto mb-6 bg-gradient-to-br ${bgColor} rounded-2xl flex items-center justify-center`}>
                            <IconComponent className={`w-10 h-10 ${iconColor}`} />
                        </div>
                        <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                            <ExclamationTriangleIcon className="w-5 h-5 text-yellow-600 mx-auto mb-2" />
                            <p className="text-sm text-yellow-800 font-medium">无法在线预览</p>
                        </div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-2">{docType}</h4>
                        <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                            此文档可能需要特殊权限或格式不支持在线预览。
                            <br />
                            建议下载后使用相应的应用程序打开。
                        </p>
                        <button
                            onClick={handleDownload}
                            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            <ArrowDownTrayIcon className="w-4 h-4 mr-2" />
                            下载文件
                        </button>
                        <div className="mt-4 text-xs text-gray-400">
                            支持的应用：Microsoft Office、WPS Office、LibreOffice 等
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden h-full">
            <div className="p-2 bg-gray-50 border-b border-gray-200">
                <div className="flex items-center justify-between">
                    <h4 className="font-medium text-gray-900 flex items-center">
                        <IconComponent className={`w-4 h-4 mr-2 ${iconColor}`} />
                        {docType}
                    </h4>
                    <div className="flex items-center space-x-2">
                        <button
                            onClick={handleDownload}
                            className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                            title="下载文件"
                        >
                            <ArrowDownTrayIcon className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
            <div className="h-full relative">
                <iframe
                    key={currentPreviewIndex}
                    src={previewUrls[currentPreviewIndex]}
                    className="w-full h-full border-0"
                    title={file.name}
                    onError={handleIframeError}
                    onLoad={handleIframeLoad}
                />

                {/* 加载提示 */}
                {isLoading && (
                    <div className="absolute inset-0 bg-white flex items-center justify-center pointer-events-none">
                        <div className="text-center">
                            <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-br ${bgColor} rounded-xl flex items-center justify-center animate-pulse`}>
                                <IconComponent className={`w-8 h-8 ${iconColor}`} />
                            </div>
                            <p className="text-gray-500 text-sm">正在加载文档预览...</p>
                            <div className="mt-2 flex justify-center">
                                <div className="flex space-x-1">
                                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                </div>
                            </div>
                            {currentPreviewIndex > 0 && (
                                <p className="text-xs text-gray-400 mt-2">尝试备用预览服务...</p>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}