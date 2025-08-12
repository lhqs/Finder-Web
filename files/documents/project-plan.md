# 项目开发计划

## 项目概述
这是一个现代化的文件浏览器项目，采用 Next.js 和 TypeScript 开发。

## 开发阶段

### 第一阶段：基础功能 ✅
- [x] 文件夹浏览
- [x] 分栏视图
- [x] 基础文件预览

### 第二阶段：增强预览 🚧
- [x] 图片预览
- [x] 视频播放
- [x] 代码高亮
- [ ] PDF 预览
- [ ] Office 文档预览

### 第三阶段：用户体验 📋
- [ ] 搜索功能
- [ ] 文件操作
- [ ] 主题切换
- [ ] 快捷键支持

## 技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| Next.js | 15 | 前端框架 |
| React | 19 | UI 库 |
| TypeScript | 5 | 类型系统 |
| Tailwind CSS | 4 | 样式框架 |

## 代码示例

```typescript
interface FileItem {
  name: string;
  type: 'file' | 'directory';
  size?: number;
  lastModified?: Date;
}
```

## 重要提醒

> **注意**: 这是一个演示项目，请不要在生产环境中直接使用。

## 联系方式

- 📧 Email: developer@example.com
- 🌐 Website: https://example.com
- 📱 GitHub: @developer