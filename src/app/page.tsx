import ColumnView from '@/components/ColumnView';
import { readDirectory } from '@/utils/fileSystem';

export default async function Home() {
  const fileData = await readDirectory();

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-full mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            专业文件浏览器
          </h1>
          <p className="text-gray-600">
            浏览 /Users/lhqs/jijifeng 目录 - 支持多种文件格式预览，可展开预览区域获得更好的阅读体验
          </p>
        </div>
        
        <div className="h-[calc(100vh-200px)] min-h-[600px]">
          <ColumnView data={fileData} />
        </div>
      </div>
    </div>
  );
}