/**
 * 应用配置文件
 * 统一管理文件浏览器的配置项
 */

export interface AppConfig {
  /** 文件浏览模式 */
  mode: 'local' | 'files';
  /** 本地文件系统根路径 (mode: 'local' 时使用) */
  rootPath: string;
  /** 项目文件夹配置 (mode: 'files' 时使用) */
  filesFolder: {
    /** 是否启用项目文件夹模式 */
    enabled: boolean;
    /** 项目文件夹相对路径 */
    folderPath: string;
  };
  /** 文件预览配置 */
  preview: {
    /** 文本文件最大大小 (字节) */
    maxTextFileSize: number;
    /** CSV 预览行数限制 */
    csvRowLimit: {
      normal: number;
      expanded: number;
    };
  };
}

const config: AppConfig = {
  // 文件浏览模式: 'local' = 浏览本地文件系统, 'files' = 浏览项目files文件夹
  mode: process.env.FILE_BROWSER_MODE as 'local' | 'files' || 'local',
  
  // 本地文件系统根路径
  rootPath: process.env.ROOT_PATH || '/Users',
  
  // 项目文件夹配置
  filesFolder: {
    enabled: process.env.FILES_MODE_ENABLED === 'true',
    folderPath: process.env.FILES_FOLDER_PATH || 'public/files',
  },
  
  // 预览配置
  preview: {
    maxTextFileSize: 1024 * 1024, // 1MB
    csvRowLimit: {
      normal: 10,
      expanded: 50
    }
  }
};

export default config;