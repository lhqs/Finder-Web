// JavaScript 示例文件
// 演示代码语法高亮功能

/**
 * 问候函数
 * @param {string} name - 姓名
 * @returns {string} 问候语
 */
function greet(name) {
    if (!name) {
        throw new Error('姓名不能为空');
    }
    
    return `你好，${name}！欢迎使用文件浏览器。`;
}

// 异步函数示例
async function fetchUserData(userId) {
    try {
        const response = await fetch(`/api/users/${userId}`);
        const userData = await response.json();
        
        return {
            success: true,
            data: userData
        };
    } catch (error) {
        console.error('获取用户数据失败:', error);
        return {
            success: false,
            error: error.message
        };
    }
}

// 类定义示例
class FileManager {
    constructor(rootPath) {
        this.rootPath = rootPath;
        this.files = new Map();
    }
    
    addFile(filename, content) {
        this.files.set(filename, {
            content,
            createdAt: new Date(),
            size: content.length
        });
    }
    
    getFile(filename) {
        return this.files.get(filename);
    }
    
    listFiles() {
        return Array.from(this.files.keys());
    }
}

// 使用示例
const manager = new FileManager('/files');
manager.addFile('example.txt', '这是示例内容');

console.log(greet('开发者'));
console.log('文件列表:', manager.listFiles());