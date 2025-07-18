import { DocumentIcon } from '@heroicons/react/24/outline';

interface CSVPreviewProps {
  content: string;
  isExpanded: boolean;
}

export function CSVPreview({ content, isExpanded }: CSVPreviewProps) {
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