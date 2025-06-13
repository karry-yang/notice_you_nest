-- MySQL dump 10.13  Distrib 8.0.30, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: notice
-- ------------------------------------------------------
-- Server version	8.0.30

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
-- Table structure for table `checkin_rule`
--

DROP TABLE IF EXISTS `checkin_rule`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `checkin_rule` (
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `created_by` bigint NOT NULL DEFAULT '0',
  `updated_by` bigint NOT NULL DEFAULT '0',
  `status` enum('0','1','2') NOT NULL DEFAULT '1',
  `rule_id` bigint NOT NULL COMMENT '打卡规则表id',
  `rule_type` enum('DAILY','WEEKLY','MONTHLY','INTERVAL') NOT NULL DEFAULT 'DAILY',
  `days` json DEFAULT NULL,
  `times` json DEFAULT NULL COMMENT '打卡时间 json',
  `interval_days` int DEFAULT NULL COMMENT '特定规律的间隔',
  PRIMARY KEY (`rule_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `department`
--

DROP TABLE IF EXISTS `department`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `department` (
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `created_by` bigint NOT NULL DEFAULT '0',
  `updated_by` bigint NOT NULL DEFAULT '0',
  `status` enum('0','1','2') NOT NULL DEFAULT '1',
  `department_id` bigint NOT NULL,
  `department_name` varchar(100) NOT NULL,
  `leader_id` bigint NOT NULL,
  `organization_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`department_id`),
  UNIQUE KEY `REL_84554c7a2f73f09aa3c5dc014b` (`leader_id`),
  KEY `FK_c37a08a62f5d1774d9180a9ff38` (`organization_id`),
  CONSTRAINT `FK_84554c7a2f73f09aa3c5dc014b1` FOREIGN KEY (`leader_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `FK_c37a08a62f5d1774d9180a9ff38` FOREIGN KEY (`organization_id`) REFERENCES `organization` (`organization_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `file`
--

DROP TABLE IF EXISTS `file`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `file` (
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `created_by` bigint NOT NULL DEFAULT '0',
  `updated_by` bigint NOT NULL DEFAULT '0',
  `status` enum('0','1','2') NOT NULL DEFAULT '1',
  `file_id` bigint NOT NULL COMMENT '文件id',
  `file_name` varchar(255) NOT NULL COMMENT '文件名字',
  `fiel_url` varchar(255) NOT NULL COMMENT '文件保存地址',
  `file_type` enum('image','video','document','zip','mp3','other') NOT NULL COMMENT '文件类型',
  `file_size` int NOT NULL COMMENT '文件大小',
  `task_id` bigint DEFAULT NULL COMMENT '对应的任务id',
  `task_type` enum('public','personal','habit') NOT NULL COMMENT '对应的任务id',
  PRIMARY KEY (`file_id`),
  KEY `indnx_file_task_id` (`task_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `habit_group`
--

DROP TABLE IF EXISTS `habit_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `habit_group` (
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `created_by` bigint NOT NULL DEFAULT '0',
  `updated_by` bigint NOT NULL DEFAULT '0',
  `status` enum('0','1','2') NOT NULL DEFAULT '1',
  `habit_group_id` bigint NOT NULL COMMENT '习惯任务的主键id',
  `habit_group_title` varchar(255) NOT NULL COMMENT '分组标题',
  PRIMARY KEY (`habit_group_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `habit_task`
--

DROP TABLE IF EXISTS `habit_task`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `habit_task` (
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `created_by` bigint NOT NULL DEFAULT '0',
  `updated_by` bigint NOT NULL DEFAULT '0',
  `status` enum('0','1','2') NOT NULL DEFAULT '1',
  `habit_task_id` bigint NOT NULL COMMENT '习惯任务id',
  `user_id` bigint NOT NULL COMMENT '关联的用户id ',
  `task_title` varchar(255) NOT NULL COMMENT '习惯任务标题',
  `task_start_time` datetime NOT NULL COMMENT '习惯任务开始时间',
  `task_end_time` datetime NOT NULL COMMENT '习惯任务id',
  `habit_task_descriptio` varchar(255) NOT NULL COMMENT '任务描述',
  `habit_task_notice_time` json NOT NULL COMMENT '习惯任务提示时间',
  `hobit_task_open_log` enum('0','1') NOT NULL DEFAULT '0' COMMENT '是否开启日志默认 off',
  `hobit_task_group_id` bigint NOT NULL COMMENT '习惯任务分组id',
  `taskObject_id` varchar(24) DEFAULT NULL COMMENT '任务正文 MongoDB ObjectId',
  `habit_task_group_id` bigint DEFAULT NULL COMMENT '习惯任务的主键id',
  PRIMARY KEY (`habit_task_id`),
  KEY `FK_40e1f3b394eb8a37ec12d8060dd` (`habit_task_group_id`),
  CONSTRAINT `FK_40e1f3b394eb8a37ec12d8060dd` FOREIGN KEY (`habit_task_group_id`) REFERENCES `habit_group` (`habit_group_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `hobit_focus`
--

DROP TABLE IF EXISTS `hobit_focus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hobit_focus` (
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `created_by` bigint NOT NULL DEFAULT '0',
  `updated_by` bigint NOT NULL DEFAULT '0',
  `status` enum('0','1','2') NOT NULL DEFAULT '1',
  `hobit_focus_id` bigint NOT NULL COMMENT '习惯任务专注表主键id',
  `hobit_task_id` bigint NOT NULL COMMENT '对应的习惯任务id',
  `hobit_task_start_time` timestamp NOT NULL COMMENT '专注开始时间',
  `hobit_task_end_time` timestamp NOT NULL COMMENT '专注结束时间',
  `is_effective` tinyint NOT NULL COMMENT '本次专注是否有效',
  `hobit_task_focus_log` varchar(255) DEFAULT NULL COMMENT '专注日志',
  `habitTaskId` bigint DEFAULT NULL COMMENT '习惯任务id',
  PRIMARY KEY (`hobit_focus_id`),
  KEY `FK_4989520586bda231a2219a8f1df` (`habitTaskId`),
  CONSTRAINT `FK_4989520586bda231a2219a8f1df` FOREIGN KEY (`habitTaskId`) REFERENCES `habit_task` (`habit_task_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `listicle`
--

DROP TABLE IF EXISTS `listicle`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `listicle` (
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `created_by` bigint NOT NULL DEFAULT '0',
  `updated_by` bigint NOT NULL DEFAULT '0',
  `status` enum('0','1','2') NOT NULL DEFAULT '1',
  `listicle_id` bigint NOT NULL COMMENT '清单id',
  `listicle_title` varchar(255) NOT NULL COMMENT '清单标题',
  `listile_icon` varchar(255) DEFAULT NULL COMMENT '清单icon',
  `listicle_type` enum('organization','department','personal') NOT NULL COMMENT '清单类型',
  `organization_id` bigint DEFAULT NULL COMMENT '清单归属的组织',
  `department_id` bigint DEFAULT NULL COMMENT '清单归属的部门',
  `user_id` bigint DEFAULT NULL COMMENT '清单归属的用户',
  PRIMARY KEY (`listicle_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `migrations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `timestamp` bigint NOT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `organization`
--

DROP TABLE IF EXISTS `organization`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `organization` (
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `created_by` bigint NOT NULL DEFAULT '0',
  `updated_by` bigint NOT NULL DEFAULT '0',
  `status` enum('0','1','2') NOT NULL DEFAULT '1',
  `organization_id` varchar(255) NOT NULL,
  `organization_name` varchar(50) NOT NULL,
  `organization_code` varchar(8) NOT NULL,
  `leader_id` bigint NOT NULL,
  `organization_logo` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`organization_id`),
  UNIQUE KEY `IDX_cbbffed368567d4c3b3f6a6798` (`organization_code`),
  UNIQUE KEY `REL_1af267112fbd42937df21a0ea2` (`leader_id`),
  CONSTRAINT `FK_1af267112fbd42937df21a0ea2a` FOREIGN KEY (`leader_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `permission`
--

DROP TABLE IF EXISTS `permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `permission` (
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `created_by` bigint NOT NULL DEFAULT '0',
  `updated_by` bigint NOT NULL DEFAULT '0',
  `status` enum('0','1','2') NOT NULL DEFAULT '1',
  `permission_id` bigint NOT NULL,
  `permission_name` varchar(100) NOT NULL,
  `permission_description` varchar(200) DEFAULT NULL,
  `permission_code` varchar(50) NOT NULL,
  `permission_type` enum('menu','action') NOT NULL,
  `permission_range` enum('menu','action') NOT NULL,
  `department_id` varchar(64) DEFAULT NULL,
  `organization_id` varchar(64) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`permission_id`),
  UNIQUE KEY `IDX_bbb1d0904fff8197fcc1425a22` (`permission_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `personal_checkin`
--

DROP TABLE IF EXISTS `personal_checkin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `personal_checkin` (
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `created_by` bigint NOT NULL DEFAULT '0',
  `updated_by` bigint NOT NULL DEFAULT '0',
  `status` enum('0','1','2') NOT NULL DEFAULT '1',
  `checkin_id` bigint NOT NULL COMMENT '打卡表主键id',
  `checkinTime` timestamp NOT NULL,
  `checkin_log` varchar(255) NOT NULL COMMENT '打卡的日志',
  `checkin_task_id` bigint NOT NULL COMMENT '对应的公开任务id',
  `checkin_status` enum('0','1','2') NOT NULL DEFAULT '2' COMMENT '打卡状态',
  `personalTaskTaskId` bigint DEFAULT NULL COMMENT '任务ID',
  PRIMARY KEY (`checkin_id`),
  KEY `FK_c40f28c0c07c4c8ef0be10db194` (`personalTaskTaskId`),
  CONSTRAINT `FK_c40f28c0c07c4c8ef0be10db194` FOREIGN KEY (`personalTaskTaskId`) REFERENCES `personal_task` (`task_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `personal_task`
--

DROP TABLE IF EXISTS `personal_task`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `personal_task` (
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `created_by` bigint NOT NULL DEFAULT '0',
  `updated_by` bigint NOT NULL DEFAULT '0',
  `status` enum('0','1','2') NOT NULL DEFAULT '1',
  `task_id` bigint NOT NULL AUTO_INCREMENT COMMENT '任务ID',
  `task_title` varchar(255) NOT NULL COMMENT '任务标题',
  `task_priority` tinyint NOT NULL DEFAULT '0' COMMENT '任务优先级（0-3）',
  `task_checkin_rule_id` bigint NOT NULL COMMENT '关联的打卡规则ID',
  `taskParent_id` bigint DEFAULT NULL COMMENT '父任务id',
  `taskObject_id` varchar(24) DEFAULT NULL COMMENT '任务正文 MongoDB ObjectId',
  `taskListicle_id` bigint DEFAULT NULL COMMENT '所属清单ID',
  `task_description` text COMMENT '任务简要说明',
  `task_start_time` timestamp NULL DEFAULT NULL COMMENT '任务开始时间',
  `task_end_time` timestamp NULL DEFAULT NULL COMMENT '任务结束时间',
  `task_cretor_id` bigint DEFAULT NULL COMMENT '负责人ID',
  `task_parentId` bigint DEFAULT NULL COMMENT '任务ID',
  `taskCheckinRuleId` bigint DEFAULT NULL COMMENT '打卡规则表id',
  `has_files` tinyint NOT NULL DEFAULT '0' COMMENT '是否有文件',
  PRIMARY KEY (`task_id`),
  UNIQUE KEY `REL_b315557764ce044646960643c6` (`taskCheckinRuleId`),
  KEY `FK_c8eecafc16f895d112b972d4a26` (`task_parentId`),
  CONSTRAINT `FK_b315557764ce044646960643c6d` FOREIGN KEY (`taskCheckinRuleId`) REFERENCES `checkin_rule` (`rule_id`),
  CONSTRAINT `FK_c8eecafc16f895d112b972d4a26` FOREIGN KEY (`task_parentId`) REFERENCES `personal_task` (`task_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `personal_task_tag`
--

DROP TABLE IF EXISTS `personal_task_tag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `personal_task_tag` (
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `created_by` bigint NOT NULL DEFAULT '0',
  `updated_by` bigint NOT NULL DEFAULT '0',
  `status` enum('0','1','2') NOT NULL DEFAULT '1',
  `personal_task_tag_id` bigint NOT NULL COMMENT '私有任务和标签关联主键',
  `personal_task_id` bigint NOT NULL COMMENT '私有任务id',
  `tag_id` bigint NOT NULL COMMENT '标签id',
  `personalTaskId` bigint DEFAULT NULL COMMENT '任务ID',
  `tagId` bigint DEFAULT NULL COMMENT '标签id-主键',
  PRIMARY KEY (`personal_task_tag_id`),
  KEY `FK_6ca0e8e17b191a2e6a2f13ac7ed` (`personalTaskId`),
  KEY `FK_52fb648da3c13622c3ab24a9379` (`tagId`),
  CONSTRAINT `FK_52fb648da3c13622c3ab24a9379` FOREIGN KEY (`tagId`) REFERENCES `tag` (`tag_id`),
  CONSTRAINT `FK_6ca0e8e17b191a2e6a2f13ac7ed` FOREIGN KEY (`personalTaskId`) REFERENCES `personal_task` (`task_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `public_checkin`
--

DROP TABLE IF EXISTS `public_checkin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `public_checkin` (
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `created_by` bigint NOT NULL DEFAULT '0',
  `updated_by` bigint NOT NULL DEFAULT '0',
  `status` enum('0','1','2') NOT NULL DEFAULT '1',
  `checkin_id` bigint NOT NULL COMMENT '打卡表主键id',
  `checkinTime` timestamp NOT NULL,
  `checkin_log` varchar(255) NOT NULL COMMENT '打卡的日志',
  `task_id` bigint NOT NULL COMMENT '对应的任务id',
  `checkin_user_id` bigint NOT NULL COMMENT '打卡用户id',
  `checkin_status` enum('0','1','2') NOT NULL DEFAULT '2' COMMENT '打卡状态',
  `organization_id` bigint NOT NULL COMMENT '本记录归属的组织id',
  `department_id` bigint NOT NULL COMMENT '本记录归属的部门id',
  `taskId` bigint DEFAULT NULL COMMENT '任务ID',
  PRIMARY KEY (`checkin_id`),
  KEY `FK_82be1a812130a86196d79ca52b0` (`taskId`),
  CONSTRAINT `FK_82be1a812130a86196d79ca52b0` FOREIGN KEY (`taskId`) REFERENCES `public_task` (`task_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `public_task`
--

DROP TABLE IF EXISTS `public_task`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `public_task` (
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `created_by` bigint NOT NULL DEFAULT '0',
  `updated_by` bigint NOT NULL DEFAULT '0',
  `status` enum('0','1','2') NOT NULL DEFAULT '1',
  `task_id` bigint NOT NULL AUTO_INCREMENT COMMENT '任务ID',
  `task_title` varchar(255) NOT NULL COMMENT '任务标题',
  `task_priority` tinyint NOT NULL DEFAULT '0' COMMENT '任务优先级（0-3）',
  `task_checkin_rule_id` bigint NOT NULL COMMENT '关联的打卡规则ID',
  `task_parent_id` bigint DEFAULT NULL COMMENT '父任务id',
  `task_object_id` varchar(24) DEFAULT NULL COMMENT '任务正文 MongoDB ObjectId',
  `department_id` bigint DEFAULT NULL COMMENT '所属部门清单ID',
  `organization_id` bigint DEFAULT NULL COMMENT '所属组织ID',
  `task_description` text COMMENT '任务简要说明',
  `task_start_time` timestamp NULL DEFAULT NULL COMMENT '任务开始时间',
  `task_end_time` timestamp NULL DEFAULT NULL COMMENT '任务结束时间',
  `task_listicle_type` enum('organization','department','personal') NOT NULL COMMENT '任务类型',
  `task_cretor_id` bigint DEFAULT NULL COMMENT '负责人ID',
  `task_parentId` bigint DEFAULT NULL COMMENT '任务ID',
  `taskCheckinRuleId` bigint DEFAULT NULL COMMENT '打卡规则表id',
  `has_files` tinyint NOT NULL DEFAULT '0' COMMENT '是否有文件',
  PRIMARY KEY (`task_id`),
  UNIQUE KEY `REL_ad72d53ce9dd41322b4b7b6a42` (`taskCheckinRuleId`),
  KEY `FK_740dcf009516e3e942844a0e9e9` (`task_parentId`),
  CONSTRAINT `FK_740dcf009516e3e942844a0e9e9` FOREIGN KEY (`task_parentId`) REFERENCES `public_task` (`task_id`),
  CONSTRAINT `FK_ad72d53ce9dd41322b4b7b6a420` FOREIGN KEY (`taskCheckinRuleId`) REFERENCES `checkin_rule` (`rule_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `public_task_assignee`
--

DROP TABLE IF EXISTS `public_task_assignee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `public_task_assignee` (
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `created_by` bigint NOT NULL DEFAULT '0',
  `updated_by` bigint NOT NULL DEFAULT '0',
  `status` enum('0','1','2') NOT NULL DEFAULT '1',
  `public_task_assingee_id` bigint NOT NULL COMMENT '任务和任务指派表id-主键',
  `public_task_id` bigint NOT NULL COMMENT '公开任务id',
  `assingee_id` bigint NOT NULL COMMENT '被指派的用户id',
  `publicTaskId` bigint DEFAULT NULL COMMENT '任务ID',
  `assingeeId` bigint DEFAULT NULL COMMENT '用户id',
  PRIMARY KEY (`public_task_assingee_id`),
  KEY `FK_0d3fb38634026c07dfbc9375a46` (`publicTaskId`),
  KEY `FK_6cb8c26bf3f53e9ffec0d7ed447` (`assingeeId`),
  CONSTRAINT `FK_0d3fb38634026c07dfbc9375a46` FOREIGN KEY (`publicTaskId`) REFERENCES `public_task` (`task_id`),
  CONSTRAINT `FK_6cb8c26bf3f53e9ffec0d7ed447` FOREIGN KEY (`assingeeId`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `public_task_cretor`
--

DROP TABLE IF EXISTS `public_task_cretor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `public_task_cretor` (
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `created_by` bigint NOT NULL DEFAULT '0',
  `updated_by` bigint NOT NULL DEFAULT '0',
  `status` enum('0','1','2') NOT NULL DEFAULT '1',
  `public_task_id` bigint NOT NULL COMMENT '对应的公开任务id',
  `publicTaskId` bigint DEFAULT NULL COMMENT '任务ID',
  `public_task_rector_id` bigint NOT NULL COMMENT '公开任务和负责人之间的关联表id',
  `rector_id` bigint NOT NULL COMMENT '对应的用户id',
  `rectorUserId` bigint DEFAULT NULL COMMENT '用户id',
  PRIMARY KEY (`public_task_rector_id`),
  KEY `FK_2b56380285b061db72b42501a06` (`publicTaskId`),
  KEY `FK_d6e4b493cfc9fee755589f5fbed` (`rectorUserId`),
  CONSTRAINT `FK_2b56380285b061db72b42501a06` FOREIGN KEY (`publicTaskId`) REFERENCES `public_task` (`task_id`),
  CONSTRAINT `FK_d6e4b493cfc9fee755589f5fbed` FOREIGN KEY (`rectorUserId`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role` (
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `created_by` bigint NOT NULL DEFAULT '0',
  `updated_by` bigint NOT NULL DEFAULT '0',
  `status` enum('0','1','2') NOT NULL DEFAULT '1',
  `role_id` bigint NOT NULL,
  `role_name` varchar(50) NOT NULL,
  `role_description` varchar(255) NOT NULL,
  `role_type` enum('GUEST','USER','ADMIN-DEP','ADMIN-ORG','ADMIN-SYS') NOT NULL DEFAULT 'GUEST',
  PRIMARY KEY (`role_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `role_permission`
--

DROP TABLE IF EXISTS `role_permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role_permission` (
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `created_by` bigint NOT NULL DEFAULT '0',
  `updated_by` bigint NOT NULL DEFAULT '0',
  `status` enum('0','1','2') NOT NULL DEFAULT '1',
  `role_permission_id` bigint NOT NULL,
  `organization_id` bigint DEFAULT NULL,
  `department_id` bigint DEFAULT NULL,
  `permission_id` bigint NOT NULL,
  `role_id` bigint NOT NULL,
  PRIMARY KEY (`role_permission_id`),
  KEY `FK_e3a3ba47b7ca00fd23be4ebd6cf` (`permission_id`),
  KEY `FK_3d0a7155eafd75ddba5a7013368` (`role_id`),
  CONSTRAINT `FK_3d0a7155eafd75ddba5a7013368` FOREIGN KEY (`role_id`) REFERENCES `role` (`role_id`),
  CONSTRAINT `FK_e3a3ba47b7ca00fd23be4ebd6cf` FOREIGN KEY (`permission_id`) REFERENCES `permission` (`permission_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tag`
--

DROP TABLE IF EXISTS `tag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tag` (
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `created_by` bigint NOT NULL DEFAULT '0',
  `updated_by` bigint NOT NULL DEFAULT '0',
  `status` enum('0','1','2') NOT NULL DEFAULT '1',
  `tag_id` bigint NOT NULL COMMENT '标签id-主键',
  `tag_title` varchar(20) NOT NULL COMMENT '标签名字',
  `tag_color` varchar(10) NOT NULL COMMENT '标签颜色，十六进制字符串，如 #FF0000',
  `tag_description` varchar(50) DEFAULT NULL COMMENT '标签描述',
  `user_id` bigint NOT NULL COMMENT '标签归属的用户id',
  `parent_id` bigint DEFAULT NULL COMMENT '父级别标签id',
  PRIMARY KEY (`tag_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `created_by` bigint NOT NULL DEFAULT '0',
  `updated_by` bigint NOT NULL DEFAULT '0',
  `status` enum('0','1','2') NOT NULL DEFAULT '1',
  `user_id` bigint NOT NULL COMMENT '用户id',
  `user_email` varchar(50) NOT NULL COMMENT '用户邮箱',
  `user_phone` varchar(11) NOT NULL COMMENT '用户手机号码',
  `user_password` varchar(128) NOT NULL COMMENT '用户hash密码',
  `user_salt` varchar(64) NOT NULL COMMENT '用户密码盐值',
  `user_name` varchar(50) NOT NULL COMMENT '用户名字',
  `user_gender` enum('FEMALE','MALE') NOT NULL DEFAULT 'FEMALE' COMMENT '性别',
  `user_birthday` date DEFAULT NULL COMMENT '用户生日',
  `user_avatar` varchar(255) DEFAULT NULL COMMENT '用户头像地址',
  `user_vip_status` enum('0','1','2','3','4','5','6','7','8') NOT NULL DEFAULT '0' COMMENT '用户vip状态',
  `superior_id` bigint DEFAULT NULL COMMENT '用户上级id',
  `organization_id` varchar(255) DEFAULT NULL,
  `department_id` bigint DEFAULT NULL,
  `user_setting_id` bigint DEFAULT NULL COMMENT '用户设置表id',
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `IDX_65d72a4b8a5fcdad6edee8563b` (`user_email`),
  UNIQUE KEY `IDX_923ba15e95fbedcb8c44dace8a` (`user_phone`),
  UNIQUE KEY `REL_5bdf52a6e16dec1bb28a7fef02` (`user_setting_id`),
  KEY `FK_1329cf04f3a48879336b1b871b7` (`superior_id`),
  KEY `FK_3e103cdf85b7d6cb620b4db0f0c` (`organization_id`),
  KEY `FK_afd2c87bee70dd5557f48911e66` (`department_id`),
  CONSTRAINT `FK_1329cf04f3a48879336b1b871b7` FOREIGN KEY (`superior_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `FK_3e103cdf85b7d6cb620b4db0f0c` FOREIGN KEY (`organization_id`) REFERENCES `organization` (`organization_id`),
  CONSTRAINT `FK_5bdf52a6e16dec1bb28a7fef024` FOREIGN KEY (`user_setting_id`) REFERENCES `user_setting` (`user_setting_id`) ON DELETE SET NULL,
  CONSTRAINT `FK_afd2c87bee70dd5557f48911e66` FOREIGN KEY (`department_id`) REFERENCES `department` (`department_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user_role`
--

DROP TABLE IF EXISTS `user_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_role` (
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `created_by` bigint NOT NULL DEFAULT '0',
  `updated_by` bigint NOT NULL DEFAULT '0',
  `status` enum('0','1','2') NOT NULL DEFAULT '1',
  `user_role_id` bigint NOT NULL,
  `user_id` bigint NOT NULL COMMENT '外键用户id',
  `role_id` bigint NOT NULL COMMENT '外键角色id',
  `department_id` bigint NOT NULL DEFAULT '0' COMMENT ' 部门ID, 可外键关联',
  `organization_id` bigint NOT NULL DEFAULT '0' COMMENT ' 组织ID, 外键关联',
  PRIMARY KEY (`user_role_id`),
  KEY `FK_d0e5815877f7395a198a4cb0a46` (`user_id`),
  KEY `FK_32a6fc2fcb019d8e3a8ace0f55f` (`role_id`),
  CONSTRAINT `FK_32a6fc2fcb019d8e3a8ace0f55f` FOREIGN KEY (`role_id`) REFERENCES `role` (`role_id`),
  CONSTRAINT `FK_d0e5815877f7395a198a4cb0a46` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user_setting`
--

DROP TABLE IF EXISTS `user_setting`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_setting` (
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `created_by` bigint NOT NULL DEFAULT '0',
  `updated_by` bigint NOT NULL DEFAULT '0',
  `status` enum('0','1','2') NOT NULL DEFAULT '1',
  `user_setting_id` bigint NOT NULL,
  `theme` enum('0','1') NOT NULL DEFAULT '0',
  `notice_status` enum('0','1','2','3') NOT NULL DEFAULT '0',
  PRIMARY KEY (`user_setting_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping routines for database 'notice'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-05-27 20:10:55
