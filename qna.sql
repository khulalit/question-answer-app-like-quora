-- MariaDB dump 10.17  Distrib 10.4.11-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: qna
-- ------------------------------------------------------
-- Server version	8.0.29

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `accounts`
--

DROP TABLE IF EXISTS `accounts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `accounts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accounts`
--

LOCK TABLES `accounts` WRITE;
/*!40000 ALTER TABLE `accounts` DISABLE KEYS */;
INSERT INTO `accounts` VALUES (1,'test','test','test@test.com'),(2,'khu','pass','email@gmail.com');
/*!40000 ALTER TABLE `accounts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `admin_permissions`
--


DROP TABLE IF EXISTS `ans`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ans` (
  `id` int NOT NULL AUTO_INCREMENT,
  `content` mediumtext,
  `qid` int DEFAULT NULL,
  `uid` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `uid` (`uid`),
  KEY `qid` (`qid`),
  CONSTRAINT `ans_ibfk_1` FOREIGN KEY (`uid`) REFERENCES `accounts` (`id`),
  CONSTRAINT `ans_ibfk_2` FOREIGN KEY (`qid`) REFERENCES `ques` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ans`
--

LOCK TABLES `ans` WRITE;
/*!40000 ALTER TABLE `ans` DISABLE KEYS */;
INSERT INTO `ans` VALUES (1,'Thi sis an danefdjf',1,2),(2,'Answer for question 2',2,2),(3,'Another Answer for question 2',2,2),(4,'This is answer',1,2),(5,'dfsdfdsfdsfdsfsfdsfdsfdsf',1,1),(6,'This is a new answer i have given .',1,1),(7,'Yes this is my asnwer',5,1);
/*!40000 ALTER TABLE `ans` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `answers`
--


DROP TABLE IF EXISTS `ques`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ques` (
  `id` int NOT NULL AUTO_INCREMENT,
  `content` text,
  `created_by` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `created_by` (`created_by`),
  CONSTRAINT `ques_ibfk_1` FOREIGN KEY (`created_by`) REFERENCES `accounts` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ques`
--

LOCK TABLES `ques` WRITE;
/*!40000 ALTER TABLE `ques` DISABLE KEYS */;
INSERT INTO `ques` VALUES (1,'whalts PPp',1),(2,'jfljdsfds kdsjfds fdsf ',1),(3,'kldsjfkdjfsfjddfdsfds',1),(4,'This is new ques',2),(5,'new from site',1),(6,'What is democracy?',2);
/*!40000 ALTER TABLE `ques` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `questions`
--
