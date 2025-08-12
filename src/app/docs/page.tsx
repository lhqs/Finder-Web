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
              <li><a href="#vercel-deploy" className="text-blue-600 hover:text-blue-800">Vercel 部署</a></li>
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

            <h3 className="text-lg font-semibold text-gray-900 mb-3">3. 配置浏览模式</h3>
            <p>复制环境变量配置文件并根据需要修改：</p>
            <pre className="bg-gray-100 p-4 rounded-lg mb-4 overflow-x-auto text-black">
              <code>cp .env.example .env.local</code>
            </pre>
            <p>编辑 <code>.env.local</code> 文件选择浏览模式：</p>
            <pre className="bg-gray-100 p-4 rounded-lg mb-4 overflow-x-auto text-black">
              <code>{`# 本地文件系统模式
FILE_BROWSER_MODE=local
ROOT_PATH=/Users/your-username/Documents

# 或项目文件夹模式
FILE_BROWSER_MODE=files
FILES_MODE_ENABLED=true
FILES_FOLDER_PATH=files`}</code>
            </pre>
          </section>

          <section id="configuration" className="bg-white p-8 rounded-lg shadow-sm mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">⚙️ 配置说明</h2>
            
            <h3 className="text-lg font-semibold text-gray-900 mb-3">浏览模式配置</h3>
            <div className="mb-6">
              <h4 className="font-semibold text-gray-900 mb-2">本地文件系统模式 (local)</h4>
              <p className="text-gray-600 mb-2">浏览本地文件系统中的任意目录：</p>
              <pre className="bg-gray-100 p-3 rounded text-sm text-black mb-4">
                <code>{`FILE_BROWSER_MODE=local
ROOT_PATH=/Users/your-username/Documents`}</code>
              </pre>
            </div>
            
            <div className="mb-6">
              <h4 className="font-semibold text-gray-900 mb-2">项目文件夹模式 (files)</h4>
              <p className="text-gray-600 mb-2">浏览项目中的 files 文件夹，适合存放项目相关文档：</p>
              <pre className="bg-gray-100 p-3 rounded text-sm text-black mb-4">
                <code>{`# 开发环境
FILE_BROWSER_MODE=files
FILES_MODE_ENABLED=true
FILES_FOLDER_PATH=files

# 生产环境（Vercel 等）
FILE_BROWSER_MODE=files
FILES_MODE_ENABLED=true
FILES_FOLDER_PATH=public/files`}</code>
              </pre>
              <div className="bg-blue-50 p-3 rounded text-sm">
                <p className="text-blue-800">
                  <strong>提示：</strong> 项目会自动检测部署环境。开发时使用 <code>files/</code>，
                  部署到 Vercel 时自动使用 <code>public/files/</code>。
                </p>
              </div>
            </div>

            <h3 className="text-lg font-semibold text-gray-900 mb-3">性能配置</h3>
            <ul className="mb-4">
              <li><strong>文本文件大小限制</strong>: 1MB（可在 config/app.config.ts 中修改）</li>
              <li><strong>CSV 显示行数</strong>: 普通模式 10 行，展开模式 50 行</li>
              <li><strong>代码高亮最大高度</strong>: 普通模式 384px，展开模式无限制</li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-900 mb-3">环境检测配置</h3>
            <p className="text-gray-600 mb-4">
              项目支持自动环境检测，根据部署环境选择合适的文件系统模式：
            </p>
            <ul className="mb-6">
              <li><strong>开发环境</strong>: 使用 Node.js fs 模块直接读取文件系统</li>
              <li><strong>Vercel 部署</strong>: 自动检测 VERCEL=1 环境变量，使用静态文件列表</li>
              <li><strong>生产环境</strong>: NODE_ENV=production 时使用静态文件列表</li>
              <li><strong>构建时生成</strong>: prebuild 脚本自动扫描文件并生成 JSON 列表</li>
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

# 运行容器 - 项目文件夹模式（推荐）
docker run -p 3000:3000 -v /your/local/files:/app/files finder-web

# 运行容器 - 本地文件系统模式
docker run -p 3000:3000 \\
  -v /your/local/directory:/app/mounted \\
  -e FILE_BROWSER_MODE=local \\
  -e ROOT_PATH=/app/mounted \\
  finder-web`}</code>
            </pre>
            <div className="bg-blue-50 p-4 rounded-lg mb-4">
              <p className="text-blue-800 text-sm">
                <strong>提示：</strong> Docker 容器默认使用项目文件夹模式，将你的文件挂载到 <code>/app/files</code> 目录即可。
                如需使用本地文件系统模式，需要通过环境变量进行配置。
              </p>
            </div>

            <h3 id="vercel-deploy" className="text-lg font-semibold text-gray-900 mb-3">Vercel 部署</h3>
            <p className="mb-4">项目已配置好 Vercel 部署支持，包含自动环境检测和静态文件生成。</p>
            
            <h4 className="font-semibold text-gray-900 mb-2">快速部署</h4>
            <p className="mb-3">点击下方按钮一键部署到 Vercel：</p>
            <div className="mb-4">
              <a href="https://vercel.com/new/clone?repository-url=https://github.com/your-username/finder-web" 
                 className="inline-block bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition-colors">
                Deploy with Vercel
              </a>
            </div>

            <h4 className="font-semibold text-gray-900 mb-2">手动部署步骤</h4>
            <ol className="mb-4 space-y-2">
              <li>1. 将代码推送到 GitHub 仓库</li>
              <li>2. 在 Vercel 中导入项目</li>
              <li>3. 配置环境变量（见下方）</li>
              <li>4. 点击部署</li>
            </ol>

            <h4 className="font-semibold text-gray-900 mb-2">Vercel 环境变量配置</h4>
            <pre className="bg-gray-100 p-3 rounded text-sm text-black mb-4">
              <code>{`FILE_BROWSER_MODE=files
FILES_MODE_ENABLED=true
FILES_FOLDER_PATH=public/files`}</code>
            </pre>

            <div className="bg-yellow-50 p-4 rounded-lg mb-4">
              <p className="text-yellow-800 text-sm">
                <strong>重要：</strong> Vercel 部署时，文件需要放在 <code>public/files/</code> 目录下。
                构建时会自动生成文件列表，无需手动配置文件系统访问。
              </p>
            </div>

            <h4 className="font-semibold text-gray-900 mb-2">部署特性</h4>
            <ul className="mb-4">
              <li>• <strong>自动环境检测</strong>：根据部署环境自动选择文件系统模式</li>
              <li>• <strong>静态文件生成</strong>：构建时自动扫描并生成文件列表</li>
              <li>• <strong>无服务器兼容</strong>：完全兼容 Vercel 的 serverless 环境</li>
              <li>• <strong>CDN 加速</strong>：静态文件通过 Vercel CDN 加速访问</li>
            </ul>
          </section>

         

          <section id="troubleshooting" className="bg-white p-8 rounded-lg shadow-sm">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">🔧 故障排除</h2>
            
            <h3 className="text-lg font-semibold text-gray-900 mb-3">常见问题</h3>
            
            <div className="mb-6">
              <h4 className="font-semibold text-gray-900 mb-2">Vercel 部署后显示空白</h4>
              <ul className="text-gray-600 mb-4">
                <li>1. 确认文件放在 <code>public/files/</code> 目录下</li>
                <li>2. 检查 Vercel 构建日志是否有错误</li>
                <li>3. 确认环境变量配置正确</li>
                <li>4. 验证 <code>src/data/fileList.json</code> 已生成</li>
              </ul>
            </div>

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

            <div className="mb-6">
              <h4 className="font-semibold text-gray-900 mb-2">环境检测问题</h4>
              <ul className="text-gray-600 mb-4">
                <li>1. 项目会自动检测是否为 Vercel 部署环境</li>
                <li>2. 开发环境使用 fs 模块直接读取文件</li>
                <li>3. 生产环境使用预生成的静态文件列表</li>
                <li>4. 如需强制使用静态模式，设置 <code>NODE_ENV=production</code></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2">性能问题</h4>
              <ul className="text-gray-600">
                <li>1. 避免浏览包含大量文件的目录</li>
                <li>2. 关闭不必要的预览窗口</li>
                <li>3. 定期清理浏览器缓存</li>
                <li>4. 大文件建议放在外部存储服务</li>
              </ul>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}