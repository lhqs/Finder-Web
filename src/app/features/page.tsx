import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '功能特性 - 专业文件浏览器的强大功能',
  description: '详细了解专业文件浏览器的所有功能特性：多格式文件预览、分栏视图、代码高亮、图片视频播放、PDF预览等。',
  keywords: '文件预览功能,代码高亮,图片浏览,视频播放,PDF预览,Markdown渲染,CSV表格,文件管理功能',
  openGraph: {
    title: '专业文件浏览器 - 功能特性详解',
    description: '探索专业文件浏览器的强大功能：支持20+种文件格式预览，类macOS分栏设计，现代化用户体验。',
    type: 'website',
  },
};

export default function Features() {
  const features = [
    {
      category: "文件浏览",
      icon: "🗂️",
      items: [
        { name: "分栏视图", desc: "类似 macOS Finder 的多栏导航体验" },
        { name: "横向滚动", desc: "支持多层级文件夹的无限展开" },
        { name: "智能排序", desc: "文件夹优先，按名称自然排序" },
        { name: "文件图标", desc: "根据文件类型显示不同的彩色图标" }
      ]
    },
    {
      category: "文件预览",
      icon: "👀",
      items: [
        { name: "图片预览", desc: "支持 JPG、PNG、GIF、SVG、WebP 等格式" },
        { name: "视频播放", desc: "支持 MP4、WebM、MOV、AVI 等主流视频格式" },
        { name: "音频播放", desc: "支持 MP3、WAV、AAC、FLAC 等音频格式" },
        { name: "文档预览", desc: "支持 PDF 文档的在线预览" },
        { name: "代码高亮", desc: "支持 20+ 种编程语言的语法高亮" },
        { name: "Markdown 渲染", desc: "完整的 Markdown 文档渲染支持" },
        { name: "CSV 表格", desc: "智能解析和表格化显示 CSV 数据" },
        { name: "JSON 格式化", desc: "自动格式化和语法高亮 JSON 文件" }
      ]
    },
    {
      category: "用户体验",
      icon: "🎨",
      items: [
        { name: "响应式设计", desc: "适配不同屏幕尺寸" },
        { name: "可展开预览", desc: "预览区域可在 1/3 和 3/4 宽度间切换" },
        { name: "专业 UI", desc: "现代化的界面设计，注重细节和易用性" },
        { name: "性能优化", desc: "大文件智能处理，避免浏览器卡顿" }
      ]
    }
  ];

  const supportedFormats = {
    "图片格式": ["JPG/JPEG", "PNG", "GIF", "SVG", "WebP", "BMP", "ICO"],
    "视频格式": ["MP4", "WebM", "OGV", "MOV", "AVI", "WMV", "FLV", "MKV"],
    "音频格式": ["MP3", "WAV", "OGG", "AAC", "M4A", "FLAC", "WMA"],
    "文档格式": ["PDF", "DOC/DOCX", "XLS/XLSX", "PPT/PPTX"],
    "代码格式": ["JavaScript/TypeScript", "Python", "Java", "C/C++", "PHP", "Go", "Rust", "Shell", "SQL", "CSS/HTML", "YAML", "XML"],
    "数据格式": ["JSON", "CSV", "Markdown", "纯文本"]
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <header className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            功能特性
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            专业文件浏览器提供全面的文件管理和预览功能，支持多种文件格式，
            为用户带来高效、直观的文件浏览体验。
          </p>
        </header>

        <main className="space-y-16">
          {/* 核心功能 */}
          <section>
            <h2 className="text-3xl font-semibold text-gray-900 mb-8 text-center">
              核心功能
            </h2>
            <div className="grid lg:grid-cols-3 gap-8">
              {features.map((category, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm p-8">
                  <div className="text-center mb-6">
                    <div className="text-4xl mb-3">{category.icon}</div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {category.category}
                    </h3>
                  </div>
                  <ul className="space-y-4">
                    {category.items.map((item, itemIndex) => (
                      <li key={itemIndex}>
                        <h4 className="font-medium text-gray-900 mb-1">
                          {item.name}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {item.desc}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* 支持的文件格式 */}
          <section>
            <h2 className="text-3xl font-semibold text-gray-900 mb-8 text-center">
              支持的文件格式
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(supportedFormats).map(([category, formats]) => (
                <div key={category} className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    {category}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {formats.map((format, index) => (
                      <span
                        key={index}
                        className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                      >
                        {format}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 技术优势 */}
          <section className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-3xl font-semibold text-gray-900 mb-8 text-center">
              技术优势
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  现代化技术栈
                </h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• 基于 Next.js 15 和 React 19 构建</li>
                  <li>• TypeScript 提供类型安全</li>
                  <li>• Tailwind CSS 现代化样式</li>
                  <li>• 服务端渲染优化 SEO</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  性能与安全
                </h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• 智能文件大小限制</li>
                  <li>• 路径安全验证</li>
                  <li>• 懒加载优化性能</li>
                  <li>• 响应式设计适配所有设备</li>
                </ul>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}