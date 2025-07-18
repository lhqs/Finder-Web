import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '使用文档 - 专业文件浏览器安装配置指南',
  description: '详细的安装配置指南和使用教程，帮助您快速上手专业文件浏览器。包含环境配置、部署说明和常见问题解答。',
  keywords: '安装指南,配置教程,使用文档,部署说明,环境配置,故障排除,API文档',
  openGraph: {
    title: '专业文件浏览器 - 完整使用文档',
    description: '从安装到部署的完整指南，帮助您快速搭建和使用专业文件浏览器。',
    type: 'article',
  },
};

export default function Docs() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <header className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            使用文档
          </h1>
          <p className="text-xl text-gray-600">
            完整的安装配置指南和使用教程，帮助您快速上手专业文件浏览器。
          </p>
        </header>

        <main className="prose prose-lg max-w-none">
          <nav className="bg-white p-6 rounded-lg shadow-sm mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">目录</h2>
            <ul className="space-y-2">
              <li><a href="#quick-start" className="text-blue-600 hover:text-blue-800">快速开始</a></li>
              <li><a href="#installation" className="text-blue-600 hover:text-blue-800">安装配置</a></li>
              <li><a href="#configuration" className="text-blue-600 hover:text-blue-800">配置说明</a></li>
              <li><a href="#deployment" className="text-blue-600 hover:text-blue-800">部署指南</a></li>
              <li><a href="#troubleshooting" className="text-blue-600 hover:text-blue-800">故障排除</a></li>
            </ul>
          </nav>

          <section id="quick-start" className="bg-white p-8 rounded-lg shadow-sm mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">🚀 快速开始</h2>
            
            <h3 className="text-lg font-semibold text-gray-900 mb-3">环境要求</h3>
            <ul className="mb-6">
              <li>Node.js 18.0 或更高版本</li>
              <li>pnpm（推荐）或 npm</li>
              <li>现代浏览器支持</li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-900 mb-3">快速安装</h3>
            <pre className="bg-gray-100 p-4 rounded-lg mb-4 overflow-x-auto text-black">
              <code>{`# 克隆项目
git clone https://github.com/your-username/finder-web.git
cd finder-web

# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev`}</code>
            </pre>
            <p>访问 <a href="http://localhost:3000" className="text-blue-600">http://localhost:3000</a> 开始使用。</p>
          </section>

          <section id="installation" className="bg-white p-8 rounded-lg shadow-sm mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">📦 安装配置</h2>
            
            <h3 className="text-lg font-semibold text-gray-900 mb-3">1. 下载项目</h3>
            <pre className="bg-gray-100 p-4 rounded-lg mb-4 overflow-x-auto text-black">
              <code>git clone https://github.com/your-username/finder-web.git</code>
            </pre>

            <h3 className="text-lg font-semibold text-gray-900 mb-3">2. 安装依赖</h3>
            <pre className="bg-gray-100 p-4 rounded-lg mb-4 overflow-x-auto text-black">
              <code>{`# 使用 pnpm (推荐)
pnpm install

# 或使用 npm
npm install`}</code>
            </pre>

            <h3 className="text-lg font-semibold text-gray-900 mb-3">3. 配置文件路径</h3>
            <p>在以下文件中修改 <code>ROOT_PATH</code> 为你想要浏览的目录：</p>
            <ul className="mb-4">
              <li><code>src/utils/fileSystem.ts</code></li>
              <li><code>src/app/api/file/route.ts</code></li>
            </ul>
            <pre className="bg-gray-100 p-4 rounded-lg mb-4 overflow-x-auto text-black">
              <code>const ROOT_PATH = '/your/target/directory';</code>
            </pre>
          </section>

          <section id="configuration" className="bg-white p-8 rounded-lg shadow-sm mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">⚙️ 配置说明</h2>
            
            <h3 className="text-lg font-semibold text-gray-900 mb-3">性能配置</h3>
            <ul className="mb-4">
              <li><strong>文本文件大小限制</strong>: 1MB（可在 fileSystem.ts 中修改）</li>
              <li><strong>CSV 显示行数</strong>: 普通模式 10 行，展开模式 50 行</li>
              <li><strong>代码高亮最大高度</strong>: 普通模式 384px，展开模式无限制</li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-900 mb-3">安全配置</h3>
            <ul className="mb-4">
              <li><strong>路径验证</strong>: 严格限制文件访问范围</li>
              <li><strong>文件类型检查</strong>: 只允许预览安全的文件类型</li>
              <li><strong>大小限制</strong>: 自动跳过过大文件的内容读取</li>
            </ul>
          </section>

          <section id="deployment" className="bg-white p-8 rounded-lg shadow-sm mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">🚀 部署指南</h2>
            
            <h3 className="text-lg font-semibold text-gray-900 mb-3">构建生产版本</h3>
            <pre className="bg-gray-100 p-4 rounded-lg mb-4 overflow-x-auto text-black">
              <code>{`# 构建项目
pnpm build

# 启动生产服务器
pnpm start`}</code>
            </pre>

            <h3 className="text-lg font-semibold text-gray-900 mb-3">Docker 部署</h3>
            <pre className="bg-gray-100 p-4 rounded-lg mb-4 overflow-x-auto text-black">
              <code>{`# 构建 Docker 镜像
docker build -t finder-web .

# 运行容器
docker run -p 3000:3000 -v /your/files:/app/files finder-web`}</code>
            </pre>

            <h3 className="text-lg font-semibold text-gray-900 mb-3">Vercel 部署</h3>
            <p>项目已配置好 Vercel 部署，只需连接 GitHub 仓库即可自动部署。</p>
          </section>

         

          <section id="troubleshooting" className="bg-white p-8 rounded-lg shadow-sm">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">🔧 故障排除</h2>
            
            <h3 className="text-lg font-semibold text-gray-900 mb-3">常见问题</h3>
            
            <div className="mb-6">
              <h4 className="font-semibold text-gray-900 mb-2">文件无法预览</h4>
              <ul className="text-gray-600 mb-4">
                <li>1. 检查文件路径是否正确</li>
                <li>2. 确认文件格式是否在支持列表中</li>
                <li>3. 检查文件大小是否超过限制（1MB）</li>
                <li>4. 查看浏览器控制台是否有错误信息</li>
              </ul>
            </div>

            <div className="mb-6">
              <h4 className="font-semibold text-gray-900 mb-2">视频/音频无法播放</h4>
              <ul className="text-gray-600 mb-4">
                <li>1. 确认浏览器支持该媒体格式</li>
                <li>2. 检查文件是否损坏</li>
                <li>3. 尝试在其他播放器中测试文件</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2">性能问题</h4>
              <ul className="text-gray-600">
                <li>1. 避免浏览包含大量文件的目录</li>
                <li>2. 关闭不必要的预览窗口</li>
                <li>3. 定期清理浏览器缓存</li>
              </ul>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}