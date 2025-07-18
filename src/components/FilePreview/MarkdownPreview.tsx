import ReactMarkdown from 'react-markdown';
import { DocumentTextIcon } from '@heroicons/react/24/outline';

interface MarkdownPreviewProps {
  content: string;
  isExpanded: boolean;
}

export function MarkdownPreview({ content, isExpanded }: MarkdownPreviewProps) {
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