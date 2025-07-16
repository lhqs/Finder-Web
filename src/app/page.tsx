import ColumnView from '@/components/ColumnView';
import { readDirectory } from '@/utils/fileSystem';

export default async function Home() {
  const fileData = await readDirectory();

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-full mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Lark Wiki 文件浏览器
          </h1>
          <p className="text-gray-600">
            浏览 /Users/lhqs/jijifeng/lark_wiki 目录 - 点击文件夹展开内容，点击文件查看预览
          </p>
        </div>
        
        <div className="h-[calc(100vh-200px)] min-h-[600px]">
          <ColumnView data={fileData} />
        </div>
      </div>
    </div>
  );
}