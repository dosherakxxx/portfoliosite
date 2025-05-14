CREATE DATABASE bytenest_db;
USE p-349030_testuser;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    role ENUM('user', 'admin') DEFAULT 'user'
);

CREATE TABLE user_profiles (
    user_id INT PRIMARY KEY,
    full_name VARCHAR(100),
    phone VARCHAR(20),
    company VARCHAR(100),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Add indexes for better performance
ALTER TABLE users ADD INDEX idx_email (email);
ALTER TABLE users ADD INDEX idx_username (username);
ALTER TABLE user_profiles ADD INDEX idx_phone (phone);
