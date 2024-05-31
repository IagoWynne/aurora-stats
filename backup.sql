-- MySQL dump 10.13  Distrib 8.3.0, for Linux (x86_64)
--
-- Host: localhost    Database: aurora-stats
-- ------------------------------------------------------
-- Server version	8.3.0

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
-- Table structure for table `flyway_schema_history`
--

DROP TABLE IF EXISTS `flyway_schema_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `flyway_schema_history` (
  `installed_rank` int NOT NULL,
  `version` varchar(50) DEFAULT NULL,
  `description` varchar(200) NOT NULL,
  `type` varchar(20) NOT NULL,
  `script` varchar(1000) NOT NULL,
  `checksum` int DEFAULT NULL,
  `installed_by` varchar(100) NOT NULL,
  `installed_on` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `execution_time` int NOT NULL,
  `success` tinyint(1) NOT NULL,
  PRIMARY KEY (`installed_rank`),
  KEY `flyway_schema_history_s_idx` (`success`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `flyway_schema_history`
--

LOCK TABLES `flyway_schema_history` WRITE;
/*!40000 ALTER TABLE `flyway_schema_history` DISABLE KEYS */;
INSERT INTO `flyway_schema_history` VALUES (1,'00001','create person table','SQL','V00001__create_person_table.sql',82664879,'root','2024-04-27 14:51:12',113,1),(2,'00002','create wheel option table','SQL','V00002__create_wheel_option_table.sql',1965113029,'root','2024-04-27 14:51:12',93,1),(3,'00003','create wheel run table','SQL','V00003__create_wheel_run_table.sql',1885856363,'root','2024-04-27 14:51:12',120,1),(4,'00004','add deleted to person','SQL','V00004__add_deleted_to_person.sql',10752483,'root','2024-04-27 14:51:12',58,1),(5,'00005','create vibe check table','SQL','V00005__create_vibe_check_table.sql',-1137067406,'root','2024-05-23 15:20:04',193,1);
/*!40000 ALTER TABLE `flyway_schema_history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `person`
--

DROP TABLE IF EXISTS `person`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `person` (
  `id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `deleted` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `person`
--

LOCK TABLES `person` WRITE;
/*!40000 ALTER TABLE `person` DISABLE KEYS */;
INSERT INTO `person` VALUES (1,'James','Richardson',0),(2,'Chris','Moran',0),(3,'Liam','Davies',0),(4,'Jacob','Burns',0),(5,'Beth','Barker',0),(6,'Nicola','Ward',0),(7,'Luca','Charreun-sanz',0),(8,'Test','Test',1),(10,'Test','\n',1),(11,'Greg','Horsfall',0),(12,'Kasia','Walsh',0);
/*!40000 ALTER TABLE `person` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vibe_check`
--

DROP TABLE IF EXISTS `vibe_check`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vibe_check` (
  `id` int NOT NULL AUTO_INCREMENT,
  `vibe_check_date` datetime NOT NULL,
  `person_id` int NOT NULL,
  `score` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `person_id` (`person_id`),
  CONSTRAINT `vibe_check_ibfk_1` FOREIGN KEY (`person_id`) REFERENCES `person` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=88 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vibe_check`
--

LOCK TABLES `vibe_check` WRITE;
/*!40000 ALTER TABLE `vibe_check` DISABLE KEYS */;
INSERT INTO `vibe_check` VALUES (13,'2024-05-24 00:00:00',1,5),(14,'2024-05-24 00:00:00',2,6),(15,'2024-05-24 00:00:00',3,8),(16,'2024-05-24 00:00:00',4,7),(17,'2024-05-24 00:00:00',5,7),(18,'2024-05-24 00:00:00',6,8),(19,'2024-05-24 00:00:00',7,9),(20,'2024-05-23 00:00:00',1,5),(21,'2024-05-23 00:00:00',2,4),(22,'2024-05-23 00:00:00',6,9),(23,'2024-05-23 00:00:00',7,9),(24,'2024-05-21 00:00:00',1,9),(25,'2024-05-21 00:00:00',2,9),(26,'2024-05-21 00:00:00',3,9),(27,'2024-05-21 00:00:00',4,9),(28,'2024-05-21 00:00:00',5,9),(29,'2024-05-21 00:00:00',6,9),(30,'2024-05-21 00:00:00',7,9),(31,'2024-05-22 00:00:00',1,10),(32,'2024-05-22 00:00:00',2,10),(33,'2024-05-22 00:00:00',3,10),(34,'2024-05-22 00:00:00',4,10),(35,'2024-05-22 00:00:00',5,10),(36,'2024-05-22 00:00:00',6,10),(37,'2024-05-22 00:00:00',7,10),(38,'2024-05-20 00:00:00',1,10),(39,'2024-05-20 00:00:00',2,10),(40,'2024-05-20 00:00:00',3,10),(41,'2024-05-20 00:00:00',4,10),(42,'2024-05-20 00:00:00',5,10),(43,'2024-05-20 00:00:00',6,10),(44,'2024-05-20 00:00:00',7,10),(45,'2024-05-27 14:08:16',1,5),(46,'2024-05-27 14:08:16',2,6),(47,'2024-05-27 14:08:16',5,8),(48,'2024-05-27 14:08:16',6,7),(49,'2024-05-27 14:08:16',7,7),(50,'2024-05-27 14:08:16',11,4),(51,'2024-05-27 14:08:16',12,9),(52,'2024-05-28 15:05:21',1,4),(53,'2024-05-28 15:05:21',2,4),(54,'2024-05-28 15:05:21',4,7),(55,'2024-05-13 00:00:00',1,5),(56,'2024-05-13 00:00:00',2,7),(57,'2024-05-13 00:00:00',3,8),(58,'2024-05-13 00:00:00',4,9),(59,'2024-05-13 00:00:00',5,9),(60,'2024-05-13 00:00:00',6,7),(61,'2024-05-13 00:00:00',7,8),(62,'2024-05-13 00:00:00',11,6),(63,'2024-05-13 00:00:00',12,8),(64,'2024-05-14 00:00:00',2,6),(65,'2024-05-14 00:00:00',3,9),(66,'2024-05-14 00:00:00',5,8),(67,'2024-05-14 00:00:00',11,8),(68,'2024-05-14 00:00:00',12,8),(69,'2024-05-08 00:00:00',1,5),(70,'2024-05-08 00:00:00',2,5),(71,'2024-05-08 00:00:00',3,8),(72,'2024-05-08 00:00:00',4,7),(73,'2024-05-08 00:00:00',5,8),(74,'2024-05-08 00:00:00',6,7),(75,'2024-05-08 00:00:00',7,7),(76,'2024-05-08 00:00:00',11,6),(77,'2024-05-08 00:00:00',12,9),(78,'2024-05-29 10:36:00',1,3),(79,'2024-05-29 10:36:00',2,5),(80,'2024-05-29 10:36:00',3,8),(81,'2024-05-29 10:36:00',4,7),(82,'2024-05-30 08:51:39',1,4),(83,'2024-05-30 08:51:39',2,6),(84,'2024-05-30 08:51:39',3,4),(85,'2024-05-30 08:51:39',4,7),(86,'2024-05-30 08:51:39',5,2),(87,'2024-05-30 08:51:39',6,8);
/*!40000 ALTER TABLE `vibe_check` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wheel_option`
--

DROP TABLE IF EXISTS `wheel_option`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `wheel_option` (
  `id` int NOT NULL AUTO_INCREMENT,
  `option_name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wheel_option`
--

LOCK TABLES `wheel_option` WRITE;
/*!40000 ALTER TABLE `wheel_option` DISABLE KEYS */;
INSERT INTO `wheel_option` VALUES (1,'Run'),(2,'Run 2'),(3,'Chocolate'),(4,'Skip 2');
/*!40000 ALTER TABLE `wheel_option` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wheel_run`
--

DROP TABLE IF EXISTS `wheel_run`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `wheel_run` (
  `id` int NOT NULL AUTO_INCREMENT,
  `run_date` datetime NOT NULL,
  `winner_id` int NOT NULL,
  `prize_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `winner_id` (`winner_id`),
  KEY `prize_id` (`prize_id`),
  CONSTRAINT `wheel_run_ibfk_1` FOREIGN KEY (`winner_id`) REFERENCES `person` (`id`),
  CONSTRAINT `wheel_run_ibfk_2` FOREIGN KEY (`prize_id`) REFERENCES `wheel_option` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wheel_run`
--

LOCK TABLES `wheel_run` WRITE;
/*!40000 ALTER TABLE `wheel_run` DISABLE KEYS */;
INSERT INTO `wheel_run` VALUES (1,'2024-04-28 00:00:00',1,1),(2,'2024-05-24 00:00:00',4,1),(3,'2024-05-27 00:00:00',1,1);
/*!40000 ALTER TABLE `wheel_run` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-05-31  4:58:41
