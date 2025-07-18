# 专业文件浏览器 - 现代化在线文件管理工具

[![Next.js](https://img.shields.io/badge/Next.js-15-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4-38B2AC)](https://tailwindcss.com/)
[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)

一个基于 Next.js 构建的现代化文件浏览器，采用类似 macOS Finder 的分栏视图设计，支持20+种文件格式的在线预览功能。为开发者和用户提供高效、直观的文件管理体验。

🌟 **[在线演示](https://your-domain.com)** | 📖 **[完整文档](https://your-domain.com/docs)** | 🚀 **[功能特性](https://your-domain.com/features)**

## ✨ 功能特性

### 🗂️ 文件浏览
- **分栏视图**: 类似 macOS Finder 的多栏导航体验
- **横向滚动**: 支持多层级文件夹的无限展开
- **智能排序**: 文件夹优先，按名称自然排序
- **文件图标**: 根据文件类型显示不同的彩色图标

### 👀 文件预览
- **图片预览**: 支持 JPG、PNG、GIF、SVG、WebP 等格式
- **视频播放**: 支持 MP4、WebM、MOV、AVI 等主流视频格式
- **音频播放**: 支持 MP3、WAV、AAC、FLAC 等音频格式
- **文档预览**: 支持 PDF 文档的在线预览
- **代码高亮**: 支持 JavaScript、Python、Java、C++、SQL 等多种编程语言
- **Markdown 渲染**: 完整的 Markdown 文档渲染支持
- **CSV 表格**: 智能解析和表格化显示 CSV 数据
- **JSON 格式化**: 自动格式化和语法高亮 JSON 文件

### 🎨 用户体验
- **响应式设计**: 适配不同屏幕尺寸
- **可展开预览**: 预览区域可在 1/3 和 3/4 宽度间切换
- **专业 UI**: 现代化的界面设计，注重细节和易用性
- **性能优化**: 大文件智能处理，避免浏览器卡顿

## 🚀 快速开始

### 环境要求
- Node.js 18.0 或更高版本
- pnpm（推荐）或 npm

### 安装依赖
```bash
pnpm install
```

### 配置文件路径
在 `src/utils/fileSystem.ts` 和 `src/app/api/file/route.ts` 中修改 `ROOT_PATH` 为你想要浏览的目录：

```typescript
const ROOT_PATH = '/your/target/directory';
```

### 启动开发服务器
```bash
pnpm dev
```

访问 [http://localhost:3000](http://localhost:3000) 开始使用。

### 构建生产版本
```bash
pnpm build
pnpm start
```

## 📁 项目结构

```
finder-web/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/file/          # 文件服务 API
│   │   ├── globals.css        # 全局样式
│   │   ├── layout.tsx         # 根布局
│   │   └── page.tsx           # 主页面
│   ├── components/            # React 组件
│   │   └── ColumnView.tsx     # 核心文件浏览组件
│   ├── types/                 # TypeScript 类型定义
│   │   └── file.ts           # 文件相关类型
│   └── utils/                 # 工具函数
│       └── fileSystem.ts      # 文件系统操作
├── public/                    # 静态资源
├── package.json              # 项目配置
└── README.md                 # 项目文档
```

## 🛠️ 技术栈

- **框架**: Next.js 15 (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS v4 + Tailwind Typography
- **图标**: Heroicons
- **代码高亮**: react-syntax-highlighter
- **Markdown**: react-markdown
- **包管理**: pnpm

## 📋 支持的文件格式

### 🖼️ 图片格式
- JPG/JPEG、PNG、GIF、SVG、WebP、BMP、ICO

### 🎬 视频格式
- MP4、WebM、OGV、MOV、AVI、WMV、FLV、MKV

### 🎵 音频格式
- MP3、WAV、OGG、AAC、M4A、FLAC、WMA

### 📄 文档格式
- PDF、DOC/DOCX、XLS/XLSX、PPT/PPTX

### 💻 代码格式
- JavaScript/TypeScript (JS, JSX, TS, TSX)
- Python (PY)
- Java (JAVA)
- C/C++ (C, CPP, CC, CXX, H, HPP)
- PHP (PHP)
- Go (GO)
- Rust (RS)
- Shell (SH, BASH, ZSH)
- SQL (SQL)
- CSS/HTML (CSS, HTML, HTM)
- YAML (YML, YAML)
- XML (XML)

### 📊 数据格式
- JSON (格式化显示)
- CSV (表格化显示)
- Markdown (渲染显示)
- 纯文本 (TXT, LOG)

## ⚙️ 配置说明

### 修改根目录
编辑以下文件中的 `ROOT_PATH` 常量：

1. `src/utils/fileSystem.ts` - 文件系统读取
2. `src/app/api/file/route.ts` - 文件服务 API

```typescript
const ROOT_PATH = '/Users/your-username/your-directory';
```

### 性能配置
- 文本文件大小限制: 1MB（可在 `fileSystem.ts` 中修改）
- CSV 显示行数: 普通模式 10 行，展开模式 50 行
- 代码高亮最大高度: 普通模式 384px，展开模式无限制

## 🔒 安全特性

- **路径验证**: 严格限制文件访问范围，防止目录遍历攻击
- **文件类型检查**: 只允许预览安全的文件类型
- **大小限制**: 自动跳过过大文件的内容读取

## 🎯 使用技巧

1. **快速导航**: 点击文件夹名称快速展开子目录
2. **预览切换**: 点击预览区右上角的展开按钮获得更大的预览空间
3. **多格式支持**: 支持拖拽或点击不同格式的文件进行预览
4. **响应式体验**: 在不同设备上都能获得良好的浏览体验

## 🐛 故障排除

### 文件无法预览
1. 检查文件路径是否正确
2. 确认文件格式是否在支持列表中
3. 检查文件大小是否超过限制（1MB）
4. 查看浏览器控制台是否有错误信息

### 视频/音频无法播放
1. 确认浏览器支持该媒体格式
2. 检查文件是否损坏
3. 尝试在其他播放器中测试文件

### 性能问题
1. 避免浏览包含大量文件的目录
2. 关闭不必要的预览窗口
3. 定期清理浏览器缓存

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request 来改进这个项目！

### 开发流程
1. Fork 本仓库
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🙏 致谢

- [Next.js](https://nextjs.org/) - React 全栈框架
- [Tailwind CSS](https://tailwindcss.com/) - 实用优先的 CSS 框架
- [Heroicons](https://heroicons.com/) - 精美的 SVG 图标库
- [react-syntax-highlighter](https://github.com/react-syntax-highlighter/react-syntax-highlighter) - 代码语法高亮
- [react-markdown](https://github.com/remarkjs/react-markdown) - Markdown 渲染器

---

**享受你的文件浏览体验！** 🎉