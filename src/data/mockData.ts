import { FileItem } from '@/types/file';

export const mockFileData: FileItem[] = [
  {
    id: '1',
    name: '文档',
    type: 'folder',
    path: '/文档',
    children: [
      {
        id: '1-1',
        name: '工作文档',
        type: 'folder',
        path: '/文档/工作文档',
        children: [
          {
            id: '1-1-1',
            name: '项目计划.txt',
            type: 'file',
            path: '/文档/工作文档/项目计划.txt',
            size: 2048,
            modified: new Date('2024-01-15'),
            mimeType: 'text/plain',
            content: '项目计划\n\n1. 需求分析\n   - 用户调研\n   - 功能定义\n   - 技术选型\n\n2. 设计阶段\n   - UI/UX 设计\n   - 系统架构设计\n   - 数据库设计\n\n3. 开发阶段\n   - 前端开发\n   - 后端开发\n   - 测试\n\n4. 部署上线\n   - 环境配置\n   - 性能优化\n   - 监控告警'
          },
          {
            id: '1-1-2',
            name: '会议记录.md',
            type: 'file',
            path: '/文档/工作文档/会议记录.md',
            size: 1536,
            modified: new Date('2024-01-20'),
            mimeType: 'text/markdown',
            content: '# 项目启动会议\n\n**时间**: 2024年1月20日\n**参与人员**: 张三、李四、王五\n\n## 会议议题\n\n1. 项目目标确认\n2. 时间节点规划\n3. 资源分配\n\n## 决议事项\n\n- [ ] 完成需求文档 (张三负责)\n- [ ] 技术方案评审 (李四负责)\n- [ ] UI设计稿 (王五负责)\n\n## 下次会议\n\n时间: 2024年1月27日'
          }
        ]
      },
      {
        id: '1-2',
        name: '个人笔记',
        type: 'folder',
        path: '/文档/个人笔记',
        children: [
          {
            id: '1-2-1',
            name: '学习笔记.txt',
            type: 'file',
            path: '/文档/个人笔记/学习笔记.txt',
            size: 3072,
            modified: new Date('2024-01-18'),
            mimeType: 'text/plain',
            content: 'React 学习笔记\n\n## Hooks\n\n### useState\n- 用于管理组件状态\n- 返回状态值和更新函数\n\n### useEffect\n- 处理副作用\n- 可以模拟生命周期方法\n\n### useContext\n- 跨组件传递数据\n- 避免 prop drilling\n\n## 最佳实践\n\n1. 保持组件简单\n2. 合理使用 memo\n3. 避免不必要的重渲染'
          }
        ]
      }
    ]
  },
  {
    id: '2',
    name: '图片',
    type: 'folder',
    path: '/图片',
    children: [
      {
        id: '2-1',
        name: '风景照',
        type: 'folder',
        path: '/图片/风景照',
        children: [
          {
            id: '2-1-1',
            name: '山景.jpg',
            type: 'file',
            path: '/图片/风景照/山景.jpg',
            size: 2048000,
            modified: new Date('2024-01-10'),
            mimeType: 'image/jpeg',
            content: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8ZGVmcz4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0ic2t5IiB4MT0iMCUiIHkxPSIwJSIgeDI9IjAlIiB5Mj0iMTAwJSI+CiAgICAgIDxzdG9wIG9mZnNldD0iMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiM4N0NFRkE7c3RvcC1vcGFjaXR5OjEiIC8+CiAgICAgIDxzdG9wIG9mZnNldD0iMTAwJSIgc3R5bGU9InN0b3AtY29sb3I6I0Y5RkJGRjtzdG9wLW9wYWNpdHk6MSIgLz4KICAgIDwvbGluZWFyR3JhZGllbnQ+CiAgPC9kZWZzPgogIDxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMjAwIiBmaWxsPSJ1cmwoI3NreSkiLz4KICA8cG9seWdvbiBwb2ludHM9IjAsMTUwIDEwMCw4MCAyMDAsMTIwIDMwMCw2MCAzMDAsMjAwIDAsMjAwIiBmaWxsPSIjNjM2NjZBIi8+CiAgPHBvbHlnb24gcG9pbnRzPSI1MCwxODAgMTUwLDEwMCAyNTAsMTQwIDMwMCwxMDAgMzAwLDIwMCA1MCwyMDAiIGZpbGw9IiM0QjVCNjMiLz4KICA8Y2lyY2xlIGN4PSI1MCIgY3k9IjUwIiByPSIyMCIgZmlsbD0iI0ZGRDcwMCIvPgo8L3N2Zz4='
          },
          {
            id: '2-1-2',
            name: '海景.jpg',
            type: 'file',
            path: '/图片/风景照/海景.jpg',
            size: 1856000,
            modified: new Date('2024-01-12'),
            mimeType: 'image/jpeg',
            content: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8ZGVmcz4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0ic2VhIiB4MT0iMCUiIHkxPSIwJSIgeDI9IjAlIiB5Mj0iMTAwJSI+CiAgICAgIDxzdG9wIG9mZnNldD0iMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiNBN0YzRDM7c3RvcC1vcGFjaXR5OjEiIC8+CiAgICAgIDxzdG9wIG9mZnNldD0iMTAwJSIgc3R5bGU9InN0b3AtY29sb3I6IzA2OTJCMjtzdG9wLW9wYWNpdHk6MSIgLz4KICAgIDwvbGluZWFyR3JhZGllbnQ+CiAgPC9kZWZzPgogIDxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjODdDRUZBIi8+CiAgPHJlY3QgeT0iMTAwIiB3aWR0aD0iMzAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0idXJsKCNzZWEpIi8+CiAgPGVsbGlwc2UgY3g9IjI1MCIgY3k9IjQwIiByeD0iMzAiIHJ5PSIyMCIgZmlsbD0iI0ZGRkZGRiIgb3BhY2l0eT0iMC44Ii8+CiAgPGVsbGlwc2UgY3g9IjEwMCIgY3k9IjMwIiByeD0iNDAiIHJ5PSIyNSIgZmlsbD0iI0ZGRkZGRiIgb3BhY2l0eT0iMC42Ii8+Cjwvc3ZnPg=='
          }
        ]
      }
    ]
  },
  {
    id: '3',
    name: '代码',
    type: 'folder',
    path: '/代码',
    children: [
      {
        id: '3-1',
        name: 'JavaScript',
        type: 'folder',
        path: '/代码/JavaScript',
        children: [
          {
            id: '3-1-1',
            name: 'utils.js',
            type: 'file',
            path: '/代码/JavaScript/utils.js',
            size: 1024,
            modified: new Date('2024-01-22'),
            mimeType: 'text/javascript',
            content: '// 工具函数集合\n\n/**\n * 防抖函数\n * @param {Function} func 要防抖的函数\n * @param {number} wait 等待时间\n * @returns {Function} 防抖后的函数\n */\nexport function debounce(func, wait) {\n  let timeout;\n  return function executedFunction(...args) {\n    const later = () => {\n      clearTimeout(timeout);\n      func(...args);\n    };\n    clearTimeout(timeout);\n    timeout = setTimeout(later, wait);\n  };\n}\n\n/**\n * 节流函数\n * @param {Function} func 要节流的函数\n * @param {number} limit 时间限制\n * @returns {Function} 节流后的函数\n */\nexport function throttle(func, limit) {\n  let inThrottle;\n  return function() {\n    const args = arguments;\n    const context = this;\n    if (!inThrottle) {\n      func.apply(context, args);\n      inThrottle = true;\n      setTimeout(() => inThrottle = false, limit);\n    }\n  };\n}'
          },
          {
            id: '3-1-2',
            name: 'config.json',
            type: 'file',
            path: '/代码/JavaScript/config.json',
            size: 512,
            modified: new Date('2024-01-21'),
            mimeType: 'application/json',
            content: '{\n  "name": "我的项目",\n  "version": "1.0.0",\n  "description": "一个示例项目",\n  "main": "index.js",\n  "scripts": {\n    "start": "node index.js",\n    "dev": "nodemon index.js",\n    "test": "jest",\n    "build": "webpack --mode production"\n  },\n  "dependencies": {\n    "express": "^4.18.0",\n    "lodash": "^4.17.21"\n  },\n  "devDependencies": {\n    "nodemon": "^2.0.20",\n    "jest": "^29.0.0",\n    "webpack": "^5.74.0"\n  },\n  "keywords": ["node", "express", "api"],\n  "author": "开发者",\n  "license": "MIT"\n}'
          }
        ]
      }
    ]
  },
  {
    id: '4',
    name: 'README.md',
    type: 'file',
    path: '/README.md',
    size: 1280,
    modified: new Date('2024-01-25'),
    mimeType: 'text/markdown',
    content: '# Mac Finder 风格文件浏览器\n\n这是一个基于 Next.js 和 Tailwind CSS 构建的文件浏览器，模仿 macOS Finder 的分栏视图。\n\n## 功能特性\n\n- 📁 多级文件夹浏览\n- 👀 文件内容预览\n- 🖼️ 图片预览支持\n- 📝 文本文件预览\n- 🎨 现代化 UI 设计\n\n## 技术栈\n\n- Next.js 15\n- React 19\n- TypeScript\n- Tailwind CSS\n- Heroicons\n\n## 使用方法\n\n1. 点击文件夹展开内容\n2. 点击文件查看预览\n3. 支持多级导航\n\n## 支持的文件类型\n\n- 文本文件 (.txt, .md, .js, .json 等)\n- 图片文件 (.jpg, .png, .svg 等)\n- 更多类型持续添加中...'
  }
];