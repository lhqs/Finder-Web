import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";



export const metadata: Metadata = {
  title: "专业文件浏览器 - 类似macOS Finder的在线文件管理工具",
  description: "基于Next.js构建的现代化文件浏览器，支持多种文件格式预览、分栏视图、代码高亮、图片视频音频播放。免费开源的在线文件管理解决方案。",
  keywords: "文件浏览器,文件管理器,在线文件预览,代码查看器,图片浏览器,视频播放器,PDF预览,Markdown渲染,CSV表格,文件管理工具,macOS Finder,Next.js,React,开源项目",
  authors: [{ name: "文件浏览器开发团队" }],
  creator: "专业文件浏览器",
  publisher: "专业文件浏览器",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    url: 'https://finder.lhqs.ink',
    title: '专业文件浏览器 - 现代化在线文件管理工具',
    description: '支持多种文件格式预览的专业文件浏览器，类似macOS Finder的分栏视图设计，代码高亮、图片视频播放、PDF预览等功能一应俱全。',
    siteName: '专业文件浏览器',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: '专业文件浏览器界面预览',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '专业文件浏览器 - 现代化在线文件管理工具',
    description: '支持多种文件格式预览的专业文件浏览器，类似macOS Finder的分栏视图设计。',
    images: ['/twitter-image.jpg'],
    creator: '@your-twitter-handle',
  },
  alternates: {
    canonical: 'https://finder.lhqs.ink',
    languages: {
      'zh-CN': 'https://finder.lhqs.ink',
      'en-US': 'https://finder.lhqs.ink/en',
    },
  },
  category: '工具软件',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#3b82f6" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={`antialiased`}>
        <div className="min-h-screen flex flex-col">
          <Navigation />
          <main className="flex-1">
            {children}
          </main>
          {/* <footer className="bg-gray-50 border-t py-8 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center text-gray-600">
                <p className="mb-2">
                  © 2024 专业文件浏览器. 基于 MIT 许可证开源.
                </p>
                <p className="text-sm">
                  使用 Next.js、React 和 TypeScript 构建 | 
                  <a href="https://github.com/your-username/finder-web" className="text-blue-600 hover:text-blue-800 ml-1">
                    GitHub 源码
                  </a>
                </p>
              </div>
            </div>
          </footer> */}
        </div>
      </body>
    </html>
  );
}
