import ColumnView from '@/components/ColumnView';
import { readDirectory } from '@/utils/fileSystem';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '专业文件浏览器 - 在线文件管理和预览工具',
  description: '现代化的文件浏览器，支持图片、视频、音频、PDF、代码、Markdown等多种格式预览。类似macOS Finder的分栏视图设计，提供流畅的文件管理体验。',
  keywords: '文件浏览器,在线文件预览,文件管理器,代码查看器,图片浏览,视频播放,PDF预览,Markdown渲染',
  openGraph: {
    title: '专业文件浏览器 - 现代化在线文件管理工具',
    description: '支持多种文件格式预览的专业文件浏览器，类似macOS Finder的分栏视图设计。',
    type: 'website',
    images: ['/og-image-home.jpg'],
  },
};

export default async function Home() {
  const fileData = await readDirectory();

  return (
    <div className="h-[95vh] bg-gray-100 flex flex-col">
     {/* <div className="bg-gray-100 min-h-full"> */}
      
      {/* SEO优化的页面头部 */}
      <header className="">
        <div className="">
          <h1 className="text-3xl font-bold text-gray-900 mb-3 hidden">
            专业文件浏览器 - 现代化在线文件管理工具
          </h1>
          <p className="text-gray-600 max-w-4xl leading-relaxed hidden">
            支持多种文件格式预览的专业文件浏览器，采用类似macOS Finder的分栏视图设计。
            支持图片、视频、音频、PDF、代码高亮、Markdown渲染、CSV表格等功能，
            为开发者和用户提供高效的文件管理体验。
          </p>
        </div>
      </header>
      
      {/* 主要内容区域 */}
      {/* <div className="p-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm" style={{ height: 'calc(100vh - 300px)' }}>
            <ColumnView data={fileData} />
          </div>
        </div>
      </div> */}
      <div className="flex-1 min-h-0 p-4">
        <ColumnView data={fileData} />
      </div>

      {/* 隐藏的结构化数据 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "专业文件浏览器",
            "description": "现代化的在线文件浏览器，支持多种文件格式预览和管理",
            "url": "https://your-domain.com",
            "applicationCategory": "UtilitiesApplication",
            "operatingSystem": "Web Browser",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            },
            "author": {
              "@type": "Organization",
              "name": "文件浏览器开发团队"
            },
            "featureList": [
              "多种文件格式预览",
              "分栏视图导航",
              "代码语法高亮",
              "图片视频播放",
              "PDF文档预览",
              "Markdown渲染",
              "CSV表格显示",
              "响应式设计"
            ]
          })
        }}
      />
    </div>
  );
}