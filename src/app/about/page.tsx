import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '关于我们 - 专业文件浏览器',
  description: '了解专业文件浏览器的开发背景、技术特色和团队信息。我们致力于为用户提供最佳的在线文件管理体验。',
  keywords: '关于我们,文件浏览器开发团队,项目介绍,技术特色,开源项目',
  openGraph: {
    title: '关于专业文件浏览器 - 现代化文件管理解决方案',
    description: '了解我们如何打造这款现代化的文件浏览器，以及背后的技术理念和发展愿景。',
    type: 'website',
  },
};

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            关于专业文件浏览器
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            我们致力于打造最优秀的在线文件管理和预览工具，为开发者和用户提供高效、直观的文件浏览体验。
          </p>
        </header>

        <main className="space-y-12">
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">项目愿景</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed">
                专业文件浏览器诞生于对更好文件管理体验的追求。我们发现现有的在线文件浏览工具往往功能单一、
                界面陈旧，无法满足现代用户的需求。因此，我们决定开发一款集美观、实用、高效于一体的现代化文件浏览器。
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">核心特色</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">类macOS设计</h3>
                <p className="text-gray-600">
                  采用类似macOS Finder的分栏视图设计，提供直观的多层级文件导航体验。
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">多格式支持</h3>
                <p className="text-gray-600">
                  支持图片、视频、音频、PDF、代码、Markdown、CSV等多种文件格式的在线预览。
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">现代技术栈</h3>
                <p className="text-gray-600">
                  基于Next.js 15、React 19、TypeScript和Tailwind CSS构建，性能优异。
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">开源免费</h3>
                <p className="text-gray-600">
                  完全开源，遵循MIT许可证，欢迎社区贡献和定制化开发。
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">技术架构</h2>
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">前端框架</h4>
                  <ul className="text-gray-600 space-y-1">
                    <li>Next.js 15 (App Router)</li>
                    <li>React 19</li>
                    <li>TypeScript</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">样式设计</h4>
                  <ul className="text-gray-600 space-y-1">
                    <li>Tailwind CSS v4</li>
                    <li>Heroicons</li>
                    <li>响应式设计</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">功能库</h4>
                  <ul className="text-gray-600 space-y-1">
                    <li>react-syntax-highlighter</li>
                    <li>react-markdown</li>
                    <li>文件系统API</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}