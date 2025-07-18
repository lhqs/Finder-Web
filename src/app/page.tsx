import ColumnView from '@/components/ColumnView';
import { readDirectory } from '@/utils/fileSystem';

export default async function Home() {
  const fileData = await readDirectory();

  return (
    <div className="h-screen bg-gray-100 flex flex-col">
      <div className="flex-shrink-0 bg-white border-b border-gray-200 px-6 py-4">
        <h1 className="text-2xl font-bold text-gray-900">类 macOS Finder Web浏览器</h1>
      </div>
      
      <div className="flex-1 min-h-0 p-4">
        <ColumnView data={fileData} />
      </div>
    </div>
  );
}