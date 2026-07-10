 -- KaruNool Core Database Schema (MySQL)
-- Optimized for Multilingual support, Volunteer onboarding, and Inquiry tracking.

CREATE DATABASE IF NOT EXISTS karunool_db;
USE karunool_db;

-- 1. Districts of Tamil Nadu
CREATE TABLE districts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Craft Categories (with Endangered Flag)
CREATE TABLE craft_categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    is_endangered BOOLEAN DEFAULT FALSE,
    endangered_criteria TEXT, -- Reason why it's endangered
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Core User Table
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(150) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('ADMIN', 'ARTISAN', 'VOLUNTEER', 'BUYER') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Volunteer Profile (Tracking Trust & Impact)
CREATE TABLE volunteer_profiles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    trust_score INT DEFAULT 0,
    verified_onboards INT DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 5. Artisan Core Table (Non-language data)
CREATE TABLE artisans (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT, -- Linked if they have their own login
    district_id INT NOT NULL,
    category_id INT NOT NULL,
    onboarded_by_id INT NOT NULL, -- Volunteer ID (User)
    contact_number VARCHAR(20) NOT NULL,
    whatsapp_number VARCHAR(20),
    qr_code_token VARCHAR(100) UNIQUE,
    is_verified BOOLEAN DEFAULT FALSE,
    verification_status ENUM('DRAFT', 'PENDING', 'LIVE', 'ARCHIVED') DEFAULT 'DRAFT',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (district_id) REFERENCES districts(id),
    FOREIGN KEY (category_id) REFERENCES craft_categories(id),
    FOREIGN KEY (onboarded_by_id) REFERENCES users(id)
);

-- 6. Artisan Translations (Multilingual Support)
CREATE TABLE artisan_translations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    artisan_id INT NOT NULL,
    language_code CHAR(2) NOT NULL, -- 'ta' for Tamil, 'en' for English
    name VARCHAR(200) NOT NULL,
    bio TEXT,
    craft_story TEXT,
    UNIQUE KEY unique_artisan_language (artisan_id, language_code),
    FOREIGN KEY (artisan_id) REFERENCES artisans(id) ON DELETE CASCADE
);

-- 7. Media Gallery
CREATE TABLE media (
    id INT AUTO_INCREMENT PRIMARY KEY,
    artisan_id INT NOT NULL,
    url VARCHAR(512) NOT NULL,
    media_type ENUM('IMAGE', 'VIDEO') DEFAULT 'IMAGE',
    is_primary BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (artisan_id) REFERENCES artisans(id) ON DELETE CASCADE
);

-- 8. Inquiries (Safe Connection Bridge)
CREATE TABLE inquiries (
    id INT AUTO_INCREMENT PRIMARY KEY,
    buyer_id INT NOT NULL,
    artisan_id INT NOT NULL,
    message TEXT NOT NULL,
    status ENUM('PENDING', 'APPROVED', 'REJECTED', 'RESOLVED') DEFAULT 'PENDING',
    admin_notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (buyer_id) REFERENCES users(id),
    FOREIGN KEY (artisan_id) REFERENCES artisans(id)
);
