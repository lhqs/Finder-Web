-- 文件浏览器数据库结构
-- SQL 示例文件，演示代码语法高亮功能

-- 创建数据库
CREATE DATABASE IF NOT EXISTS file_browser 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

USE file_browser;

-- 用户表
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(100),
    avatar_url VARCHAR(255),
    role ENUM('admin', 'user', 'guest') DEFAULT 'user',
    status ENUM('active', 'inactive', 'suspended') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    last_login_at TIMESTAMP NULL,
    
    INDEX idx_username (username),
    INDEX idx_email (email),
    INDEX idx_status (status),
    INDEX idx_created_at (created_at)
);

-- 文件系统表
CREATE TABLE file_systems (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    type ENUM('local', 'cloud', 'network') NOT NULL,
    root_path VARCHAR(500) NOT NULL,
    config JSON,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_type (type),
    INDEX idx_active (is_active)
);

-- 文件访问日志表
CREATE TABLE file_access_logs (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    file_path VARCHAR(1000) NOT NULL,
    action ENUM('view', 'download', 'preview', 'search') NOT NULL,
    file_size BIGINT,
    file_type VARCHAR(50),
    ip_address VARCHAR(45),
    user_agent TEXT,
    access_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    response_time_ms INT,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_user_id (user_id),
    INDEX idx_file_path (file_path(255)),
    INDEX idx_action (action),
    INDEX idx_access_time (access_time),
    INDEX idx_file_type (file_type)
);

-- 用户偏好设置表
CREATE TABLE user_preferences (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    preference_key VARCHAR(100) NOT NULL,
    preference_value JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE KEY uk_user_preference (user_id, preference_key),
    INDEX idx_user_id (user_id)
);

-- 文件收藏表
CREATE TABLE file_favorites (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    file_path VARCHAR(1000) NOT NULL,
    file_name VARCHAR(255) NOT NULL,
    file_type VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE KEY uk_user_file (user_id, file_path(255)),
    INDEX idx_user_id (user_id),
    INDEX idx_file_type (file_type)
);

-- 插入示例数据
INSERT INTO users (username, email, password_hash, full_name, role) VALUES
('admin', 'admin@example.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/VcQjyQ/EG', '系统管理员', 'admin'),
('demo_user', 'demo@example.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/VcQjyQ/EG', '演示用户', 'user'),
('guest_user', 'guest@example.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/VcQjyQ/EG', '访客用户', 'guest');

INSERT INTO file_systems (name, type, root_path, config) VALUES
('本地文件系统', 'local', '/files', '{"maxFileSize": "100MB", "allowedTypes": ["*"]}'),
('云存储', 'cloud', 's3://my-bucket/files', '{"provider": "aws", "region": "us-east-1"}'),
('网络存储', 'network', '//server/shared/files', '{"protocol": "smb", "timeout": 30}');

-- 创建视图：用户文件访问统计
CREATE VIEW user_file_stats AS
SELECT 
    u.id as user_id,
    u.username,
    u.full_name,
    COUNT(fal.id) as total_accesses,
    COUNT(DISTINCT fal.file_path) as unique_files,
    COUNT(CASE WHEN fal.action = 'view' THEN 1 END) as views,
    COUNT(CASE WHEN fal.action = 'download' THEN 1 END) as downloads,
    MAX(fal.access_time) as last_access,
    AVG(fal.response_time_ms) as avg_response_time
FROM users u
LEFT JOIN file_access_logs fal ON u.id = fal.user_id
GROUP BY u.id, u.username, u.full_name;

-- 创建存储过程：清理旧日志
DELIMITER //
CREATE PROCEDURE CleanOldLogs(IN days_to_keep INT)
BEGIN
    DECLARE rows_deleted INT DEFAULT 0;
    
    DELETE FROM file_access_logs 
    WHERE access_time < DATE_SUB(NOW(), INTERVAL days_to_keep DAY);
    
    SET rows_deleted = ROW_COUNT();
    
    SELECT CONCAT('已删除 ', rows_deleted, ' 条旧日志记录') as result;
END //
DELIMITER ;

-- 创建触发器：记录用户最后登录时间
DELIMITER //
CREATE TRIGGER update_last_login 
AFTER INSERT ON file_access_logs
FOR EACH ROW
BEGIN
    IF NEW.user_id IS NOT NULL THEN
        UPDATE users 
        SET last_login_at = NEW.access_time 
        WHERE id = NEW.user_id 
        AND (last_login_at IS NULL OR last_login_at < NEW.access_time);
    END IF;
END //
DELIMITER ;

-- 创建索引优化查询性能
CREATE INDEX idx_file_access_composite ON file_access_logs(user_id, access_time, action);
CREATE INDEX idx_file_path_hash ON file_access_logs(file_path(100));

-- 查询示例
-- 1. 获取最活跃的用户
SELECT * FROM user_file_stats 
ORDER BY total_accesses DESC 
LIMIT 10;

-- 2. 获取最受欢迎的文件类型
SELECT 
    file_type,
    COUNT(*) as access_count,
    COUNT(DISTINCT user_id) as unique_users
FROM file_access_logs 
WHERE file_type IS NOT NULL
GROUP BY file_type 
ORDER BY access_count DESC;

-- 3. 获取用户的收藏文件
SELECT 
    ff.file_name,
    ff.file_path,
    ff.file_type,
    ff.created_at as favorited_at
FROM file_favorites ff
JOIN users u ON ff.user_id = u.id
WHERE u.username = 'demo_user'
ORDER BY ff.created_at DESC;