'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navigation = () => {
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: '首页', description: '文件浏览器主页' },
    { href: '/features', label: '功能特性', description: '查看所有功能特性' },
    { href: '/docs', label: '使用文档', description: '安装配置指南' },
    { href: '/about', label: '关于', description: '了解项目背景' },
  ];

  return (
    <nav className="bg-white shadow-sm" role="navigation" aria-label="主导航">
      <div className="max-w-7xl mx-auto px-4 sm:px-16 lg:px-8">
        <div className="flex justify-between h-14">
          <div className="flex items-center">
            <Link 
              href="/" 
              className="flex-shrink-0 flex items-center"
              aria-label="专业文件浏览器首页"
            >
              <span className="text-lg md:text-xl font-bold text-gray-900">
              Mac Finder 风格文件浏览器
              </span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  pathname === item.href
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                }`}
                aria-label={item.description}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;