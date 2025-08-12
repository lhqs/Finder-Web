#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Python 示例文件
演示 Python 代码的语法高亮功能
"""

import os
import json
from datetime import datetime
from typing import List, Dict, Optional

class FileExplorer:
    """文件浏览器类"""
    
    def __init__(self, root_path: str):
        self.root_path = root_path
        self.supported_formats = {
            'images': ['.jpg', '.png', '.gif', '.svg'],
            'videos': ['.mp4', '.webm', '.mov'],
            'documents': ['.pdf', '.doc', '.docx'],
            'code': ['.py', '.js', '.ts', '.java', '.cpp']
        }
    
    def scan_directory(self, path: str) -> List[Dict]:
        """扫描目录并返回文件列表"""
        files = []
        
        try:
            for item in os.listdir(path):
                item_path = os.path.join(path, item)
                
                file_info = {
                    'name': item,
                    'path': item_path,
                    'is_directory': os.path.isdir(item_path),
                    'size': self._get_file_size(item_path),
                    'modified': self._get_modified_time(item_path),
                    'type': self._get_file_type(item)
                }
                
                files.append(file_info)
                
        except PermissionError:
            print(f"权限不足，无法访问: {path}")
        except FileNotFoundError:
            print(f"路径不存在: {path}")
            
        return sorted(files, key=lambda x: (not x['is_directory'], x['name']))
    
    def _get_file_size(self, path: str) -> Optional[int]:
        """获取文件大小"""
        try:
            return os.path.getsize(path) if os.path.isfile(path) else None
        except OSError:
            return None
    
    def _get_modified_time(self, path: str) -> str:
        """获取修改时间"""
        try:
            timestamp = os.path.getmtime(path)
            return datetime.fromtimestamp(timestamp).strftime('%Y-%m-%d %H:%M:%S')
        except OSError:
            return "未知"
    
    def _get_file_type(self, filename: str) -> str:
        """根据文件扩展名判断文件类型"""
        _, ext = os.path.splitext(filename.lower())
        
        for category, extensions in self.supported_formats.items():
            if ext in extensions:
                return category
        
        return 'other'
    
    def format_size(self, size: Optional[int]) -> str:
        """格式化文件大小"""
        if size is None:
            return "-"
        
        units = ['B', 'KB', 'MB', 'GB', 'TB']
        unit_index = 0
        
        while size >= 1024 and unit_index < len(units) - 1:
            size /= 1024
            unit_index += 1
        
        return f"{size:.1f} {units[unit_index]}"

def main():
    """主函数"""
    explorer = FileExplorer('/files')
    files = explorer.scan_directory('/files')
    
    print("文件浏览器 - Python 版本")
    print("=" * 40)
    
    for file_info in files:
        icon = "📁" if file_info['is_directory'] else "📄"
        size = explorer.format_size(file_info['size'])
        
        print(f"{icon} {file_info['name']:<30} {size:>10} {file_info['modified']}")

if __name__ == "__main__":
    main()