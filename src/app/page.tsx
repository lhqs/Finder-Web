import ColumnView from '@/components/ColumnView';
import { mockFileData } from '@/data/mockData';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Mac Finder 风格文件浏览器
          </h1>
          <p className="text-gray-600">
            点击文件夹展开内容，点击文件查看预览
          </p>
        </div>
        
        <div className="h-[calc(100vh-200px)] min-h-[600px]">
          <ColumnView data={mockFileData} />
        </div>
      </div>
    </div>
  );
}