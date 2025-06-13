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
-- Table structure for table `department`
--

DROP TABLE IF EXISTS `department`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `department` (
  `department_id` varchar(255) NOT NULL,
  `departmentName` varchar(100) NOT NULL,
  `department_leader_id` bigint NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `created_by` bigint NOT NULL DEFAULT '0',
  `updated_by` bigint NOT NULL DEFAULT '0',
  `status` enum('0','1','2') NOT NULL DEFAULT '1',
  `organization_id` varchar(255) DEFAULT NULL,
  `leader_id` bigint DEFAULT NULL COMMENT '用户id',
  PRIMARY KEY (`department_id`),
  UNIQUE KEY `REL_84554c7a2f73f09aa3c5dc014b` (`leader_id`),
  KEY `FK_c37a08a62f5d1774d9180a9ff38` (`organization_id`),
  CONSTRAINT `FK_84554c7a2f73f09aa3c5dc014b1` FOREIGN KEY (`leader_id`) REFERENCES `sys_user` (`user_id`),
  CONSTRAINT `FK_c37a08a62f5d1774d9180a9ff38` FOREIGN KEY (`organization_id`) REFERENCES `organization` (`organization_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `habit_checkin`
--

DROP TABLE IF EXISTS `habit_checkin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `habit_checkin` (
  `habit_checkin_id` bigint unsigned NOT NULL COMMENT '习惯任务打卡id-主键',
  `habit_id` bigint unsigned NOT NULL COMMENT '习惯任务id-外键',
  `checkin_type` tinyint NOT NULL COMMENT '打卡类型 正常打卡，补卡，迟到打卡',
  `checkin_next_time` timestamp NULL DEFAULT NULL COMMENT '下次打卡的时间',
  `checkin_last_time` timestamp NULL DEFAULT NULL COMMENT '记录上一次打卡的时间',
  `checkin_this_time` timestamp NOT NULL COMMENT '打卡时间',
  `checkin_log_icon` varchar(255) NOT NULL COMMENT '打卡评分',
  `checkin_log_text` varchar(255) DEFAULT NULL COMMENT '日志文字',
  `status` tinyint NOT NULL DEFAULT '1' COMMENT '状态0-inactive 1:actice 3:delete',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间 默认当时时间',
  `create_user_id` bigint unsigned NOT NULL COMMENT '创建人id',
  `update_user_id` bigint unsigned NOT NULL COMMENT '修改人id',
  `update_time` timestamp NULL DEFAULT NULL COMMENT '修改时间',
  `version` int DEFAULT '1' COMMENT '版本号',
  PRIMARY KEY (`habit_checkin_id`),
  KEY `habit_id` (`habit_id`),
  KEY `create_user_id` (`create_user_id`),
  KEY `update_user_id` (`update_user_id`),
  CONSTRAINT `habit_checkin_ibfk_1` FOREIGN KEY (`habit_id`) REFERENCES `habit` (`habit_id`),
  CONSTRAINT `habit_checkin_ibfk_2` FOREIGN KEY (`create_user_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `habit_checkin_ibfk_3` FOREIGN KEY (`update_user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='习惯任务打卡关联表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;

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
  `organization_leader_id` bigint NOT NULL,
  `organization_logo` varchar(255) DEFAULT NULL,
  `leader_id` bigint DEFAULT NULL COMMENT '用户id',
  PRIMARY KEY (`organization_id`),
  UNIQUE KEY `IDX_cbbffed368567d4c3b3f6a6798` (`organization_code`),
  UNIQUE KEY `REL_1af267112fbd42937df21a0ea2` (`leader_id`),
  CONSTRAINT `FK_1af267112fbd42937df21a0ea2a` FOREIGN KEY (`leader_id`) REFERENCES `sys_user` (`user_id`)
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
  `permissionName` varchar(100) NOT NULL,
  `permissionDescription` varchar(200) DEFAULT NULL,
  `permissionCode` varchar(50) NOT NULL,
  `permissionType` enum('GUEST','USER','ADMIN-DEP','ADMIN-ORG','ADMIN-SYS') NOT NULL DEFAULT 'USER',
  PRIMARY KEY (`permission_id`),
  UNIQUE KEY `IDX_58049f4babfa3fdbfb6e0b093a` (`permissionCode`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `personal_task_checkin`
--

DROP TABLE IF EXISTS `personal_task_checkin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `personal_task_checkin` (
  `personal_task_checkin_id` bigint unsigned NOT NULL COMMENT '个人任务打卡id-主键',
  `personal_task_id` bigint unsigned NOT NULL COMMENT '个人任务id-外键',
  `checkin_type` tinyint NOT NULL COMMENT '打卡类型 正常打卡，补卡，迟到打卡',
  `checkin_next_time` timestamp NULL DEFAULT NULL COMMENT '下次打卡的时间',
  `checkin_last_time` timestamp NULL DEFAULT NULL COMMENT '记录上一次打卡的时间',
  `checkin_this_time` timestamp NOT NULL COMMENT '打卡时间',
  `checkin_log_icon` varchar(255) NOT NULL COMMENT '打卡评分',
  `checkin_log_text` varchar(255) DEFAULT NULL COMMENT '日志文字',
  `status` tinyint NOT NULL DEFAULT '1' COMMENT '状态0-inactive 1:actice 3:delete',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间 默认当时时间',
  `create_user_id` bigint unsigned NOT NULL COMMENT '创建人id',
  `update_user_id` bigint unsigned NOT NULL COMMENT '修改人id',
  `update_time` timestamp NULL DEFAULT NULL COMMENT '修改时间',
  `version` int DEFAULT '1' COMMENT '版本号',
  PRIMARY KEY (`personal_task_checkin_id`),
  KEY `personal_task_id` (`personal_task_id`),
  KEY `create_user_id` (`create_user_id`),
  KEY `update_user_id` (`update_user_id`),
  CONSTRAINT `personal_task_checkin_ibfk_1` FOREIGN KEY (`personal_task_id`) REFERENCES `personal_task` (`personal_task_id`),
  CONSTRAINT `personal_task_checkin_ibfk_2` FOREIGN KEY (`create_user_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `personal_task_checkin_ibfk_3` FOREIGN KEY (`update_user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='个人任务打卡关联表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `public_task_checkin`
--

DROP TABLE IF EXISTS `public_task_checkin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `public_task_checkin` (
  `public_task_checkin_id` bigint unsigned NOT NULL COMMENT '公开任务打卡id-主键',
  `public_task_id` bigint unsigned NOT NULL COMMENT '公开任务id-外键',
  `checkin_type` tinyint NOT NULL COMMENT '打卡类型 正常打卡，补卡，迟到打卡',
  `checkin_next_time` timestamp NULL DEFAULT NULL COMMENT '下次打卡的时间',
  `checkin_last_time` timestamp NULL DEFAULT NULL COMMENT '记录上一次打卡的时间',
  `checkin_this_time` timestamp NOT NULL COMMENT '打卡时间',
  `checkin_log_icon` varchar(255) NOT NULL COMMENT '打卡评分',
  `checkin_log_text` varchar(255) DEFAULT NULL COMMENT '日志文字',
  `status` tinyint NOT NULL DEFAULT '1' COMMENT '状态0-inactive 1:actice 3:delete',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间 默认当时时间',
  `create_user_id` bigint unsigned NOT NULL COMMENT '创建人id',
  `update_user_id` bigint unsigned NOT NULL COMMENT '修改人id',
  `update_time` timestamp NULL DEFAULT NULL COMMENT '修改时间',
  `version` int DEFAULT '1' COMMENT '版本号',
  PRIMARY KEY (`public_task_checkin_id`),
  KEY `public_task_id` (`public_task_id`),
  KEY `create_user_id` (`create_user_id`),
  KEY `update_user_id` (`update_user_id`),
  CONSTRAINT `public_task_checkin_ibfk_1` FOREIGN KEY (`public_task_id`) REFERENCES `public_task` (`public_task_id`),
  CONSTRAINT `public_task_checkin_ibfk_2` FOREIGN KEY (`create_user_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `public_task_checkin_ibfk_3` FOREIGN KEY (`update_user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='公开任务打卡关联表';
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
  `role_code` varchar(50) NOT NULL,
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
-- Table structure for table `sys_user`
--

DROP TABLE IF EXISTS `sys_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sys_user` (
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
  `user_gender` enum('0','1') NOT NULL DEFAULT '0' COMMENT '性别',
  `user_birthday` date DEFAULT NULL COMMENT '用户生日',
  `user_avatar` varchar(255) NOT NULL COMMENT '用户头像地址',
  `user_vip_status` enum('0','1','2','3','4','5','6','7','8') NOT NULL DEFAULT '0' COMMENT '用户vip状态',
  `superior_id` bigint DEFAULT NULL COMMENT '用户上级id',
  `organization_id` bigint DEFAULT NULL,
  `department_id` bigint DEFAULT NULL,
  `organizationOrganizationId` varchar(255) DEFAULT NULL,
  `departmentDepartmentId` varchar(255) DEFAULT NULL,
  `user_setting_id` bigint DEFAULT NULL COMMENT '用户设置表id',
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `IDX_abdcbc322ceb49292fc4a8cb2c` (`user_email`),
  UNIQUE KEY `IDX_393d2c528b4c87ee930c932687` (`user_phone`),
  UNIQUE KEY `REL_014c124ba23d13050ccceb9d2f` (`user_setting_id`),
  KEY `FK_22d7d591e8b9cd6205cead659ed` (`organizationOrganizationId`),
  KEY `FK_cc5e2b8f05c9ff8f4483c976d05` (`departmentDepartmentId`),
  KEY `FK_4a90780b423493d6e747c210336` (`superior_id`),
  CONSTRAINT `FK_014c124ba23d13050ccceb9d2f2` FOREIGN KEY (`user_setting_id`) REFERENCES `user_setting` (`user_setting_id`) ON DELETE SET NULL,
  CONSTRAINT `FK_22d7d591e8b9cd6205cead659ed` FOREIGN KEY (`organizationOrganizationId`) REFERENCES `organization` (`organization_id`),
  CONSTRAINT `FK_4a90780b423493d6e747c210336` FOREIGN KEY (`superior_id`) REFERENCES `sys_user` (`user_id`),
  CONSTRAINT `FK_cc5e2b8f05c9ff8f4483c976d05` FOREIGN KEY (`departmentDepartmentId`) REFERENCES `department` (`department_id`)
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
  `user_id` bigint NOT NULL COMMENT '用户id',
  `role_id` bigint NOT NULL,
  PRIMARY KEY (`user_role_id`),
  KEY `FK_d0e5815877f7395a198a4cb0a46` (`user_id`),
  KEY `FK_32a6fc2fcb019d8e3a8ace0f55f` (`role_id`),
  CONSTRAINT `FK_32a6fc2fcb019d8e3a8ace0f55f` FOREIGN KEY (`role_id`) REFERENCES `role` (`role_id`),
  CONSTRAINT `FK_d0e5815877f7395a198a4cb0a46` FOREIGN KEY (`user_id`) REFERENCES `sys_user` (`user_id`)
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
  `user_setting_id` bigint NOT NULL,
  `theme` enum('0','1') NOT NULL DEFAULT '0',
  `noticeStatus` enum('0','1','2','3') NOT NULL DEFAULT '0',
  `created_by` bigint NOT NULL DEFAULT '0',
  `updated_by` bigint NOT NULL DEFAULT '0',
  `status` enum('0','1','2') NOT NULL DEFAULT '1',
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

-- Dump completed on 2025-04-13 23:38:07
