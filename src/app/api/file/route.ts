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
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.png': 'image/png',
      '.gif': 'image/gif',
      '.svg': 'image/svg+xml',
      '.webp': 'image/webp',
      '.pdf': 'application/pdf',
      '.mp4': 'video/mp4',
      '.webm': 'video/webm',
      '.ogv': 'video/ogg',
      '.mov': 'video/quicktime',
      '.avi': 'video/x-msvideo',
      '.mp3': 'audio/mpeg',
      '.wav': 'audio/wav',
      '.ogg': 'audio/ogg',
      '.aac': 'audio/aac',
      '.m4a': 'audio/mp4',
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