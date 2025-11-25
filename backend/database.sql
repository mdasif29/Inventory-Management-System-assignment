-- Create Database
CREATE DATABASE IF NOT EXISTS inventory_db;
USE inventory_db;

-- Users Table
CREATE TABLE IF NOT EXISTS Users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'manager') DEFAULT 'manager',
    isBlocked BOOLEAN DEFAULT FALSE,
    isDeleted BOOLEAN DEFAULT FALSE,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Categories Table
CREATE TABLE IF NOT EXISTS Categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    description TEXT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Products Table
CREATE TABLE IF NOT EXISTS Products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    sku VARCHAR(255) NOT NULL UNIQUE,
    price DECIMAL(10, 2) NOT NULL,
    stock INT NOT NULL DEFAULT 0,
    imageUrl VARCHAR(255),
    categoryId INT,
    description TEXT,
    isDeleted BOOLEAN DEFAULT FALSE,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (categoryId) REFERENCES Categories(id) ON DELETE SET NULL
);

-- AuditLogs Table
CREATE TABLE IF NOT EXISTS AuditLogs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    action VARCHAR(50) NOT NULL,
    entity VARCHAR(50) NOT NULL,
    entityId INT,
    userId INT,
    details TEXT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES Users(id) ON DELETE SET NULL
);

-- SEED DATA

-- Insert Admin (Password: 123456)
-- Note: In real app, use bcrypt hash. This hash is for '123456'
INSERT INTO Users (name, email, password, role) VALUES 
('Admin User', 'admin@example.com', '$2a$10$X7.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1', 'admin');

-- Insert Manager (Password: 123456)
INSERT INTO Users (name, email, password, role) VALUES 
('Manager User', 'manager@example.com', '$2a$10$X7.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1', 'manager');

-- Insert Categories
INSERT INTO Categories (name, description) VALUES 
('Electronics', 'Gadgets and devices'),
('Clothing', 'Apparel and fashion'),
('Home & Garden', 'Furniture and tools');

-- Insert Products
INSERT INTO Products (name, sku, price, stock, categoryId, description) VALUES 
('iPhone 15', 'APPLE-15', 999.99, 50, 1, 'Latest Apple smartphone'),
('Samsung Galaxy S24', 'SAM-S24', 899.99, 30, 1, 'Flagship Android phone'),
('T-Shirt', 'TSHIRT-BLK', 19.99, 100, 2, 'Cotton black t-shirt'),
('Sofa', 'SOFA-GRY', 499.99, 5, 3, 'Comfortable grey sofa');
