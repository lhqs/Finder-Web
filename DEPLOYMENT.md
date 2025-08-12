# Vercel 部署指南

## 问题解决方案

### 问题描述
在 Vercel 部署时，文件浏览器显示空白，无法显示文件列表。

### 根本原因
Vercel 的 serverless 环境无法使用 Node.js 的 `fs` 模块访问文件系统，且项目中的 `files` 文件夹不会被包含在部署包中。

### 解决方案
我们实现了一个混合方案，根据部署环境自动选择不同的文件系统：

1. **开发环境**: 使用 `fs` 模块直接读取文件系统
2. **生产环境**: 使用预生成的静态文件列表

## 部署步骤

### 1. 环境变量配置
在 Vercel 项目设置中添加以下环境变量：

```bash
FILE_BROWSER_MODE=files
FILES_MODE_ENABLED=true
FILES_FOLDER_PATH=public/files
```

### 2. 文件结构
确保文件放在 `public/files/` 目录下：

```
public/
├── files/
│   ├── documents/
│   ├── images/
│   ├── code-samples/
│   └── ...
└── ...
```

### 3. 构建配置
项目已配置自动在构建时生成文件列表：

```json
{
  "scripts": {
    "prebuild": "node scripts/generateFileList.js",
    "build": "next build"
  }
}
```

### 4. 部署到 Vercel

#### 方法一：通过 Vercel CLI
```bash
npm install -g vercel
vercel --prod
```

#### 方法二：通过 Git 集成
1. 将代码推送到 GitHub
2. 在 Vercel 中连接 GitHub 仓库
3. 配置环境变量
4. 部署

## 技术实现

### 环境检测
```typescript
// config/app.config.ts
isStaticDeploy: process.env.VERCEL === '1' || process.env.NODE_ENV === 'production'
```

### 文件系统适配
```typescript
// src/app/page.tsx
const fileData = config.isStaticDeploy 
  ? await readStaticDirectory()
  : await readDirectory();
```

### 静态文件生成
```javascript
// scripts/generateFileList.js
// 在构建时扫描 public/files 目录并生成 JSON 文件
```

## 验证部署

部署完成后，访问你的 Vercel 域名，应该能看到：
1. 文件列表正常显示
2. 分栏视图正常工作
3. 文件预览功能正常

## 故障排除

### 如果仍然显示空白
1. 检查 Vercel 构建日志
2. 确认 `src/data/fileList.json` 已生成
3. 检查环境变量配置
4. 确认文件在 `public/files/` 目录下

### 如果文件预览不工作
1. 检查文件路径是否正确
2. 确认文件在 `public/files/` 目录下
3. 检查 API 路由是否正常

## 本地测试生产构建

```bash
npm run build
npm start
```

这将模拟生产环境，使用静态文件列表。

## 注意事项

1. 每次添加新文件后需要重新构建
2. 大文件建议放在外部存储服务
3. 文件路径中的特殊字符需要正确编码
4. 建议定期清理不需要的文件以减少构建时间