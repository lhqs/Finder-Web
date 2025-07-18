import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const ROOT_PATH = '/Users/lhqs/jijifeng';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const filePath = searchParams.get('path');

  if (!filePath) {
    return NextResponse.json({ error: 'Path parameter is required' }, { status: 400 });
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

    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': contentType,
        'Content-Length': stats.size.toString(),
        'Cache-Control': 'public, max-age=3600',
      },
    });

  } catch (error) {
    console.error('Error serving file:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}