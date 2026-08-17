-- MySQL dump 10.13  Distrib 8.0.46, for Win64 (x86_64)
--
-- Host: localhost    Database: kvr_school
-- ------------------------------------------------------
-- Server version	8.0.46

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `username` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `full_name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `mobile` varchar(15) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `role` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT 'ADMIN',
  `status` enum('ACTIVE','INACTIVE') COLLATE utf8mb4_unicode_ci DEFAULT 'ACTIVE',
  `last_login` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `uk_admin_username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` VALUES (1,'admin','admin123','School Administrator','admin@kvrschool.com','7674050823','ADMIN','ACTIVE','2026-08-17 06:45:30','2026-08-14 10:22:28','2026-08-17 06:45:30');
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `attendance`
--

DROP TABLE IF EXISTS `attendance`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `attendance` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `attendance_date` date NOT NULL,
  `student_id` bigint NOT NULL,
  `class_id` bigint NOT NULL,
  `teacher_id` bigint DEFAULT NULL,
  `status` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `check_in_time` time DEFAULT NULL,
  `check_out_time` time DEFAULT NULL,
  `remarks` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `marked_at` datetime(6) DEFAULT NULL,
  `academic_year` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_attendance_student_date` (`student_id`,`attendance_date`),
  KEY `fk_attendance_teacher` (`teacher_id`),
  KEY `idx_attendance_date` (`attendance_date`),
  KEY `idx_attendance_student` (`student_id`),
  KEY `idx_attendance_class` (`class_id`),
  CONSTRAINT `fk_attendance_class` FOREIGN KEY (`class_id`) REFERENCES `classes` (`id`),
  CONSTRAINT `fk_attendance_student` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`),
  CONSTRAINT `fk_attendance_teacher` FOREIGN KEY (`teacher_id`) REFERENCES `teachers` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `attendance`
--

LOCK TABLES `attendance` WRITE;
/*!40000 ALTER TABLE `attendance` DISABLE KEYS */;
INSERT INTO `attendance` VALUES (1,'2026-08-14',1,4,NULL,'PRESENT',NULL,NULL,NULL,'2026-08-14 10:22:40','2026-08-14 10:22:40',NULL,''),(2,'2026-08-14',2,5,NULL,'ABSENT',NULL,NULL,NULL,'2026-08-14 10:22:40','2026-08-14 10:22:40',NULL,''),(3,'2026-08-17',1,4,1,'PRESENT',NULL,NULL,'','2026-08-17 07:44:34','2026-08-17 09:50:10',NULL,'2026-2027'),(4,'2026-08-17',2,5,NULL,'ABSENT',NULL,NULL,'','2026-08-17 07:49:08','2026-08-17 07:51:01',NULL,''),(5,'2026-08-17',3,6,NULL,'PRESENT',NULL,NULL,'','2026-08-17 07:49:13','2026-08-17 14:07:50',NULL,'2026-2027'),(6,'2026-08-17',4,7,NULL,'LATE',NULL,NULL,'','2026-08-17 07:49:17','2026-08-17 07:50:47',NULL,''),(7,'2026-08-17',5,8,NULL,'HALF_DAY',NULL,NULL,'','2026-08-17 07:49:18','2026-08-17 07:49:18',NULL,''),(8,'2026-08-17',8,4,NULL,'PRESENT',NULL,NULL,'','2026-08-17 07:49:19','2026-08-17 09:50:10',NULL,'2026-2027'),(9,'2026-08-17',9,4,NULL,'ABSENT',NULL,NULL,'','2026-08-17 07:49:20','2026-08-17 09:50:10',NULL,'2026-2027'),(10,'2026-08-16',3,6,NULL,'PRESENT',NULL,NULL,'','2026-08-17 14:07:57','2026-08-17 14:07:57',NULL,'2026-2027');
/*!40000 ALTER TABLE `attendance` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `classes`
--

DROP TABLE IF EXISTS `classes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `classes` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `class_name` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `section` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `academic_year` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `age_from` int DEFAULT NULL,
  `age_to` int DEFAULT NULL,
  `capacity` int DEFAULT '40',
  `class_teacher` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `room_number` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` enum('ACTIVE','INACTIVE') COLLATE utf8mb4_unicode_ci DEFAULT 'ACTIVE',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `classes`
--

LOCK TABLES `classes` WRITE;
/*!40000 ALTER TABLE `classes` DISABLE KEYS */;
INSERT INTO `classes` VALUES (1,'Nursery','-','2026-2027',3,4,30,'ashok kumar','N-101','ACTIVE','2026-08-14 10:22:28','2026-08-17 07:50:29'),(2,'LKG','-','2026-2027',4,5,30,'','LKG-101','ACTIVE','2026-08-14 10:22:28','2026-08-15 13:06:42'),(3,'UKG','A','2026-2027',5,6,30,'','UKG-101','ACTIVE','2026-08-14 10:22:28','2026-08-14 10:22:28'),(4,'1st Class','A','2026-2027',6,7,40,'Ramesh Kumar','101','ACTIVE','2026-08-14 10:22:28','2026-08-14 10:22:28'),(5,'2nd Class','A','2026-2027',7,8,40,'Lakshmi Devi','102','ACTIVE','2026-08-14 10:22:28','2026-08-14 10:22:28'),(6,'3rd Class','A','2026-2027',8,9,40,'Suresh Reddy','103','ACTIVE','2026-08-14 10:22:28','2026-08-14 10:22:28'),(7,'4th Class','A','2026-2027',9,10,40,'Anitha Kumari','104','ACTIVE','2026-08-14 10:22:28','2026-08-14 10:22:28'),(8,'5th Class','A','2026-2027',10,11,40,'Prasad Naidu','105','ACTIVE','2026-08-14 10:22:28','2026-08-14 10:22:28'),(9,'6th Class','A','2026-2027',11,12,40,'','201','ACTIVE','2026-08-14 10:22:28','2026-08-14 10:22:28'),(10,'7th Class','A','2026-2027',12,13,40,'','202','ACTIVE','2026-08-14 10:22:28','2026-08-14 10:22:28'),(11,'8th Class','A','2026-2027',13,14,40,'','203','INACTIVE','2026-08-14 10:22:28','2026-08-17 07:50:36'),(12,'9th Class','A','2026-2027',14,15,40,'','301','INACTIVE','2026-08-14 10:22:28','2026-08-17 07:50:34'),(13,'10th Class','A','2026-2027',15,16,40,'','302','INACTIVE','2026-08-14 10:22:28','2026-08-17 07:50:32');
/*!40000 ALTER TABLE `classes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `exams`
--

DROP TABLE IF EXISTS `exams`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `exams` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `exam_code` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `exam_name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `exam_type` enum('Unit Test','Monthly','Quarterly','Half-Yearly','Pre-Final','Annual') COLLATE utf8mb4_unicode_ci NOT NULL,
  `class_id` bigint NOT NULL,
  `subject_id` bigint NOT NULL,
  `teacher_id` bigint DEFAULT NULL,
  `academic_year` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `exam_date` date NOT NULL,
  `start_time` time DEFAULT NULL,
  `end_time` time DEFAULT NULL,
  `total_marks` int DEFAULT '100',
  `passing_marks` int DEFAULT '35',
  `exam_room` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `instructions` text COLLATE utf8mb4_unicode_ci,
  `status` enum('SCHEDULED','ONGOING','COMPLETED','CANCELLED') COLLATE utf8mb4_unicode_ci DEFAULT 'SCHEDULED',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `exam_code` (`exam_code`),
  KEY `fk_exam_class` (`class_id`),
  KEY `fk_exam_subject` (`subject_id`),
  KEY `fk_exam_teacher` (`teacher_id`),
  CONSTRAINT `fk_exam_class` FOREIGN KEY (`class_id`) REFERENCES `classes` (`id`),
  CONSTRAINT `fk_exam_subject` FOREIGN KEY (`subject_id`) REFERENCES `subjects` (`id`),
  CONSTRAINT `fk_exam_teacher` FOREIGN KEY (`teacher_id`) REFERENCES `teachers` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `exams`
--

LOCK TABLES `exams` WRITE;
/*!40000 ALTER TABLE `exams` DISABLE KEYS */;
/*!40000 ALTER TABLE `exams` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fees`
--

DROP TABLE IF EXISTS `fees`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fees` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `receipt_no` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `student_id` bigint NOT NULL,
  `class_id` bigint NOT NULL,
  `academic_year` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `fee_category` enum('Admission','Monthly','Quarterly','Half-Yearly','Yearly','Exam','Transport','Hostel','Library','Miscellaneous') COLLATE utf8mb4_unicode_ci DEFAULT 'Monthly',
  `payment_month` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `total_fee` decimal(10,2) NOT NULL,
  `discount` decimal(10,2) DEFAULT '0.00',
  `scholarship` decimal(10,2) DEFAULT '0.00',
  `late_fee` decimal(10,2) DEFAULT '0.00',
  `payable_amount` decimal(10,2) DEFAULT NULL,
  `paid_amount` decimal(10,2) DEFAULT '0.00',
  `pending_amount` decimal(10,2) DEFAULT '0.00',
  `payment_date` date DEFAULT NULL,
  `due_date` date DEFAULT NULL,
  `payment_mode` enum('Cash','UPI','Card','Net Banking','Cheque') COLLATE utf8mb4_unicode_ci DEFAULT 'Cash',
  `transaction_id` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `payment_status` enum('PAID','PARTIAL','PENDING') COLLATE utf8mb4_unicode_ci DEFAULT 'PENDING',
  `remarks` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `bus_fee` decimal(10,2) NOT NULL,
  `paid_fee` decimal(10,2) NOT NULL,
  `pending_fee` decimal(10,2) NOT NULL,
  `school_fee` decimal(10,2) NOT NULL,
  `last_payment_date` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_fee_student` (`student_id`),
  UNIQUE KEY `uk_fee_student_year` (`student_id`,`academic_year`),
  UNIQUE KEY `receipt_no` (`receipt_no`),
  KEY `idx_fee_student` (`student_id`),
  KEY `idx_fee_academic_year` (`academic_year`),
  KEY `idx_fee_class` (`class_id`),
  CONSTRAINT `fk_fee_class` FOREIGN KEY (`class_id`) REFERENCES `classes` (`id`),
  CONSTRAINT `fk_fee_student` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fees`
--

LOCK TABLES `fees` WRITE;
/*!40000 ALTER TABLE `fees` DISABLE KEYS */;
INSERT INTO `fees` VALUES (1,NULL,1,4,'2026-2027','Monthly',NULL,25000.00,0.00,0.00,0.00,NULL,0.00,0.00,'2026-08-16',NULL,'Cash',NULL,'PENDING','','2026-08-17 15:02:50','2026-08-17 15:05:04',15000.00,25000.00,0.00,10000.00,NULL);
/*!40000 ALTER TABLE `fees` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `library`
--

DROP TABLE IF EXISTS `library`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `library` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `book_code` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `book_title` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `author_name` varchar(150) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `publisher` varchar(150) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `isbn` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `category` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `edition` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `language` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT 'English',
  `total_copies` int DEFAULT '1',
  `available_copies` int DEFAULT '1',
  `shelf_number` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `student_id` bigint DEFAULT NULL,
  `issue_date` date DEFAULT NULL,
  `due_date` date DEFAULT NULL,
  `return_date` date DEFAULT NULL,
  `fine_amount` decimal(10,2) DEFAULT '0.00',
  `status` enum('AVAILABLE','ISSUED','RETURNED','LOST') COLLATE utf8mb4_unicode_ci DEFAULT 'AVAILABLE',
  `remarks` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `book_code` (`book_code`),
  KEY `fk_library_student` (`student_id`),
  CONSTRAINT `fk_library_student` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `library`
--

LOCK TABLES `library` WRITE;
/*!40000 ALTER TABLE `library` DISABLE KEYS */;
INSERT INTO `library` VALUES (1,'BK100','English Grammar','Wren & Martin',NULL,NULL,'English',NULL,'English',10,8,NULL,NULL,NULL,NULL,NULL,0.00,'AVAILABLE',NULL,'2026-08-14 10:22:40','2026-08-14 10:22:40'),(2,'BK101','Science Basics','NCERT',NULL,NULL,'Science',NULL,'English',15,12,NULL,NULL,NULL,NULL,NULL,0.00,'AVAILABLE',NULL,'2026-08-14 10:22:40','2026-08-14 10:22:40');
/*!40000 ALTER TABLE `library` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `marks`
--

DROP TABLE IF EXISTS `marks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `marks` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `student_id` bigint NOT NULL,
  `exam_id` bigint NOT NULL,
  `subject_id` bigint NOT NULL,
  `class_id` bigint NOT NULL,
  `teacher_id` bigint NOT NULL,
  `academic_year` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `max_marks` int DEFAULT '100',
  `pass_marks` int DEFAULT '35',
  `obtained_marks` decimal(5,2) NOT NULL,
  `percentage` decimal(5,2) DEFAULT NULL,
  `grade` varchar(5) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `result` enum('PASS','FAIL','ABSENT') COLLATE utf8mb4_unicode_ci DEFAULT 'PASS',
  `remarks` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_marks_student` (`student_id`),
  KEY `fk_marks_exam` (`exam_id`),
  KEY `fk_marks_subject` (`subject_id`),
  KEY `fk_marks_class` (`class_id`),
  KEY `fk_marks_teacher` (`teacher_id`),
  CONSTRAINT `fk_marks_class` FOREIGN KEY (`class_id`) REFERENCES `classes` (`id`),
  CONSTRAINT `fk_marks_exam` FOREIGN KEY (`exam_id`) REFERENCES `exams` (`id`),
  CONSTRAINT `fk_marks_student` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`),
  CONSTRAINT `fk_marks_subject` FOREIGN KEY (`subject_id`) REFERENCES `subjects` (`id`),
  CONSTRAINT `fk_marks_teacher` FOREIGN KEY (`teacher_id`) REFERENCES `teachers` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `marks`
--

LOCK TABLES `marks` WRITE;
/*!40000 ALTER TABLE `marks` DISABLE KEYS */;
/*!40000 ALTER TABLE `marks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notifications`
--

DROP TABLE IF EXISTS `notifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notifications` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `notification_code` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `message` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `notification_type` enum('NOTICE','SMS','EMAIL','PUSH','WHATSAPP') COLLATE utf8mb4_unicode_ci NOT NULL,
  `recipient_type` enum('ALL','STUDENT','PARENT','TEACHER','ADMIN') COLLATE utf8mb4_unicode_ci NOT NULL,
  `student_id` bigint DEFAULT NULL,
  `teacher_id` bigint DEFAULT NULL,
  `created_by` bigint DEFAULT NULL,
  `scheduled_date` datetime DEFAULT NULL,
  `sent_date` datetime DEFAULT NULL,
  `priority` enum('LOW','MEDIUM','HIGH','URGENT') COLLATE utf8mb4_unicode_ci DEFAULT 'MEDIUM',
  `delivery_status` enum('PENDING','SENT','FAILED') COLLATE utf8mb4_unicode_ci DEFAULT 'PENDING',
  `is_active` tinyint(1) DEFAULT '1',
  `remarks` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `notification_code` (`notification_code`),
  KEY `fk_notification_student` (`student_id`),
  KEY `fk_notification_teacher` (`teacher_id`),
  KEY `fk_notification_admin` (`created_by`),
  CONSTRAINT `fk_notification_admin` FOREIGN KEY (`created_by`) REFERENCES `admin` (`id`),
  CONSTRAINT `fk_notification_student` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`),
  CONSTRAINT `fk_notification_teacher` FOREIGN KEY (`teacher_id`) REFERENCES `teachers` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notifications`
--

LOCK TABLES `notifications` WRITE;
/*!40000 ALTER TABLE `notifications` DISABLE KEYS */;
INSERT INTO `notifications` VALUES (1,'NOT100','School Reopens','School will reopen on June 10.','NOTICE','ALL',NULL,NULL,1,NULL,NULL,'HIGH','SENT',1,NULL,'2026-08-14 10:22:40','2026-08-14 10:22:40');
/*!40000 ALTER TABLE `notifications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `parents`
--

DROP TABLE IF EXISTS `parents`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `parents` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `parent_code` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `father_name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `mother_name` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `guardian_name` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `relationship` enum('Father','Mother','Guardian') COLLATE utf8mb4_unicode_ci DEFAULT 'Father',
  `father_mobile` varchar(15) COLLATE utf8mb4_unicode_ci NOT NULL,
  `mother_mobile` varchar(15) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `alternate_mobile` varchar(15) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `father_email` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `mother_email` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `occupation` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `annual_income` decimal(12,2) DEFAULT NULL,
  `aadhaar_number` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address_line1` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address_line2` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `village` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `mandal` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `district` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `state` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `country` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT 'India',
  `pincode` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `emergency_contact_name` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `emergency_contact_number` varchar(15) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` enum('ACTIVE','INACTIVE') COLLATE utf8mb4_unicode_ci DEFAULT 'ACTIVE',
  `remarks` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `parent_code` (`parent_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `parents`
--

LOCK TABLES `parents` WRITE;
/*!40000 ALTER TABLE `parents` DISABLE KEYS */;
/*!40000 ALTER TABLE `parents` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `role_name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `role_name` (`role_name`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'ADMIN','System Administrator','2026-08-14 10:22:30'),(2,'PRINCIPAL','School Principal','2026-08-14 10:22:30'),(3,'TEACHER','Teacher','2026-08-14 10:22:30'),(4,'STUDENT','Student','2026-08-14 10:22:30'),(5,'PARENT','Parent','2026-08-14 10:22:30');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `students`
--

DROP TABLE IF EXISTS `students`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `students` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `admission_no` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `roll_no` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `first_name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_name` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `full_name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `gender` enum('Male','Female','Other') COLLATE utf8mb4_unicode_ci NOT NULL,
  `date_of_birth` date NOT NULL,
  `blood_group` varchar(5) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `aadhaar_number` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `student_photo` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `class_id` bigint NOT NULL,
  `admission_date` date NOT NULL,
  `academic_year` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `father_name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `mother_name` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `guardian_name` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `parent_mobile` varchar(15) COLLATE utf8mb4_unicode_ci NOT NULL,
  `alternate_mobile` varchar(15) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `parent_email` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `occupation` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `annual_income` decimal(12,2) DEFAULT '0.00',
  `address_line1` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address_line2` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `village` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `mandal` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `district` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `state` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `country` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT 'India',
  `pincode` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `bus_required` tinyint(1) DEFAULT '0',
  `bus_route` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `pickup_point` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `fee_category` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `total_fee` decimal(10,2) DEFAULT '0.00',
  `paid_fee` decimal(10,2) DEFAULT '0.00',
  `pending_fee` decimal(10,2) DEFAULT '0.00',
  `scholarship` decimal(10,2) DEFAULT '0.00',
  `hostel_required` tinyint(1) DEFAULT '0',
  `medical_condition` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `allergies` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `emergency_contact_name` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `emergency_contact_number` varchar(15) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `previous_school` varchar(150) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tc_number` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `remarks` text COLLATE utf8mb4_unicode_ci,
  `status` enum('ACTIVE','INACTIVE','TRANSFERRED','COMPLETED') COLLATE utf8mb4_unicode_ci DEFAULT 'ACTIVE',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `admission_no` (`admission_no`),
  KEY `idx_student_class` (`class_id`),
  KEY `idx_student_mobile` (`parent_mobile`),
  KEY `idx_student_name` (`full_name`),
  KEY `idx_student_admission` (`admission_no`),
  CONSTRAINT `fk_students_class` FOREIGN KEY (`class_id`) REFERENCES `classes` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `students`
--

LOCK TABLES `students` WRITE;
/*!40000 ALTER TABLE `students` DISABLE KEYS */;
INSERT INTO `students` VALUES (1,'KVR2026001','student123','1','Rahul','Reddy','Rahul Reddy','Male','2019-06-15','O+',NULL,NULL,4,'2026-06-01','2026-2027','Ramesh Reddy','Lakshmi','Ramesh Reddy','9876543210','9876543211','rahul@example.com','Farmer',450000.00,'Main Road','Near Temple','Vayalpadu','Vayalpadu','Annamayya','Andhra Pradesh','India','517299',1,'Route-1','Bus Stop','Monthly',30000.00,10000.00,20000.00,0.00,0,NULL,NULL,'Ramesh Reddy','9876543210','Little Flowers School','TC001','Good Student','ACTIVE','2026-08-14 10:22:39','2026-08-15 04:48:17'),(2,'KVR2026002','student123','2','Sneha','Reddy','Sneha Reddy','Female','2018-09-20','A+',NULL,NULL,5,'2026-06-01','2026-2027','Suresh','Anitha','Suresh','9123456789','9123456790','sneha@example.com','Business',800000.00,'Tharigonda Road','Near Bus Stand','Vayalpadu','Vayalpadu','Annamayya','Andhra Pradesh','India','517299',0,NULL,NULL,'Monthly',32000.00,32000.00,0.00,2000.00,0,NULL,'Peanuts','Suresh','9123456789','Bhashyam School','TC002','Excellent Student','INACTIVE','2026-08-14 10:22:39','2026-08-16 04:18:37'),(3,'KVR2026003',NULL,'3','Arjun','Kumar','Arjun Kumar','Male','2017-11-12','B+',NULL,NULL,6,'2026-06-01','2026-2027','Prakash','Deepa','Prakash','9988776655',NULL,'arjun@example.com','Government Employee',650000.00,'Market Street',NULL,'Vayalpadu','Vayalpadu','Annamayya','Andhra Pradesh','India','517299',1,'Route-2','Market Circle','Quarterly',36000.00,12000.00,24000.00,1000.00,0,NULL,NULL,'Prakash','9988776655','Vidya School','TC003','Regular Attendance','ACTIVE','2026-08-14 10:22:39','2026-08-14 10:22:39'),(4,'KVR2026004',NULL,'4','Keerthana','Rao','Keerthana Rao','Female','2016-05-08','AB+',NULL,NULL,7,'2026-06-01','2026-2027','Ravi Rao','Sujatha','Ravi Rao','9012345678',NULL,'keerthana@example.com','Engineer',1200000.00,'Teachers Colony',NULL,'Vayalpadu','Vayalpadu','Annamayya','Andhra Pradesh','India','517299',0,NULL,NULL,'Yearly',40000.00,40000.00,0.00,5000.00,0,NULL,NULL,'Ravi Rao','9012345678','Delhi Public School','TC004','Merit Student','ACTIVE','2026-08-14 10:22:39','2026-08-14 10:22:39'),(5,'KVR2026005',NULL,'5','Harsha','Varma','Harsha Varma','Male','2015-01-18','A-',NULL,NULL,8,'2026-06-01','2026-2027','Venkatesh','Bhavani','Venkatesh','9345678901',NULL,'harsha@example.com','Doctor',1500000.00,'Railway Colony',NULL,'Vayalpadu','Vayalpadu','Annamayya','Andhra Pradesh','India','517299',1,'Route-3','Railway Gate','Half-Yearly',45000.00,22500.00,22500.00,3000.00,0,'Asthma',NULL,'Venkatesh','9345678901','Sri Chaitanya','TC005','Needs Medical Attention','ACTIVE','2026-08-14 10:22:39','2026-08-14 10:22:39'),(8,'KVR2026006','student123','2','Ananya','Reddy','Ananya Reddy','Female','2019-08-20','A+',NULL,NULL,4,'2026-08-16','2026-2027','Suresh Reddy','Lakshmi Reddy',NULL,'9876543211',NULL,'ananya@example.com',NULL,0.00,NULL,NULL,NULL,NULL,NULL,NULL,'India',NULL,0,NULL,NULL,'Quarterly',25000.00,12000.00,13000.00,0.00,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'ACTIVE','2026-08-16 04:12:24','2026-08-17 04:12:58'),(9,'KVR2027001','student123','3','Jahnavi','Gurramkonda','Gurramkonda Jahnavi','Female','2020-04-16','','','',4,'2026-08-16','2026-2027','Gurramkonda Ganesh','P BHAVANI','','07674050823','','ganikings.g@gmail.com','',0.00,'2 53 1, Marripadu, gurramkonda , Annamayya','Marripadu','','','','','India','517299',0,'','','Monthly',0.00,0.00,0.00,0.00,0,'','','','','','','','ACTIVE','2026-08-16 04:17:15','2026-08-16 04:17:50');
/*!40000 ALTER TABLE `students` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subjects`
--

DROP TABLE IF EXISTS `subjects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subjects` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `subject_code` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `subject_name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `subject_type` enum('Language','Core','Practical','Activity','Optional') COLLATE utf8mb4_unicode_ci DEFAULT 'Core',
  `class_id` bigint NOT NULL,
  `teacher_id` bigint DEFAULT NULL,
  `weekly_periods` int DEFAULT '6',
  `total_marks` int DEFAULT '100',
  `passing_marks` int DEFAULT '35',
  `status` enum('ACTIVE','INACTIVE') COLLATE utf8mb4_unicode_ci DEFAULT 'ACTIVE',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `subject_code` (`subject_code`),
  KEY `fk_subject_class` (`class_id`),
  KEY `fk_subject_teacher` (`teacher_id`),
  CONSTRAINT `fk_subject_class` FOREIGN KEY (`class_id`) REFERENCES `classes` (`id`),
  CONSTRAINT `fk_subject_teacher` FOREIGN KEY (`teacher_id`) REFERENCES `teachers` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subjects`
--

LOCK TABLES `subjects` WRITE;
/*!40000 ALTER TABLE `subjects` DISABLE KEYS */;
/*!40000 ALTER TABLE `subjects` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `teachers`
--

DROP TABLE IF EXISTS `teachers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `teachers` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `employee_id` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `first_name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_name` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `full_name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `gender` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `date_of_birth` date DEFAULT NULL,
  `qualification` varchar(150) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `specialization` varchar(150) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `experience_years` int DEFAULT '0',
  `mobile` varchar(15) COLLATE utf8mb4_unicode_ci NOT NULL,
  `alternate_mobile` varchar(15) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `aadhaar_number` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address_line1` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address_line2` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `village` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `mandal` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `district` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `state` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `country` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT 'India',
  `pincode` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `joining_date` date DEFAULT NULL,
  `salary` decimal(10,2) DEFAULT NULL,
  `designation` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `class_id` bigint DEFAULT NULL,
  `subject` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `photo_path` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `emergency_contact_name` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `emergency_contact_number` varchar(15) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `bank_name` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `account_number` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ifsc_code` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `department` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `section` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `employee_id` (`employee_id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `aadhaar_number` (`aadhaar_number`),
  KEY `fk_teacher_class` (`class_id`),
  KEY `idx_teacher_employee` (`employee_id`),
  KEY `idx_teacher_name` (`full_name`),
  KEY `idx_teacher_mobile` (`mobile`),
  CONSTRAINT `fk_teacher_class` FOREIGN KEY (`class_id`) REFERENCES `classes` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teachers`
--

LOCK TABLES `teachers` WRITE;
/*!40000 ALTER TABLE `teachers` DISABLE KEYS */;
INSERT INTO `teachers` VALUES (1,'TCH001','Ramesh','Kumar','Ramesh Kumar','Male','1985-02-15','M.Sc, B.Ed','Mathematics',10,'9000000001',NULL,'ramesh@kvrschool.com','111122223333','Teachers Colony',NULL,NULL,NULL,NULL,NULL,'India',NULL,'2023-06-01',35000.00,'Class Teacher',NULL,'Mathematics',NULL,'ACTIVE',NULL,NULL,NULL,NULL,NULL,'2026-08-14 10:22:39','2026-08-17 06:54:46','',NULL,NULL),(2,'TCH002','Lakshmi','Devi','Lakshmi Devi','Female','1988-07-20','M.A, B.Ed','English',8,'9000000002',NULL,'lakshmi@kvrschool.com','111122223334','Main Road',NULL,'Vayalpadu','Vayalpadu','Annamayya','Andhra Pradesh','India','517299','2022-06-01',34000.00,'Senior Teacher',5,'English',NULL,'ACTIVE',NULL,NULL,NULL,NULL,NULL,'2026-08-14 10:22:39','2026-08-14 10:22:39',NULL,NULL,NULL),(3,'TCH003','Suresh','Reddy','Suresh Reddy','Male','1984-03-12','M.Sc, B.Ed','Science',12,'9000000003',NULL,'suresh@kvrschool.com','111122223335','Bus Stand Road',NULL,'Vayalpadu','Vayalpadu','Annamayya','Andhra Pradesh','India','517299','2021-06-01',38000.00,'Senior Teacher',6,'Science',NULL,'ACTIVE',NULL,NULL,NULL,NULL,NULL,'2026-08-14 10:22:39','2026-08-14 10:22:39',NULL,NULL,NULL),(4,'TCH004','Anitha','Kumari','Anitha Kumari','Female','1990-09-08','M.A, B.Ed','Social',6,'9000000004',NULL,'anitha@kvrschool.com','111122223336','Temple Street',NULL,'Vayalpadu','Vayalpadu','Annamayya','Andhra Pradesh','India','517299','2024-06-01',32000.00,'Teacher',7,'Social',NULL,'ACTIVE',NULL,NULL,NULL,NULL,NULL,'2026-08-14 10:22:39','2026-08-14 10:22:39',NULL,NULL,NULL),(5,'TCH005','Prasad','Naidu','Prasad Naidu','Male','1986-01-05','MCA','Computer Science',9,'9000000567','','prasad@kvrschool.com','111122223337','School Road','','Vayalpadu','Vayalpadu','Annamayya','Andhra Pradesh','India','517299','2023-06-01',36000.00,'Computer Teacher',8,'Computer',NULL,'ACTIVE',NULL,NULL,NULL,NULL,NULL,'2026-08-14 10:22:39','2026-08-17 14:30:37','',NULL,'');
/*!40000 ALTER TABLE `teachers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transport`
--

DROP TABLE IF EXISTS `transport`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transport` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `student_id` bigint NOT NULL,
  `class_id` bigint NOT NULL,
  `academic_year` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `bus_number` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `vehicle_number` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `route_name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `pickup_point` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `pickup_time` time DEFAULT NULL,
  `drop_time` time DEFAULT NULL,
  `driver_name` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `driver_mobile` varchar(15) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `attendant_name` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `transport_fee` decimal(10,2) DEFAULT '0.00',
  `payment_status` enum('PAID','PARTIAL','PENDING') COLLATE utf8mb4_unicode_ci DEFAULT 'PENDING',
  `remarks` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_transport_student` (`student_id`),
  KEY `fk_transport_class` (`class_id`),
  CONSTRAINT `fk_transport_class` FOREIGN KEY (`class_id`) REFERENCES `classes` (`id`),
  CONSTRAINT `fk_transport_student` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transport`
--

LOCK TABLES `transport` WRITE;
/*!40000 ALTER TABLE `transport` DISABLE KEYS */;
INSERT INTO `transport` VALUES (1,1,4,'2026-2027','BUS-01','AP39AB1234','Vayalpadu Route','Bus Stand',NULL,NULL,NULL,NULL,NULL,12000.00,'PAID',NULL,'2026-08-14 10:22:40','2026-08-14 10:22:40'),(2,2,5,'2026-2027','BUS-02','AP39CD5678','Thamballapalle Route','Main Road',NULL,NULL,NULL,NULL,NULL,12000.00,'PARTIAL',NULL,'2026-08-14 10:22:40','2026-08-14 10:22:40');
/*!40000 ALTER TABLE `transport` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_roles`
--

DROP TABLE IF EXISTS `user_roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_roles` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint NOT NULL,
  `role_id` bigint NOT NULL,
  `assigned_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `assigned_by` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_user_role_user` (`user_id`),
  KEY `fk_user_role_role` (`role_id`),
  KEY `fk_user_role_admin` (`assigned_by`),
  CONSTRAINT `fk_user_role_admin` FOREIGN KEY (`assigned_by`) REFERENCES `admin` (`id`),
  CONSTRAINT `fk_user_role_role` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`),
  CONSTRAINT `fk_user_role_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_roles`
--

LOCK TABLES `user_roles` WRITE;
/*!40000 ALTER TABLE `user_roles` DISABLE KEYS */;
INSERT INTO `user_roles` VALUES (1,1,1,'2026-08-14 10:22:30',1),(2,2,2,'2026-08-14 10:22:30',1),(3,3,3,'2026-08-14 10:22:30',1),(4,4,4,'2026-08-14 10:22:30',1);
/*!40000 ALTER TABLE `user_roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `username` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(150) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `mobile` varchar(15) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `full_name` varchar(150) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `role_id` bigint NOT NULL,
  `student_id` bigint DEFAULT NULL,
  `teacher_id` bigint DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT '1',
  `last_login` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`),
  KEY `fk_users_role` (`role_id`),
  KEY `fk_users_student` (`student_id`),
  KEY `fk_users_teacher` (`teacher_id`),
  CONSTRAINT `fk_users_role` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`),
  CONSTRAINT `fk_users_student` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`),
  CONSTRAINT `fk_users_teacher` FOREIGN KEY (`teacher_id`) REFERENCES `teachers` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'admin','admin123','admin@kvrschool.com','9876543210','System Administrator',1,NULL,NULL,1,NULL,'2026-08-14 10:22:30','2026-08-14 10:22:30'),(2,'principal','principal123','principal@kvrschool.com','9876543211','School Principal',2,NULL,NULL,1,NULL,'2026-08-14 10:22:30','2026-08-14 10:22:30'),(3,'teacher1','teacher123','teacher1@kvrschool.com','9876543212','Ravi Kumar',3,NULL,NULL,1,NULL,'2026-08-14 10:22:30','2026-08-14 10:22:30'),(4,'student1','student123','student1@kvrschool.com','9876543213','Rahul Reddy',4,NULL,NULL,1,NULL,'2026-08-14 10:22:30','2026-08-14 10:22:30'),(5,'teacher2','teacher123','teacher2@kvr.com',NULL,'Anitha Teacher',3,NULL,NULL,1,NULL,'2026-08-14 10:22:40','2026-08-14 10:22:40'),(6,'student2','student123','student2@kvr.com',NULL,'Sneha Reddy',4,NULL,NULL,1,NULL,'2026-08-14 10:22:40','2026-08-14 10:22:40');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'kvr_school'
--

--
-- Dumping routines for database 'kvr_school'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-08-17 20:39:11
