-- =====================================================================
-- PRIYA'S AQUAFRESH – LASYA WATER PURIFIER SALES & SERVICES
-- Complete Relational Database Schema (MySQL 8.0+)
-- Business Location: Khilashapur Road, Raghunathpally, Jangaon, Telangana
-- Contact: 9014357848 / 9182857848 | GST: 36ETWPA6540J1Z7
-- =====================================================================

CREATE DATABASE IF NOT EXISTS `lasya_water_purifier` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `lasya_water_purifier`;

-- ---------------------------------------------------------------------
-- 1. ADMIN USERS & AUTHENTICATION
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `admin_users` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `username` VARCHAR(50) NOT NULL UNIQUE,
  `email` VARCHAR(100) NOT NULL UNIQUE,
  `password_hash` VARCHAR(255) NOT NULL,
  `full_name` VARCHAR(100) NOT NULL,
  `role` ENUM('super_admin', 'service_manager', 'technician') NOT NULL DEFAULT 'service_manager',
  `phone` VARCHAR(15) NULL,
  `is_active` TINYINT(1) NOT NULL DEFAULT 1,
  `last_login` DATETIME NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- ---------------------------------------------------------------------
-- 2. PRODUCT CATEGORIES
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `product_categories` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `name_en` VARCHAR(100) NOT NULL,
  `name_te` VARCHAR(150) NOT NULL,
  `slug` VARCHAR(100) NOT NULL UNIQUE,
  `parent_group` ENUM('water_purifiers', 'home_appliances', 'spare_parts') NOT NULL,
  `description_en` TEXT NULL,
  `description_te` TEXT NULL,
  `image_url` VARCHAR(255) NULL,
  `display_order` INT NOT NULL DEFAULT 0,
  `is_active` TINYINT(1) NOT NULL DEFAULT 1,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- ---------------------------------------------------------------------
-- 3. PRODUCTS CATALOGUE
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `products` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `category_id` INT UNSIGNED NOT NULL,
  `name_en` VARCHAR(150) NOT NULL,
  `name_te` VARCHAR(200) NOT NULL,
  `slug` VARCHAR(150) NOT NULL UNIQUE,
  `tagline` VARCHAR(255) NULL,
  `short_description_en` TEXT NOT NULL,
  `short_description_te` TEXT NOT NULL,
  `full_specifications` JSON NULL,
  `image_url` VARCHAR(255) NOT NULL,
  `additional_images` JSON NULL,
  `purification_tech` VARCHAR(100) NULL COMMENT 'e.g. RO + UV + UF + TDS Controller',
  `storage_capacity` VARCHAR(50) NULL COMMENT 'e.g. 10 Litres',
  `warranty_text_en` VARCHAR(100) DEFAULT '1 Year Guaranty (Terms Apply)',
  `warranty_text_te` VARCHAR(150) DEFAULT '1 ఇయర్ గ్యారంటీ (నియమ నిబంధనలు వర్తిస్తాయి)',
  `is_featured` TINYINT(1) NOT NULL DEFAULT 0,
  `is_active` TINYINT(1) NOT NULL DEFAULT 1,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT `fk_product_category` FOREIGN KEY (`category_id`) REFERENCES `product_categories` (`id`) ON DELETE RESTRICT
) ENGINE=InnoDB;

-- ---------------------------------------------------------------------
-- 4. SERVICE OFFERINGS
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `services` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `title_en` VARCHAR(120) NOT NULL,
  `title_te` VARCHAR(150) NOT NULL,
  `slug` VARCHAR(120) NOT NULL UNIQUE,
  `description_en` TEXT NOT NULL,
  `description_te` TEXT NOT NULL,
  `estimated_time` VARCHAR(50) NULL,
  `icon_name` VARCHAR(50) NOT NULL DEFAULT 'Wrench',
  `is_featured` TINYINT(1) NOT NULL DEFAULT 1,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- ---------------------------------------------------------------------
-- 5. SERVICE BOOKINGS & REPAIR REQUESTS
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `service_bookings` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `booking_reference` VARCHAR(25) NOT NULL UNIQUE COMMENT 'e.g. LWP-2026-1001',
  `customer_name` VARCHAR(100) NOT NULL,
  `mobile_number` VARCHAR(15) NOT NULL,
  `address` TEXT NOT NULL,
  `village_town` VARCHAR(100) NOT NULL,
  `service_category` ENUM(
    'New Installation',
    'General Service',
    'Water Leakage',
    'Filter Replacement',
    'RO Repair',
    'Membrane Replacement',
    'Other Service'
  ) NOT NULL,
  `product_type` VARCHAR(100) NOT NULL COMMENT 'e.g. Domestic RO, UV Purifier, Commercial RO, Fridge, Washing Machine, Air Cooler',
  `problem_description` TEXT NOT NULL,
  `preferred_date` DATE NOT NULL,
  `preferred_time` VARCHAR(50) NOT NULL,
  `booking_status` ENUM(
    'New',
    'Contacted',
    'Confirmed',
    'Assigned',
    'In Progress',
    'Completed',
    'Cancelled'
  ) NOT NULL DEFAULT 'New',
  `assigned_technician` VARCHAR(100) NULL,
  `technician_phone` VARCHAR(15) NULL,
  `service_notes` TEXT NULL,
  `completion_date` DATETIME NULL,
  `ip_address` VARCHAR(45) NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_status` (`booking_status`),
  INDEX `idx_mobile` (`mobile_number`),
  INDEX `idx_pref_date` (`preferred_date`)
) ENGINE=InnoDB;

-- ---------------------------------------------------------------------
-- 6. GENERAL CUSTOMER ENQUIRIES & LEAD CAPTURE
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `customer_enquiries` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `enquiry_reference` VARCHAR(25) NOT NULL UNIQUE,
  `customer_name` VARCHAR(100) NOT NULL,
  `mobile_number` VARCHAR(15) NOT NULL,
  `product_or_service_interest` VARCHAR(150) NOT NULL,
  `village_town` VARCHAR(100) NULL,
  `message` TEXT NOT NULL,
  `source_channel` ENUM('Website Form', 'WhatsApp Direct', 'Phone Call') DEFAULT 'Website Form',
  `status` ENUM('New', 'Contacted', 'Closed') DEFAULT 'New',
  `notes` TEXT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- ---------------------------------------------------------------------
-- 7. SPARE PARTS INVENTORY DIRECTORY
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `spare_parts` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `part_name_en` VARCHAR(150) NOT NULL,
  `part_name_te` VARCHAR(150) NOT NULL,
  `part_code` VARCHAR(50) NULL,
  `category` ENUM('Water Purifier Filter', 'Membrane', 'Electrical / Pump', 'Fittings / Accessories', 'AC & Appliance Part') NOT NULL,
  `compatibility` VARCHAR(255) NOT NULL COMMENT 'e.g. All Domestic RO Systems, Aquaguard, Kent, etc.',
  `description_en` TEXT NOT NULL,
  `description_te` TEXT NOT NULL,
  `image_url` VARCHAR(255) NOT NULL,
  `in_stock` TINYINT(1) NOT NULL DEFAULT 1,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- ---------------------------------------------------------------------
-- 8. INITIAL SEED DATA
-- ---------------------------------------------------------------------

-- Seed Admin (Default initial demo credentials)
INSERT INTO `admin_users` (`username`, `email`, `password_hash`, `full_name`, `role`, `phone`)
VALUES ('admin', 'ramesh@lasyawater.com', '$2y$10$YourHashedPasswordHere...', 'Ramesh (Proprietor)', 'super_admin', '9014357848')
ON DUPLICATE KEY UPDATE `full_name`=VALUES(`full_name`);

-- Seed Categories
INSERT INTO `product_categories` (`id`, `name_en`, `name_te`, `slug`, `parent_group`, `description_en`, `description_te`, `image_url`, `display_order`) VALUES
(1, 'Water Purifiers', 'వాటర్ ప్యూరిఫైయర్లు', 'water-purifiers', 'water_purifiers', 'RO, UV, and multi-stage domestic and commercial water purifiers.', 'గృహ మరియు వాణిజ్య అవసరాలకు RO, UV వాటర్ ప్యూరిఫైయర్లు.', '/images/products/water-purifiers/category-purifiers.png', 1),
(2, 'Refrigerators (Fridges)', 'ఫ్రిడ్జ్ లు', 'fridges', 'home_appliances', 'Single and double door refrigerators for home and commercial use.', 'సింగిల్ మరియు డబుల్ డోర్ ఫ్రిడ్జ్ లు లభించును.', '/images/products/fridges/category-fridges.png', 2),
(3, 'Washing Machines', 'వాషింగ్ మెషిన్లు', 'washing-machines', 'home_appliances', 'Top load and front load washing machines with expert installation.', 'టాప్ లోడ్ మరియు ఫ్రంట్ లోడ్ వాషింగ్ మెషిన్లు.', '/images/products/washing-machines/category-washing-machines.png', 3),
(4, 'Air Coolers', 'ఎయిర్ కూలర్లు', 'air-coolers', 'home_appliances', 'High efficiency desert and personal air coolers for summer comfort.', 'నాణ్యమైన ఎయిర్ కూలర్లు అందుబాటులో కలవు.', '/images/products/air-coolers/category-air-coolers.png', 4),
(5, 'AC Spare Parts', 'AC స్పేర్ పార్ట్స్', 'ac-spare-parts', 'home_appliances', 'Compressors, copper piping, fan motors, capacitors and AC gas.', 'అన్ని రకాల AC స్పేర్ పార్ట్స్ లభించును.', '/images/products/ac-spare-parts/category-ac-spare-parts.png', 5)
ON DUPLICATE KEY UPDATE `name_en`=VALUES(`name_en`);

-- ---------------------------------------------------------------------
-- 9. USEFUL REPORTING VIEW FOR ADMIN DASHBOARD
-- ---------------------------------------------------------------------
CREATE OR REPLACE VIEW `v_dashboard_kpis` AS
SELECT
  (SELECT COUNT(*) FROM `service_bookings`) AS `total_bookings`,
  (SELECT COUNT(*) FROM `service_bookings` WHERE `booking_status` = 'New') AS `new_bookings`,
  (SELECT COUNT(*) FROM `service_bookings` WHERE `booking_status` = 'In Progress') AS `in_progress_bookings`,
  (SELECT COUNT(*) FROM `service_bookings` WHERE `booking_status` = 'Completed') AS `completed_bookings`,
  (SELECT COUNT(*) FROM `customer_enquiries`) AS `total_enquiries`,
  (SELECT COUNT(*) FROM `customer_enquiries` WHERE `status` = 'New') AS `new_enquiries`,
  (SELECT COUNT(*) FROM `products` WHERE `is_active` = 1) AS `active_products`;
