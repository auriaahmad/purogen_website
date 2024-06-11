-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: purogen
-- ------------------------------------------------------
-- Server version	8.3.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admin_sessions`
--

DROP TABLE IF EXISTS admin_sessions;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE admin_sessions (
  admin_session_id varchar(255) NOT NULL,
  admin_id varchar(36) DEFAULT NULL,
  created_at timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  expires_at timestamp NULL DEFAULT NULL,
  PRIMARY KEY (admin_session_id),
  KEY admin_id (admin_id),
  CONSTRAINT admin_sessions_ibfk_1 FOREIGN KEY (admin_id) REFERENCES admins_table (admin_id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `admins_table`
--

DROP TABLE IF EXISTS admins_table;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE admins_table (
  admin_id varchar(36) NOT NULL,
  username varchar(50) DEFAULT NULL,
  first_name varchar(50) DEFAULT NULL,
  last_name varchar(50) DEFAULT NULL,
  phone_number varchar(15) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  email varchar(100) DEFAULT NULL,
  created_at timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (admin_id),
  UNIQUE KEY username (username),
  UNIQUE KEY phone_number (phone_number),
  UNIQUE KEY email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `customer_sessions`
--

DROP TABLE IF EXISTS customer_sessions;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE customer_sessions (
  customer_session_id varchar(255) NOT NULL,
  customer_id varchar(36) DEFAULT NULL,
  created_at timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  expires_at timestamp NULL DEFAULT NULL,
  PRIMARY KEY (customer_session_id),
  KEY customer_id (customer_id),
  CONSTRAINT customer_sessions_ibfk_1 FOREIGN KEY (customer_id) REFERENCES customers_table (customer_id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `customers_machine_data_table`
--

DROP TABLE IF EXISTS customers_machine_data_table;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE customers_machine_data_table (
  customers_machine_data_id varchar(36) NOT NULL,
  customer_id varchar(36) DEFAULT NULL,
  machine_id varchar(50) DEFAULT NULL,
  machine_location varchar(50) DEFAULT NULL,
  processes varchar(50) DEFAULT NULL,
  recipe varchar(50) DEFAULT NULL,
  weight int DEFAULT NULL,
  mass varchar(50) DEFAULT NULL,
  strain varchar(50) DEFAULT NULL,
  terpene_name varchar(50) DEFAULT NULL,
  manufacturer_name varchar(50) DEFAULT NULL,
  injection_volume int DEFAULT NULL,
  injections varchar(50) DEFAULT NULL,
  operator varchar(50) DEFAULT NULL,
  customer_name varchar(50) DEFAULT NULL,
  chamber varchar(50) DEFAULT NULL,
  temporary1 varchar(50) DEFAULT NULL,
  temporary2 varchar(50) DEFAULT NULL,
  temporary3 varchar(50) DEFAULT NULL,
  created_at timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (customers_machine_data_id),
  KEY customers_machine_data_table_ibfk_1 (customer_id),
  CONSTRAINT customers_machine_data_table_ibfk_1 FOREIGN KEY (customer_id) REFERENCES customers_table (customer_id) ON DELETE SET NULL ON UPDATE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=root@localhost*/ /*!50003 TRIGGER customers_machine_data_table_BEFORE_INSERT BEFORE INSERT ON customers_machine_data_table FOR EACH ROW BEGIN
    DECLARE machineCustomerID CHAR(36);
    DECLARE newUUID CHAR(36);

    -- Generate a new UUID for customers_machine_data_id
    SET newUUID = UUID();

    -- Check if the machine_id exists in the machines_table
    SELECT customer_id INTO machineCustomerID
    FROM machines_table
    WHERE machine_id = NEW.machine_id;

    -- If machine_id exists, populate customer_id and customers_machine_data_id
    IF machineCustomerID IS NOT NULL THEN
        SET NEW.customer_id = machineCustomerID;
        SET NEW.customers_machine_data_id = newUUID;
    END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `customers_table`
--

DROP TABLE IF EXISTS customers_table;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE customers_table (
  customer_id varchar(36) NOT NULL,
  username varchar(50) DEFAULT NULL,
  box_name varchar(50) DEFAULT NULL,
  first_name varchar(50) DEFAULT NULL,
  last_name varchar(50) DEFAULT NULL,
  phone_number varchar(15) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  email varchar(100) DEFAULT NULL,
  created_at timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (customer_id),
  UNIQUE KEY username (username),
  UNIQUE KEY box_name (box_name),
  UNIQUE KEY phone_number (phone_number),
  UNIQUE KEY email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `machines_table`
--

DROP TABLE IF EXISTS machines_table;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE machines_table (
  machine_register_id varchar(36) NOT NULL,
  customer_id varchar(36) DEFAULT NULL,
  machine_id varchar(50) DEFAULT NULL,
  machine_location varchar(50) DEFAULT NULL,
  created_at timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (machine_register_id),
  UNIQUE KEY machine_id (machine_id),
  KEY machines_table_ibfk_1 (customer_id),
  CONSTRAINT machines_table_ibfk_1 FOREIGN KEY (customer_id) REFERENCES customers_table (customer_id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user_machine_assignment_table`
--

DROP TABLE IF EXISTS user_machine_assignment_table;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE user_machine_assignment_table (
  user_machine_assignment_id varchar(36) NOT NULL DEFAULT (uuid()),
  customer_id varchar(36) NOT NULL,
  machine_register_id varchar(36) NOT NULL,
  user_id varchar(36) NOT NULL,
  created_at timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (user_machine_assignment_id),
  KEY customer_id (customer_id),
  KEY user_id (user_id),
  KEY user_machine_assignment_table_ibfk_2 (machine_register_id),
  CONSTRAINT user_machine_assignment_table_ibfk_1 FOREIGN KEY (customer_id) REFERENCES customers_table (customer_id) ON DELETE CASCADE,
  CONSTRAINT user_machine_assignment_table_ibfk_2 FOREIGN KEY (machine_register_id) REFERENCES machines_table (machine_register_id) ON DELETE CASCADE,
  CONSTRAINT user_machine_assignment_table_ibfk_3 FOREIGN KEY (user_id) REFERENCES users_table (user_id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user_sessions`
--

DROP TABLE IF EXISTS user_sessions;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE user_sessions (
  user_session_id varchar(255) NOT NULL,
  user_id varchar(36) DEFAULT NULL,
  created_at timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  expires_at timestamp NULL DEFAULT NULL,
  PRIMARY KEY (user_session_id),
  KEY user_id (user_id),
  CONSTRAINT user_sessions_ibfk_1 FOREIGN KEY (user_id) REFERENCES users_table (user_id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `users_table`
--

DROP TABLE IF EXISTS users_table;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE users_table (
  user_id varchar(36) NOT NULL,
  customer_id varchar(36) DEFAULT NULL,
  username varchar(50) DEFAULT NULL,
  first_name varchar(50) DEFAULT NULL,
  last_name varchar(50) DEFAULT NULL,
  phone_number varchar(15) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  email varchar(100) DEFAULT NULL,
  created_at timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (user_id),
  UNIQUE KEY username (username),
  UNIQUE KEY phone_number (phone_number),
  UNIQUE KEY email (email),
  KEY users_table_ibfk_1 (customer_id),
  CONSTRAINT users_table_ibfk_1 FOREIGN KEY (customer_id) REFERENCES customers_table (customer_id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-06-10 11:42:31
