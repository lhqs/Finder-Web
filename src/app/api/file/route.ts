import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import config from '../../../../config/app.config';
import { findFileByPath } from '@/utils/staticFileSystem';

// 获取根路径配置
const getRootPath = (): string => {
  if (config.mode === 'files') {
    return path.resolve(process.cwd(), config.filesFolder.folderPath);
  }
  return config.rootPath;
};

const ROOT_PATH = getRootPath();

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const filePath = searchParams.get('path');
  const isDownload = searchParams.get('download') === 'true';

  if (!filePath) {
    return NextResponse.json({ error: 'Path parameter is required' }, { status: 400 });
  }

  // 如果是静态部署环境，使用静态文件服务
  if (config.isStaticDeploy) {
    try {
      const fileItem = findFileByPath(filePath);
      
      if (!fileItem || fileItem.type === 'folder') {
        return NextResponse.json({ error: 'File not found' }, { status: 404 });
      }

      // 对于静态部署，重定向到 public 文件
      const publicPath = `/files${filePath}`;
      return NextResponse.redirect(new URL(publicPath, request.url));
      
    } catch (error) {
      console.error('Error serving static file:', error);
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
  }

  try {
    // 清理路径，移除开头的斜杠
    const cleanPath = filePath.startsWith('/') ? filePath.slice(1) : filePath;
    // 构建完整路径
    const fullPath = path.join(ROOT_PATH, cleanPath);
    
    console.log('Requested path:', filePath);
    console.log('Clean path:', cleanPath);
    console.log('Full path:', fullPath);
    console.log('ROOT_PATH:', ROOT_PATH);
    
    // 安全检查：确保路径在允许的目录内
    const resolvedPath = path.resolve(fullPath);
    const resolvedRoot = path.resolve(ROOT_PATH);
    if (!resolvedPath.startsWith(resolvedRoot)) {
      console.log('Access denied - path outside root');
      return NextResponse.json({ error: 'Access denied' }, { status: 403 });
    }

    // 检查文件是否存在
    if (!fs.existsSync(resolvedPath)) {
      console.log('File not found:', resolvedPath);
      return NextResponse.json({ error: 'File not found', path: resolvedPath }, { status: 404 });
    }

    const stats = fs.statSync(resolvedPath);
    
    // 如果是目录，返回错误
    if (stats.isDirectory()) {
      return NextResponse.json({ error: 'Path is a directory' }, { status: 400 });
    }

    // 读取文件
    const fileBuffer = fs.readFileSync(resolvedPath);
    const ext = path.extname(fullPath).toLowerCase();
    
    // 设置正确的 Content-Type
    let contentType = 'application/octet-stream';
    const mimeTypes: { [key: string]: string } = {
      // 图片格式
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.png': 'image/png',
      '.gif': 'image/gif',
      '.svg': 'image/svg+xml',
      '.webp': 'image/webp',
      '.bmp': 'image/bmp',
      '.ico': 'image/x-icon',
      // 视频格式
      '.mp4': 'video/mp4',
      '.webm': 'video/webm',
      '.ogv': 'video/ogg',
      '.mov': 'video/quicktime',
      '.avi': 'video/x-msvideo',
      '.wmv': 'video/x-ms-wmv',
      '.flv': 'video/x-flv',
      '.mkv': 'video/x-matroska',
      // 音频格式
      '.mp3': 'audio/mpeg',
      '.wav': 'audio/wav',
      '.ogg': 'audio/ogg',
      '.aac': 'audio/aac',
      '.m4a': 'audio/mp4',
      '.flac': 'audio/flac',
      '.wma': 'audio/x-ms-wma',
      // 文档格式
      '.pdf': 'application/pdf',
      '.doc': 'application/msword',
      '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      '.xls': 'application/vnd.ms-excel',
      '.xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      '.ppt': 'application/vnd.ms-powerpoint',
      '.pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    };
    
    contentType = mimeTypes[ext] || contentType;

    const headers: Record<string, string> = {
      'Content-Type': contentType,
      'Content-Length': stats.size.toString(),
      'Cache-Control': 'public, max-age=3600',
    };

    // 如果是下载请求，添加下载头部
    if (isDownload) {
      const fileName = path.basename(resolvedPath);
      headers['Content-Disposition'] = `attachment; filename="${encodeURIComponent(fileName)}"`;
    }

    return new NextResponse(fileBuffer, {
      headers,
    });

  } catch (error) {
    console.error('Error serving file:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}