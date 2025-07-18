import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { CodeBracketIcon } from '@heroicons/react/24/outline';

interface CodePreviewProps {
  content: string;
  language: string;
  title: string;
  isExpanded: boolean;
}

export function CodePreview({ content, language, title, isExpanded }: CodePreviewProps) {
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