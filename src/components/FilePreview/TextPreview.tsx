import { DocumentTextIcon } from '@heroicons/react/24/outline';

interface TextPreviewProps {
  content: string;
  title: string;
  isExpanded: boolean;
}

export function TextPreview({ content, title, isExpanded }: TextPreviewProps) {
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