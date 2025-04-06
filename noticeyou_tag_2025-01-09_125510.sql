-- MySQL dump 10.13  Distrib 8.0.30, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: noticeyou
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
-- Table structure for table `checkin`
--

-- DROP TABLE IF EXISTS `checkin`;
-- /*!40101 SET @saved_cs_client     = @@character_set_client */;
-- /*!50503 SET character_set_client = utf8mb4 */;
-- CREATE TABLE `checkin` (
--   `checkin_id` BIGINT UNSIGNED NOT NULL COMMENT '打卡id-主键',
--   `checkin_type` TINYINT NOT NULL COMMENT '打卡类型 正常打卡，补卡，迟到打卡',
--   -- `checkin_task_type` TINYINT NOT NULL COMMENT '打卡类型',
--   `checkin_next_time` timestamp NULL DEFAULT NULL COMMENT '下次打卡的时间',
--   `checkin_last_time` timestamp NULL DEFAULT NULL COMMENT '记录上一次打卡的时间',
--   `checkin_this_time` timestamp NOT NULL COMMENT '打卡时间',
--   `checkin_log_icon` varchar(255) NOT NULL COMMENT '打卡评分',
--   `checkin_log_text` varchar(255) DEFAULT NULL COMMENT '日志文字',
--   `status` tinyint NOT NULL DEFAULT '1' COMMENT '状态0-inactive 1:active 3:delete',
--   `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间 默认当时时间',
--   `create_user_id` BIGINT UNSIGNED NOT NULL COMMENT '创建人id',
--   `update_user_id` BIGINT UNSIGNED NOT NULL COMMENT '修改人id',
--   `update_time` timestamp NULL DEFAULT NULL COMMENT '修改时间',
--   `version` int DEFAULT '1' COMMENT '版本号',
--   PRIMARY KEY (`checkin_id`),
--   KEY `create_user_id` (`create_user_id`),
--   KEY `update_user_id` (`update_user_id`),
--   CONSTRAINT `checkin_ibfk_1` FOREIGN KEY (`create_user_id`) REFERENCES `user` (`user_id`),
--   CONSTRAINT `checkin_ibfk_2` FOREIGN KEY (`update_user_id`) REFERENCES `user` (`user_id`)
-- ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='打卡表';

-- 公开任务和打卡关联表
DROP TABLE IF EXISTS `public_task_checkin`;
CREATE TABLE `public_task_checkin` (
  `public_task_checkin_id` BIGINT UNSIGNED NOT NULL COMMENT '公开任务打卡id-主键',
  `public_task_id` BIGINT UNSIGNED NOT NULL COMMENT '公开任务id-外键',
  `checkin_type` TINYINT NOT NULL COMMENT '打卡类型 正常打卡，补卡，迟到打卡',
  `checkin_next_time` timestamp NULL DEFAULT NULL COMMENT '下次打卡的时间',
  `checkin_last_time` timestamp NULL DEFAULT NULL COMMENT '记录上一次打卡的时间',
  `checkin_this_time` timestamp NOT NULL COMMENT '打卡时间',
  `checkin_log_icon` varchar(255) NOT NULL COMMENT '打卡评分',
  `checkin_log_text` varchar(255) DEFAULT NULL COMMENT '日志文字',
  `status` tinyint NOT NULL DEFAULT '1' COMMENT '状态0-inactive 1:actice 3:delete',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间 默认当时时间',
  `create_user_id` BIGINT UNSIGNED NOT NULL COMMENT '创建人id',
  `update_user_id` BIGINT UNSIGNED NOT NULL COMMENT '修改人id',
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

-- 个人任务和打卡关联表
DROP TABLE IF EXISTS `personal_task_checkin`;
CREATE TABLE `personal_task_checkin` (
  `personal_task_checkin_id` BIGINT UNSIGNED NOT NULL COMMENT '个人任务打卡id-主键',
  `personal_task_id` BIGINT UNSIGNED NOT NULL COMMENT '个人任务id-外键',
   `checkin_type` TINYINT NOT NULL COMMENT '打卡类型 正常打卡，补卡，迟到打卡',
  `checkin_next_time` timestamp NULL DEFAULT NULL COMMENT '下次打卡的时间',
  `checkin_last_time` timestamp NULL DEFAULT NULL COMMENT '记录上一次打卡的时间',
  `checkin_this_time` timestamp NOT NULL COMMENT '打卡时间',
  `checkin_log_icon` varchar(255) NOT NULL COMMENT '打卡评分',
  `checkin_log_text` varchar(255) DEFAULT NULL COMMENT '日志文字',
  `status` tinyint NOT NULL DEFAULT '1' COMMENT '状态0-inactive 1:actice 3:delete',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间 默认当时时间',
  `create_user_id` BIGINT UNSIGNED NOT NULL COMMENT '创建人id',
  `update_user_id` BIGINT UNSIGNED NOT NULL COMMENT '修改人id',
  `update_time` timestamp NULL DEFAULT NULL COMMENT '修改时间',
  `version` int DEFAULT '1' COMMENT '版本号',
  PRIMARY KEY (`personal_task_checkin_id`),
  KEY `personal_task_id` (`personal_task_id`),
  KEY `create_user_id` (`create_user_id`),
  KEY `update_user_id` (`update_user_id`),
  CONSTRAINT `personal_task_checkin_ibfk_1` FOREIGN KEY (`personal_task_id`) REFERENCES `personal_task` (`personal_task_id`),
  -- CONSTRAINT `personal_task_checkin_ibfk_2` FOREIGN KEY (`checkin_id`) REFERENCES `checkin` (`checkin_id`),
  CONSTRAINT `personal_task_checkin_ibfk_2` FOREIGN KEY (`create_user_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `personal_task_checkin_ibfk_3` FOREIGN KEY (`update_user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='个人任务打卡关联表';
-- 习惯任务和打卡关联表
DROP TABLE IF EXISTS `habit_checkin`;
CREATE TABLE `habit_checkin` (
  `habit_checkin_id` BIGINT UNSIGNED NOT NULL COMMENT '习惯任务打卡id-主键',
  `habit_id` BIGINT UNSIGNED NOT NULL COMMENT '习惯任务id-外键',
   `checkin_type` TINYINT NOT NULL COMMENT '打卡类型 正常打卡，补卡，迟到打卡',
  `checkin_next_time` timestamp NULL DEFAULT NULL COMMENT '下次打卡的时间',
  `checkin_last_time` timestamp NULL DEFAULT NULL COMMENT '记录上一次打卡的时间',
  `checkin_this_time` timestamp NOT NULL COMMENT '打卡时间',
  `checkin_log_icon` varchar(255) NOT NULL COMMENT '打卡评分',
  `checkin_log_text` varchar(255) DEFAULT NULL COMMENT '日志文字',
  `status` tinyint NOT NULL DEFAULT '1' COMMENT '状态0-inactive 1:actice 3:delete',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间 默认当时时间',
  `create_user_id` BIGINT UNSIGNED NOT NULL COMMENT '创建人id',
  `update_user_id` BIGINT UNSIGNED NOT NULL COMMENT '修改人id',
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
-- Table structure for table `checkin_log`
--

-- DROP TABLE IF EXISTS `checkin_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
-- CREATE TABLE `checkin_log` (
--   `checkin_log_id` BIGINT UNSIGNED NOT NULL COMMENT '打卡日志id--主键',
--   `checkin_log_icon` varchar(255) NOT NULL COMMENT '打卡评分',
--   `checkin_log_text` varchar(255) DEFAULT NULL COMMENT '日志文字',
--   `checkin_log_checkin_id` BIGINT UNSIGNED NOT NULL COMMENT '日志关联checkin表checkin_id',
--   `status` tinyint NOT NULL DEFAULT '1' COMMENT '状态0-inactive 1:actice 3:delete',
--   `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间 默认当时时间',
--   `create_user_id` BIGINT UNSIGNED NOT NULL COMMENT '创建人id',
--   `update_user_id` BIGINT UNSIGNED NOT NULL COMMENT '修改人id',
--   `update_time` timestamp NULL DEFAULT NULL COMMENT '修改时间',
--   `version` int DEFAULT '1' COMMENT '版本号',
--   PRIMARY KEY (`checkin_log_id`),
--   KEY `checkin_log_checkin_id` (`checkin_log_checkin_id`),
--   KEY `create_user_id` (`create_user_id`),
--   KEY `update_user_id` (`update_user_id`),
--   CONSTRAINT `checkin_log_ibfk_1` FOREIGN KEY (`checkin_log_checkin_id`) REFERENCES `checkin` (`checkin_id`),
--   CONSTRAINT `checkin_log_ibfk_2` FOREIGN KEY (`create_user_id`) REFERENCES `user` (`user_id`),
--   CONSTRAINT `checkin_log_ibfk_3` FOREIGN KEY (`update_user_id`) REFERENCES `user` (`user_id`)
-- ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='打卡日志表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `comment_notification`
--

DROP TABLE IF EXISTS `comment_notification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comment_notification` (
  `comment_id` BIGINT UNSIGNED NOT NULL COMMENT '评论主键',
  `comment_notifaction_id` BIGINT UNSIGNED NOT NULL COMMENT '评论的通知id',
  `comment_content` text NOT NULL COMMENT '评论内容',
  `comment_parent_id` BIGINT UNSIGNED DEFAULT NULL COMMENT '上级评论',
  `status` tinyint NOT NULL DEFAULT '1' COMMENT '状态0-inactive 1:actice 3:delete',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间 默认当前时间',
  `create_user_id` BIGINT UNSIGNED NOT NULL COMMENT '创建人id',
  `update_user_id` BIGINT UNSIGNED NOT NULL COMMENT '修改人id',
  `update_time` timestamp NULL DEFAULT NULL COMMENT '修改时间',
  `version` int DEFAULT '1' COMMENT '版本号',
  PRIMARY KEY (`comment_id`),
  KEY `create_user_id` (`create_user_id`),
  KEY `update_user_id` (`update_user_id`),
  CONSTRAINT `comment_notification_ibfk_1` FOREIGN KEY (`create_user_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `comment_notification_ibfk_2` FOREIGN KEY (`update_user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='通知评论表表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `comment_public_task`
--

DROP TABLE IF EXISTS `comment_public_task`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comment_public_task` (
  `comment_id` BIGINT UNSIGNED NOT NULL COMMENT '评论主键',
  `comment_public_task_id` BIGINT UNSIGNED NOT NULL COMMENT '评论的公开任务',
  `comment_content` text NOT NULL COMMENT '评论内容',
  `comment_parent_id` int DEFAULT NULL COMMENT '上级评论',
  `status` tinyint NOT NULL DEFAULT '1' COMMENT '状态0-inactive 1:actice 3:delete',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间 默认当前时间',
  `create_user_id` BIGINT UNSIGNED NOT NULL COMMENT '创建人id',
  `update_user_id` BIGINT UNSIGNED NOT NULL COMMENT '修改人id',
  `update_time` timestamp NULL DEFAULT NULL COMMENT '修改时间',
  `version` int DEFAULT '1' COMMENT '版本号',
  PRIMARY KEY (`comment_id`),
  KEY `create_user_id` (`create_user_id`),
  KEY `update_user_id` (`update_user_id`),
  KEY `comment_public_task_id` (`comment_public_task_id`),
  CONSTRAINT `comment_public_task_ibfk_1` FOREIGN KEY (`create_user_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `comment_public_task_ibfk_2` FOREIGN KEY (`update_user_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `comment_public_task_ibfk_3` FOREIGN KEY (`comment_public_task_id`) REFERENCES `public_task` (`public_task_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='公开任务评论表表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `department`
--

DROP TABLE IF EXISTS `department`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `department` (
  `department_id` BIGINT UNSIGNED NOT NULL COMMENT '部门id-主键',
  `department_name` varchar(255) NOT NULL COMMENT '部门名字',
  `department_creater_id` BIGINT UNSIGNED NOT NULL COMMENT '部门创建人id',
  `department_organization_id` BIGINT UNSIGNED NOT NULL COMMENT '组群id-外键',
  `department_superior_id` BIGINT UNSIGNED DEFAULT NULL COMMENT '父部门/上级部门-外键',
  `department_type` bit(1) DEFAULT b'0' COMMENT '部门类型--0:公共部门---1:私有部门',
  `department_description` varchar(255) DEFAULT NULL COMMENT '部门描述',
  `status` tinyint NOT NULL DEFAULT '1' COMMENT '状态0-inactive 1:actice 3:delete',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间 默认当时时间',
  `create_user_id` BIGINT UNSIGNED NOT NULL COMMENT '创建人id',
  `update_user_id` BIGINT UNSIGNED NOT NULL COMMENT '修改人id',
  `update_time` timestamp NULL DEFAULT NULL COMMENT '修改时间',
  `version` int DEFAULT '1' COMMENT '版本号',
  PRIMARY KEY (`department_id`),
  KEY `department_organization_id` (`department_organization_id`),
  KEY `create_user_id` (`create_user_id`),
  KEY `update_user_id` (`update_user_id`),
  CONSTRAINT `department_ibfk_1` FOREIGN KEY (`department_organization_id`) REFERENCES `organization` (`organization_id`),
  CONSTRAINT `department_ibfk_2` FOREIGN KEY (`create_user_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `department_ibfk_3` FOREIGN KEY (`update_user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='部门表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `department_leader`
--

DROP TABLE IF EXISTS `department_leader`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `department_leader` (
  `department_leadert_id` BIGINT UNSIGNED NOT NULL COMMENT '用户部门id-主键',
  `leader_id` BIGINT UNSIGNED NOT NULL COMMENT '用户id-外键',
  `department_id` BIGINT UNSIGNED NOT NULL COMMENT '部门id-外键',
  `status` tinyint NOT NULL DEFAULT '1' COMMENT '状态0-inactive 1:actice 3:delete',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间 默认当时时间',
  `create_user_id` BIGINT UNSIGNED NOT NULL COMMENT '创建人id',
  `update_user_id` BIGINT UNSIGNED NOT NULL COMMENT '修改人id',
  `update_time` timestamp NULL DEFAULT NULL COMMENT '修改时间',
  `version` int DEFAULT '1' COMMENT '版本号',
  PRIMARY KEY (`department_leadert_id`),
  KEY `leader_id` (`leader_id`),
  KEY `department_id` (`department_id`),
  KEY `create_user_id` (`create_user_id`),
  KEY `update_user_id` (`update_user_id`),
  CONSTRAINT `department_leader_ibfk_1` FOREIGN KEY (`create_user_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `department_leader_ibfk_2` FOREIGN KEY (`update_user_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `user_department_ibfk_1` FOREIGN KEY (`leader_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='用户部门表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `group`
--

DROP TABLE IF EXISTS `group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `group` (
  `group_id` BIGINT UNSIGNED NOT NULL COMMENT 'user_leader_Id--主键',
  `group_name` varchar(255) NOT NULL COMMENT '组群的名字',
  `status` tinyint NOT NULL DEFAULT '1' COMMENT '状态0-inactive 1:actice 3:delete',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间 默认当前时间',
  `create_user_id` BIGINT UNSIGNED NOT NULL COMMENT '创建人id',
  `update_user_id` BIGINT UNSIGNED NOT NULL COMMENT '修改人id',
  `update_time` timestamp NULL DEFAULT NULL COMMENT '修改时间',
  `version` int DEFAULT '1' COMMENT '版本号',
  PRIMARY KEY (`group_id`),
  KEY `create_user_id` (`create_user_id`),
  KEY `update_user_id` (`update_user_id`),
  CONSTRAINT `group_ibfk_1` FOREIGN KEY (`create_user_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `group_ibfk_2` FOREIGN KEY (`update_user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='组群表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `group_user`
--

DROP TABLE IF EXISTS `group_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `group_user` (
  `group_user_id` BIGINT UNSIGNED NOT NULL COMMENT 'user_user_Id--主键',
  `group_id` BIGINT UNSIGNED NOT NULL COMMENT 'groupid',
  `user_id` BIGINT UNSIGNED NOT NULL COMMENT 'userid',
  `status` tinyint NOT NULL DEFAULT '1' COMMENT '状态0-inactive 1:actice 3:delete',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间 默认当前时间',
  `create_user_id` BIGINT UNSIGNED NOT NULL COMMENT '创建人id',
  `update_user_id` BIGINT UNSIGNED NOT NULL COMMENT '修改人id',
  `update_time` timestamp NULL DEFAULT NULL COMMENT '修改时间',
  `version` int DEFAULT '1' COMMENT '版本号',
  PRIMARY KEY (`group_user_id`),
  KEY `user_id` (`user_id`),
  KEY `create_user_id` (`create_user_id`),
  KEY `update_user_id` (`update_user_id`),
  CONSTRAINT `group_user_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `group_user_ibfk_2` FOREIGN KEY (`create_user_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `group_user_ibfk_3` FOREIGN KEY (`update_user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='组群-用户关联表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `habit`
--

DROP TABLE IF EXISTS `habit`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `habit` (
  `habit_id` BIGINT UNSIGNED NOT NULL COMMENT '习惯打卡id',
  `habit_title` varchar(255) NOT NULL COMMENT '习惯打卡标题',
  `habit_user_id` BIGINT UNSIGNED NOT NULL COMMENT '创建人id',
  `task_checkin_days_id` BIGINT UNSIGNED NOT NULL COMMENT '关联的打卡规则id',
  `habit_icon` varchar(255) DEFAULT NULL COMMENT '习惯打卡图标',
  `habit_description` text COMMENT '习惯打卡描述',
  `habit_start_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '习惯开始时间',
  `habit_end_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '习惯结束时间',
  `habit_notice_time` json DEFAULT NULL COMMENT 'habit打卡提示时间',
  `habit_is_show_daily_log` TINYINT  NOT NULL DEFAULT '1' COMMENT '是否添加弹出打卡日志',
  -- `habit_allow_early_checkin` TINYINT DEFAULT '0' COMMENT '是否允许提前打卡,0表示不允许,1表示允许',
  `habit_status` TINYINT DEFAULT '1' COMMENT '习惯的状态',
  `status` tinyint NOT NULL DEFAULT '1' COMMENT '状态0-inactive 1:actice 3:delete',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间 默认当时时间',
  `create_user_id` BIGINT UNSIGNED NOT NULL COMMENT '创建人id',
  `update_user_id` BIGINT UNSIGNED NOT NULL COMMENT '修改人id',
  `update_time` timestamp NULL DEFAULT NULL COMMENT '修改时间',
  `version` int DEFAULT '1' COMMENT '版本号',
  PRIMARY KEY (`habit_id`),
  KEY `habit_user_id` (`habit_user_id`),
  KEY `task_checkin_days_id` (`task_checkin_days_id`),
  KEY `create_user_id` (`create_user_id`),
  KEY `update_user_id` (`update_user_id`),
  CONSTRAINT `habit_checkin_days_fk_1` FOREIGN KEY (`task_checkin_days_id`) REFERENCES `task_checkin_days` (`task_checkin_days_id`) ON DELETE CASCADE,
  CONSTRAINT `habit_ibfk_2` FOREIGN KEY (`habit_user_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `habit_ibfk_3` FOREIGN KEY (`create_user_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `habit_ibfk_4` FOREIGN KEY (`update_user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='习惯表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `habit_checkin_days`
--

DROP TABLE IF EXISTS `task_checkin_days`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `task_checkin_days` (
  `task_checkin_days_id` BIGINT UNSIGNED NOT NULL COMMENT '主键id',
  `task_check_type`TINYINT  NOT NULL  DEFAULT '0' COMMENT '打卡类型，年，月，周，特定间隔',
  `task_type` TINYINT NOT NULL  COMMENT '任务类型 1:个人任务 2:公共任务,3:习惯任务',
  `days` varchar(255) DEFAULT NULL COMMENT '打卡的天数或间隔，按类型不同存储不同格式',
  `status` tinyint NOT NULL DEFAULT '1' COMMENT '状态0-inactive 1:actice 3:delete',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间 默认当时时间',
  `create_user_id` BIGINT UNSIGNED NOT NULL COMMENT '创建人id',
  `update_user_id` BIGINT UNSIGNED NOT NULL COMMENT '修改人id',
  `update_time` timestamp NULL DEFAULT NULL COMMENT '修改时间',
  `version` int DEFAULT '1' COMMENT '版本号',
  PRIMARY KEY (`task_checkin_days_id`),
   KEY `create_user_id` (`create_user_id`),
  KEY `update_user_id` (`update_user_id`),
    CONSTRAINT `habit_checkin_days_ibfk_1` FOREIGN KEY (`create_user_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `habit_checkin_days_ibfk_2` FOREIGN KEY (`update_user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='习惯打卡天数表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `listicle`
--

DROP TABLE IF EXISTS `listicle`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `listicle` (
  `listicle_id` BIGINT UNSIGNED NOT NULL COMMENT '清单id',
  `listicle_parent_id` BIGINT UNSIGNED DEFAULT NULL COMMENT '清单父文件id',
  `listicle_icon` varchar(255) NOT NULL COMMENT '清单图标',
  `listicle_title` varchar(255) DEFAULT NULL COMMENT '清单标题',
  `listicle_user_id` BIGINT UNSIGNED DEFAULT NULL COMMENT '清单归属用户',
  `status` tinyint NOT NULL DEFAULT '1' COMMENT '状态0-inactive 1:actice 3:delete',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间 默认当时时间',
  `create_user_id` BIGINT UNSIGNED NOT NULL COMMENT '创建人id',
  `update_user_id` BIGINT UNSIGNED NOT NULL COMMENT '修改人id',
  `update_time` timestamp NULL DEFAULT NULL COMMENT '修改时间',
  `version` int DEFAULT '1' COMMENT '版本号',
  PRIMARY KEY (`listicle_id`),
  KEY `create_user_id` (`create_user_id`),
  KEY `update_user_id` (`update_user_id`),
  CONSTRAINT `listicle_ibfk_3` FOREIGN KEY (`listicle_user_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `listicle_ibfk_1` FOREIGN KEY (`create_user_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `listicle_ibfk_2` FOREIGN KEY (`update_user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='清单表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `note`
--

DROP TABLE IF EXISTS `public_task_note`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `public_task_note` (
  `public_task_note_id` BIGINT UNSIGNED NOT NULL COMMENT '注意事项id-主键',
  `note_title` text COMMENT '注意事项文本标题',
  `note_public_task_id` BIGINT UNSIGNED NOT NULL COMMENT '任务id-外键',
  `status` tinyint NOT NULL DEFAULT '1' COMMENT '状态0-inactive 1:actice 3:delete',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间 默认当时时间',
  `create_user_id` BIGINT UNSIGNED NOT NULL COMMENT '创建人id',
  `update_user_id` BIGINT UNSIGNED NOT NULL COMMENT '修改人id',
  `update_time` timestamp NULL DEFAULT NULL COMMENT '修改时间',
  `version` int DEFAULT '1' COMMENT '版本号',
  PRIMARY KEY (`public_task_note_id`),
     KEY `create_user_id` (`create_user_id`),
  KEY `update_user_id` (`update_user_id`),
  KEY `note_public_task_id` (`note_public_task_id`),
  CONSTRAINT `public_task_note_ibfk_1` FOREIGN KEY (`note_public_task_id`) REFERENCES `public_task` (`public_task_id`),
  CONSTRAINT `public_task_note_ibfk_2` FOREIGN KEY (`create_user_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `public_task_note_ibfk_3` FOREIGN KEY (`update_user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='注意事项表';

DROP TABLE IF EXISTS `personal_task_note`;
CREATE TABLE `personal_task_note` (
  `personal_task_note_id` BIGINT UNSIGNED NOT NULL COMMENT '注意事项id-主键',
  `note_title` text COMMENT '注意事项文本标题',
  `note_personal_task_id` BIGINT UNSIGNED NOT NULL COMMENT '任务详情id-外键',
  `status` tinyint NOT NULL DEFAULT '1' COMMENT '状态0-inactive 1:actice 3:delete',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间 默认当时时间',
  `create_user_id` BIGINT UNSIGNED NOT NULL COMMENT '创建人id',
  `update_user_id` BIGINT UNSIGNED NOT NULL COMMENT '修改人id',
  `update_time` timestamp NULL DEFAULT NULL COMMENT '修改时间',
  `version` int DEFAULT '1' COMMENT '版本号',
  PRIMARY KEY (`personal_task_note_id`),
  KEY `note_personal_task_id` (`note_personal_task_id`),
     KEY `create_user_id` (`create_user_id`),
  KEY `update_user_id` (`update_user_id`),
  CONSTRAINT `personal_task_note_ibfk_1` FOREIGN KEY (`note_personal_task_id`) REFERENCES `personal_task` (`personal_task_id`),
    CONSTRAINT `personal_task_note_ibfk_2` FOREIGN KEY (`create_user_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `personal_task_note_ibfk_3` FOREIGN KEY (`update_user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='注意事项表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `notification`
--

DROP TABLE IF EXISTS `notification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notification` (
  `notification_id` BIGINT UNSIGNED NOT NULL COMMENT '通知表主键',
  `notification_title` varchar(255) DEFAULT NULL COMMENT '通知标题',
  `notifications_object_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '通知内容的 MongoDB 地址',
   `notification_priority` TINYINT  DEFAULT '1' COMMENT ' 通知优先级',
  `notification_add_email_server`  TINYINT DEFAULT '0' COMMENT '是否添加邮件服务器',
  `notification_type` TINYINT    DEFAULT '0' COMMENT '通知类型',
  `status` tinyint NOT NULL DEFAULT '1' COMMENT '状态0-inactive 1:actice 3:delete',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间 默认当时时间',
  `create_user_id` BIGINT UNSIGNED NOT NULL COMMENT '创建人id',
  `update_user_id` BIGINT UNSIGNED NOT NULL COMMENT '修改人id',
  `update_time` timestamp NULL DEFAULT NULL COMMENT '修改时间',
  `version` int DEFAULT '1' COMMENT '版本号',
  PRIMARY KEY (`notification_id`),
     KEY `create_user_id` (`create_user_id`),
  KEY `update_user_id` (`update_user_id`),
    CONSTRAINT `notification_ibfk_2` FOREIGN KEY (`create_user_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `notification_ibfk_3` FOREIGN KEY (`update_user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='通知表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `notification_receiver`
--

DROP TABLE IF EXISTS `notification_receiver`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
-- CREATE TABLE `notification_receiver` (
--   `notification_receiver_id` BIGINT UNSIGNED NOT NULL,
--   `notification_id` BIGINT UNSIGNED NOT NULL,
--   `receiver_id` BIGINT UNSIGNED NOT NULL,
--   `is_read` tinyint(1) DEFAULT '0',
--   `read_time` timestamp NULL DEFAULT NULL,
--   `status` tinyint NOT NULL DEFAULT '1' COMMENT '状态0-inactive 1:actice 3:delete',
--   `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间 默认当时时间',
--   `create_user_id` BIGINT UNSIGNED NOT NULL COMMENT '创建人id',
--   `update_user_id` BIGINT UNSIGNED NOT NULL COMMENT '修改人id',
--   `update_time` timestamp NULL DEFAULT NULL COMMENT '修改时间',
--   `version` int DEFAULT '1' COMMENT '版本号',
--   PRIMARY KEY (`notification_receiver_id`),
--   KEY `notification_id` (`notification_id`),
--   KEY `receiver_id` (`receiver_id`),
--      KEY `create_user_id` (`create_user_id`),
--   KEY `update_user_id` (`update_user_id`),
--   CONSTRAINT `notification_receiver_ibfk_1` FOREIGN KEY (`notification_id`) REFERENCES `notification` (`notification_id`),
--   CONSTRAINT `notification_receiver_ibfk_2` FOREIGN KEY (`receiver_id`) REFERENCES `user` (`user_id`),
--     CONSTRAINT `notification_receiver_ibfk_3` FOREIGN KEY (`create_user_id`) REFERENCES `user` (`user_id`),
--   CONSTRAINT `notification_receiver_ibfk_4` FOREIGN KEY (`update_user_id`) REFERENCES `user` (`user_id`)
-- ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='通知接受表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `organization`
--

DROP TABLE IF EXISTS `organization`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `organization` (
  `organization_id` BIGINT UNSIGNED NOT NULL COMMENT '组群id-主键',
  `organization_name` varchar(255) NOT NULL COMMENT '组群名字',
  `organization_code` varchar(12) NOT NULL  COMMENT '组织代码',
  `organization_superior_id` BIGINT UNSIGNED DEFAULT NULL COMMENT '上级部门id',
  `organization_scale` int NOT NULL DEFAULT '200' COMMENT '部门规模',
  `organization_description` varchar(255) DEFAULT NULL COMMENT '组织描述',
  `organization_vip_status` tinyint NOT NULL DEFAULT '0' COMMENT '组织vip状态0：默认没有开启，1：开启',
  `organization_vip_type` tinyint DEFAULT "1" COMMENT '组织vip类型0-免费，1-一周;2-月；3-季度；4-年',
  -- `organization_vip_continued` tinyint DEFAULT NULL COMMENT '组织vip连续0-不开启，1-开启',
  `status` tinyint NOT NULL DEFAULT '1' COMMENT '状态0-inactive 1:active 3:delete',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间 默认当时时间',
  `create_user_id` BIGINT UNSIGNED NOT NULL COMMENT '创建人id',
  `update_user_id` BIGINT UNSIGNED NOT NULL COMMENT '修改人id',
  `update_time` timestamp NULL DEFAULT NULL COMMENT '修改时间',
  `version` int DEFAULT '1' COMMENT '版本号',
  PRIMARY KEY (`organization_id`),
  UNIQUE KEY `organization_code` (`organization_code`),
  KEY `update_user_id` (`update_user_id`),
  KEY `create_user_id` (`create_user_id`),
  CONSTRAINT `organization_ibfk_1` FOREIGN KEY (`update_user_id`) REFERENCES `user`(`user_id`),
  CONSTRAINT `organization_ibfk_2` FOREIGN KEY (`create_user_id`) REFERENCES `user`(`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='组群表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `organization_leader`
--

DROP TABLE IF EXISTS `organization_leader`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `organization_leader` (
  `organization_leader_id` BIGINT UNSIGNED NOT NULL COMMENT '组织用户id-主键',
  `organization_id` BIGINT UNSIGNED NOT NULL COMMENT '组织id-外键',
  `leader_id` BIGINT UNSIGNED NOT NULL COMMENT '用户id-外键',
  `status` tinyint NOT NULL DEFAULT '1' COMMENT '状态0-inactive 1:actice 3:delete',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间 默认当时时间',
  `create_user_id` BIGINT UNSIGNED NOT NULL COMMENT '创建人id',
  `update_user_id` BIGINT UNSIGNED NOT NULL COMMENT '修改人id',
  `update_time` timestamp NULL DEFAULT NULL COMMENT '修改时间',
  `version` int DEFAULT '1' COMMENT '版本号',
  PRIMARY KEY (`organization_leader_id`),
  KEY `organization_id` (`organization_id`),
  KEY `leader_id` (`leader_id`),
     KEY `create_user_id` (`create_user_id`),
  KEY `update_user_id` (`update_user_id`),
  CONSTRAINT `organization_user_ibfk_1` FOREIGN KEY (`organization_id`) REFERENCES `organization` (`organization_id`),
  CONSTRAINT `organization_user_ibfk_2` FOREIGN KEY (`leader_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `organization_user_ibfk_3` Foreign Key (`update_user_id`) REFERENCES `user`(`user_id`),
   CONSTRAINT `organization_user_ibfk_4` Foreign Key (`create_user_id`) REFERENCES `user`(`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='组织用户表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `permission`
--

DROP TABLE IF EXISTS `permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `permission` (
  `permission_id` BIGINT UNSIGNED NOT NULL COMMENT '权限id-主键',
  `permission_name` varchar(255) NOT NULL COMMENT '权限名字',
  `permission_code` varchar(20) NOT NULL COMMENT '权限代码',
  `permission_description` varchar(255) DEFAULT NULL COMMENT '权限描述',
  `status` tinyint NOT NULL DEFAULT '1' COMMENT '状态0-inactive 1:actice 3:delete',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间 默认当时时间',
  `create_user_id` BIGINT UNSIGNED NOT NULL COMMENT '创建人id',
  `update_user_id` BIGINT UNSIGNED NOT NULL COMMENT '修改人id',
  `update_time` timestamp NULL DEFAULT NULL COMMENT '修改时间',
  `version` int DEFAULT '1' COMMENT '版本号',
  PRIMARY KEY (`permission_id`),
  UNIQUE KEY `permission_name` (`permission_name`),
  UNIQUE KEY `permission_code` (`permission_code`),
     KEY `create_user_id` (`create_user_id`),
  KEY `update_user_id` (`update_user_id`),
    CONSTRAINT `permission_ibfk_1` FOREIGN KEY (`create_user_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `permission_ibfk_2` FOREIGN KEY (`update_user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='权限表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role` (
  `role_id` BIGINT UNSIGNED NOT NULL COMMENT '角色id-主键',
  `role_name` varchar(255) NOT NULL COMMENT '角色名字',
  `roleCode` varchar(20) NOT NULL COMMENT '角色代码',
  `role_description` varchar(255) DEFAULT NULL COMMENT '角色描述',
  `status` tinyint NOT NULL DEFAULT '1' COMMENT '状态0-inactive 1:actice 3:delete',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间 默认当时时间',
  `create_user_id` BIGINT UNSIGNED NOT NULL COMMENT '创建人id',
  `update_user_id` BIGINT UNSIGNED NOT NULL COMMENT '修改人id',
  `update_time` timestamp NULL DEFAULT NULL COMMENT '修改时间',
  `version` int DEFAULT '1' COMMENT '版本号',

  此处的范围应该修改位
  `role_range` int unsigned NOT NULL DEFAULT '1' COMMENT '权限范围1：用户级别默认值',
  PRIMARY KEY (`role_id`),
  UNIQUE KEY `role_name` (`role_name`),
  UNIQUE KEY `roleCode` (`roleCode`),
      KEY `create_user_id` (`create_user_id`),
  KEY `update_user_id` (`update_user_id`),
    CONSTRAINT `role_ibfk_1` FOREIGN KEY (`create_user_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `role_ibfk_2` FOREIGN KEY (`update_user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='角色表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `role_permission`
--

DROP TABLE IF EXISTS `role_permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role_permission` (
  `role_permission_id` BIGINT UNSIGNED NOT NULL COMMENT '角色权限id-主键',
  `role_id` BIGINT UNSIGNED NOT NULL COMMENT '角色id-外键',
  `permission_id` BIGINT UNSIGNED NOT NULL COMMENT '权限id-外键',
  `status` tinyint NOT NULL DEFAULT '1' COMMENT '状态0-inactive 1:actice 3:delete',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间 默认当时时间',
  `create_user_id` BIGINT UNSIGNED NOT NULL COMMENT '创建人id',
  `update_user_id` BIGINT UNSIGNED NOT NULL COMMENT '修改人id',
  `update_time` timestamp NULL DEFAULT NULL COMMENT '修改时间',
  `version` int DEFAULT '1' COMMENT '版本号',
  PRIMARY KEY (`role_permission_id`),
  KEY `role_id` (`role_id`),
  KEY `permission_id` (`permission_id`),
    KEY `create_user_id` (`create_user_id`),
  KEY `update_user_id` (`update_user_id`),
  CONSTRAINT `role_permission_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `role` (`role_id`),
  CONSTRAINT `role_permission_ibfk_2` FOREIGN KEY (`permission_id`) REFERENCES `permission` (`permission_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='角色_权限_关联表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `setting`
--

DROP TABLE IF EXISTS `setting`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `setting` (
  `setting_id` BIGINT UNSIGNED NOT NULL COMMENT '设置id',
  -- `setting_user_id` BIGINT UNSIGNED NOT NULL COMMENT '外键-用户id',
  `show_calendar` tinyint(1) DEFAULT '1' COMMENT '是否展示日历部分，默认:1展示',
  `show_matrix` tinyint(1) DEFAULT '1' COMMENT '是否展示四象限部分，默认:1展示',
  `show_habit` tinyint(1) DEFAULT '1' COMMENT '是否展示习惯部分，默认:1展示',
  `show_focus` tinyint(1) DEFAULT '1' COMMENT '是否展示专注部分，默认:1展示',
  `show_week_number` tinyint(1) DEFAULT '1' COMMENT '是否展示周数 默认:1展示',
  `start_week_date` tinyint DEFAULT '7' COMMENT '每周开始日期',
  `time_format` tinyint DEFAULT '24' COMMENT '时间格式:1为24小时制，0为12小时制',
  `time_zone` tinyint DEFAULT '8' COMMENT '时区设置，例如: UTC+8',
  `week_start_day` tinyint DEFAULT '7' COMMENT '每周开始日（1=周一，7=周日）',
  `show_all_tasks` tinyint(1) DEFAULT '1' COMMENT '是否展示每日任务，默认:1展示',
  `show_today_tasks` tinyint(1) DEFAULT '1' COMMENT '是否展示今日任务，默认:1展示',
  `show_tomorrow_tasks` tinyint(1) DEFAULT '1' COMMENT '是否展示明日任务，默认:1展示',
  `show_week_tasks` tinyint(1) DEFAULT '1' COMMENT '是否展示周任务，默认:1展示',
  `show_abstract` tinyint(1) DEFAULT '1' COMMENT '是否展示摘要，默认:1展示',
  `show_assigned_tasks` tinyint(1) DEFAULT '1' COMMENT '是否展示指派给我的任务，默认:1展示',
  `show_collecting_box` tinyint(1) DEFAULT '1' COMMENT '是否展示收集箱，默认:1展示',
  `theme_id` TINYINT UNSIGNED DEFAULT '1' COMMENT '主题',
  `daily_notice` tinyint(1) DEFAULT '1' COMMENT '是否开启每日提醒，默认:1开启',
  `daily_notice_time` time DEFAULT '09:00:00' COMMENT '每日提醒时间，默认:上午9点',
  `page_notice` tinyint(1) DEFAULT '1' COMMENT '是否开启网页提示，默认:1开启',
  `email_notice` tinyint(1) DEFAULT '1' COMMENT '是否开启邮箱提示，默认:1开启',
  `status` tinyint DEFAULT '1' COMMENT '状态0-inactive 1:actice 3:delete',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间 默认当前时间',
  `create_user_id` BIGINT UNSIGNED NOT NULL COMMENT '创建人id',
  `update_user_id` BIGINT UNSIGNED NOT NULL COMMENT '修改人id',
  `update_time` timestamp NULL DEFAULT NULL COMMENT '修改时间',
  `version` int DEFAULT '1' COMMENT '版本号',
  PRIMARY KEY (`setting_id`),
    KEY `create_user_id` (`create_user_id`),
  KEY `update_user_id` (`update_user_id`)
  -- KEY `setting_user_id` (`setting_user_id`),
  -- CONSTRAINT `setting_ibfk_1` FOREIGN KEY (`setting_user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='用户设置表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tag`
--

DROP TABLE IF EXISTS `tag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tag` (
  `tag_id` BIGINT UNSIGNED NOT NULL COMMENT '标签id',
  `tag_name` varchar(50) NOT NULL COMMENT '标签名字',
  `tag_color` varchar(20) DEFAULT NULL COMMENT '标签颜色',
  `tag_parent_id` BIGINT UNSIGNED  DEFAULT NULL COMMENT '父标签-自引用外键',
  `tag_user_id` BIGINT UNSIGNED NOT NULL COMMENT '标签归属的用户id -外键',
  `status` tinyint NOT NULL DEFAULT '1' COMMENT '状态0-inactive 1:actice 3:delete',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间 默认当时时间',
  `create_user_id` BIGINT UNSIGNED NOT NULL COMMENT '创建人id',
  `update_user_id` BIGINT UNSIGNED NOT NULL COMMENT '修改人id',
  `update_time` timestamp NULL DEFAULT NULL COMMENT '修改时间',
  `version` int DEFAULT '1' COMMENT '版本号',
  PRIMARY KEY (`tag_id`),
  KEY `tag_user_id` (`tag_user_id`),
  KEY `tag_parent` (`tag_parent_id`),
    KEY `create_user_id` (`create_user_id`),
  KEY `update_user_id` (`update_user_id`),
  CONSTRAINT `tag_ibfk_1` FOREIGN KEY (`tag_user_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `tag_ibfk_2` FOREIGN KEY (`tag_user_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `tag_ibfk_3` FOREIGN KEY (`tag_parent_id`) REFERENCES `tag` (`tag_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='标签表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tag_task`
--

DROP TABLE IF EXISTS `tag_personal_task`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tag_personal_task` (
  `tag_personal_task_id` BIGINT UNSIGNED NOT NULL COMMENT '标签任务id',
  `tag_task_personal_tag_id` BIGINT UNSIGNED NOT NULL COMMENT '标签任务关联标签id',
  `tag_task_personal_task_id` BIGINT UNSIGNED NOT NULL COMMENT '标签任务关联任务id',
  `status` tinyint NOT NULL DEFAULT '1' COMMENT '状态0-inactive 1:actice 3:delete',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间 默认当时时间',
  `create_user_id` BIGINT UNSIGNED NOT NULL COMMENT '创建人id',
  `update_user_id` BIGINT UNSIGNED NOT NULL COMMENT '修改人id',
  `update_time` timestamp NULL DEFAULT NULL COMMENT '修改时间',
  `version` int DEFAULT '1' COMMENT '版本号',
  PRIMARY KEY (`tag_personal_task_id`),
  KEY `tag_task_personal_tag_id` (`tag_task_personal_tag_id`),
  KEY `tag_task_personal_task_id` (`tag_task_personal_task_id`),
    KEY `create_user_id` (`create_user_id`),
  KEY `update_user_id` (`update_user_id`),
  CONSTRAINT `tag_task_ibfk_1` FOREIGN KEY (`tag_task_personal_tag_id`) REFERENCES `tag` (`tag_id`),
  CONSTRAINT `tag_task_ibfk_2` FOREIGN KEY (`tag_task_personal_task_id`) REFERENCES `peraonal_task` (`personal_task_id`),
   CONSTRAINT `tag_task_ibfk_3` FOREIGN KEY (`create_user_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `tag_task_ibfk_4` FOREIGN KEY (`update_user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='标签任务关联表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `task`
--

DROP TABLE IF EXISTS `public_task`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;

/*私有任务*/
CREATE TABLE `public_task` (
  `public_task_id` BIGINT UNSIGNED NOT NULL COMMENT '任务id-主键',
  `public_task_title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '任务标题',
  `public_task_start_time` timestamp NULL DEFAULT NULL COMMENT '任务开始时间',
  `public_task_end_time` timestamp NULL DEFAULT NULL COMMENT '任务结束时间',
  `public_task_priority` TINYINT DEFAULT '0' COMMENT '任务等级 0->3增加',
    `task_checkin_days_id` BIGINT UNSIGNED NOT NULL COMMENT '关联的打卡规则id',
  `public_task_parent_id` BIGINT DEFAULT NULL COMMENT '父任务id-自引用外键',
  `public_task_object_id` BIGINT DEFAULT NULL COMMENT '任务正文mongodb_id',
  `public_task_listicle_id` BIGINT DEFAULT NULL COMMENT 'task清单id',
  `status` tinyint NOT NULL DEFAULT '1' COMMENT '状态0-inactive 1:actice 3:delete',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间 默认当时时间',
  `create_user_id` BIGINT UNSIGNED NOT NULL COMMENT '创建人id',
  `update_user_id` BIGINT UNSIGNED NOT NULL COMMENT '修改人id',
  `update_time` timestamp NULL DEFAULT NULL COMMENT '修改时间',
  `version` int DEFAULT '1' COMMENT '版本号',
  PRIMARY KEY (`public_task_id`),
  KEY `public_task_parent_id` (`public_task_parent_id`),
  KEY `public_task_listicle_id` (`public_task_listicle_id`),
    KEY `create_user_id` (`create_user_id`),
  KEY `update_user_id` (`update_user_id`),
  CONSTRAINT `public_task_ibfk_1` FOREIGN KEY (`create_user_id`) REFERENCES `user` (`user_id`),
   CONSTRAINT `public_task_ibfk_2` FOREIGN KEY (`update_user_id`) REFERENCES `user` (`user_id`),
   CONSTRAINT `public_task_ibfk_3` FOREIGN KEY (`task_checkin_days_id`) REFERENCES `task_checkin_days` (`task_checkin_days_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='任务表';
/*!40101 SET character_set_client = @saved_cs_client */;
/*私有任务*/

DROP TABLE IF EXISTS `personal_task`;
CREATE TABLE `personal_task` (
  `personal_task_id` BIGINT UNSIGNED NOT NULL COMMENT '任务id-主键',
  `personal_task_title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '任务标题',
  `personal_task_start_time` timestamp NULL DEFAULT NULL COMMENT '任务开始时间',
  `personal_task_end_time` timestamp NULL DEFAULT NULL COMMENT '任务结束时间',
  `personal_task_priority` TINYINT DEFAULT '0' COMMENT '任务等级 0->3增加',
    `task_checkin_days_id` BIGINT UNSIGNED NOT NULL COMMENT '关联的打卡规则id',
  `personal_task_is_finished` TINYINT DEFAULT '0' COMMENT '任务完成状态-0:未完成-1:完成-2:待做/正在做',
  `personal_task_parent_id` BIGINT DEFAULT NULL COMMENT '父任务id-自引用外键',
  `personal_task_object_id` VARCHAR(255) DEFAULT NULL COMMENT '任务正文mongodb_id',
  `personal_task_is_keep_on_top` TINYINT DEFAULT '0' COMMENT '是否置顶，默认不置顶0',
  `personal_task_listicle_id` BIGINT DEFAULT NULL COMMENT 'task清单id',
  `status` tinyint NOT NULL DEFAULT '1' COMMENT '状态0-inactive 1:actice 3:delete',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间 默认当时时间',
  `create_user_id` BIGINT UNSIGNED NOT NULL COMMENT '创建人id',
  `update_user_id` BIGINT UNSIGNED NOT NULL COMMENT '修改人id',
  `update_time` timestamp NULL DEFAULT NULL COMMENT '修改时间',
  `version` int DEFAULT '1' COMMENT '版本号',
  PRIMARY KEY (`personal_task_id`),
  KEY `create_user_id` (`create_user_id`),
  KEY `update_user_id` (`update_user_id`),
  KEY `personal_task_parent_id` (`personal_task_parent_id`),
  KEY `personal_task_listicle_id` (`personal_task_listicle_id`),
  CONSTRAINT `personal_task_ibfk_1` FOREIGN KEY (`create_user_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `personal_task_ibfk_2` FOREIGN KEY (`update_user_id`) REFERENCES `user` (`user_id`),
    CONSTRAINT `personal_task_ibfk_3` FOREIGN KEY (`create_user_id`) REFERENCES `user` (`user_id`),
   CONSTRAINT `personal_task_ibfk_4` FOREIGN KEY (`update_user_id`) REFERENCES `user` (`user_id`),
   CONSTRAINT `personal_task_ibfk_5` FOREIGN KEY (`task_checkin_days_id`) REFERENCES `task_checkin_days` (`task_checkin_days_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='任务表';
--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `user_id` BIGINT UNSIGNED NOT NULL COMMENT '用户id-主键',
  `user_nickname` varchar(255) NOT NULL COMMENT '用户昵称',
  `user_email` varchar(255) NOT NULL COMMENT '邮箱',
  `user_password` varchar(255) NOT NULL COMMENT '用户密码',
  `user_avatar` varchar(255) DEFAULT NULL COMMENT '用户头像地址',
  `user_type` tinyint DEFAULT '0' COMMENT '用户类型',
  `user_organization_id` BIGINT UNSIGNED DEFAULT NULL COMMENT '用户群组-外键',
  `user_department_id` BIGINT UNSIGNED DEFAULT NULL COMMENT '用户部门-外键',
  `user_vip_status` tinyint NOT NULL DEFAULT '0' COMMENT '用户vip状态：0：没有 1：vip',
  `user_setting_id` BIGINT UNSIGNED NOT NULL DEFAULT '001' COMMENT '用户设置表id',
  `user_phone` varchar(20) DEFAULT NULL COMMENT '用户手机号',
  `user_gender` TINYINT DEFAULT '1' COMMENT '用户性别',
  `user_birthday` DATE  COMMENT '生日',
  `user_open_id` varchar(50) DEFAULT NULL,
  `user_union_id` varchar(50) DEFAULT NULL,
  `user_vip_type` tinyint DEFAULT NULL COMMENT '用户vip类型：0-免费，1-一周，2-一月，3-季度，4-年',
  `user_vip_continued` tinyint DEFAULT NULL COMMENT 'vip持续 0：不持续，1-持续',
  `user_superior_id` BIGINT UNSIGNED DEFAULT NULL COMMENT '上级id',
   `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间 默认当时时间',
  `status` tinyint NOT NULL DEFAULT '1' COMMENT '状态0-inactive 1:actice 3:delete',
  `create_user_id` BIGINT UNSIGNED NOT NULL COMMENT '创建人id',
  `update_user_id` BIGINT UNSIGNED NOT NULL COMMENT '修改人id',
  `update_time` timestamp NULL DEFAULT NULL COMMENT '修改时间',
  `version` int DEFAULT '1' COMMENT '版本号',
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `user_email` (`user_email`),
  UNIQUE KEY `user_open_id` (`user_open_id`),
  KEY `user_organization_id` (`user_organization_id`),
  KEY `user_department_id` (`user_department_id`),
  KEY `user_superior_id` (`user_superior_id`),
  CONSTRAINT `user_ibfk_1` FOREIGN KEY (`user_organization_id`) REFERENCES `organization` (`organization_id`),
  CONSTRAINT `user_ibfk_2` FOREIGN KEY (`user_department_id`) REFERENCES `department` (`department_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='用户表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user_roles`
--

DROP TABLE IF EXISTS `user_roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_roles` (
  `user_role_id` BIGINT UNSIGNED NOT NULL COMMENT '用户角色id-主键',
  `role_id` BIGINT UNSIGNED NOT NULL COMMENT '角色id-外键',
  `user_id` BIGINT UNSIGNED NOT NULL COMMENT '用户id-外键',
  `status` tinyint NOT NULL DEFAULT '1' COMMENT '状态0-inactive 1:actice 3:delete',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间 默认当时时间',
  `create_user_id` BIGINT UNSIGNED NOT NULL COMMENT '创建人id',
  `update_user_id` BIGINT UNSIGNED NOT NULL COMMENT '修改人id',
  `update_time` timestamp NULL DEFAULT NULL COMMENT '修改时间',
  `version` int DEFAULT '1' COMMENT '版本号',
  PRIMARY KEY (`user_role_id`),
  KEY `role_id` (`role_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `user_roles_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `role` (`role_id`),
  CONSTRAINT `user_roles_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='用户_角色_关联表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user_type`
--

DROP TABLE IF EXISTS `user_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
-- CREATE TABLE `user_type` (
--   `user_type_id` BIGINT UNSIGNED NOT NULL COMMENT '用户类型id-主键',
--   `user_type_name` varchar(255) NOT NULL COMMENT '用户类型名字',
--   `user_type_description` varchar(255) DEFAULT NULL COMMENT '用户类型描述',
--   `status` tinyint NOT NULL DEFAULT '1' COMMENT '状态0-inactive 1:actice 3:delete',
--   `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间 默认当时时间',
--   `create_user_id` BIGINT UNSIGNED NOT NULL COMMENT '创建人id',
--   `update_user_id` BIGINT UNSIGNED NOT NULL COMMENT '修改人id',
--   `update_time` timestamp NULL DEFAULT NULL COMMENT '修改时间',
--   `version` int DEFAULT '1' COMMENT '版本号',
--   PRIMARY KEY (`user_type_id`),
--   UNIQUE KEY `user_type_name` (`user_type_name`)
-- ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='用户类型表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user_type_user`
--

DROP TABLE IF EXISTS `user_type_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
-- CREATE TABLE `user_type_user` (
--   `user_type_user_id` BIGINT UNSIGNED NOT NULL COMMENT '用户类型关联用户id-主键',
--   `user_type_id` BIGINT UNSIGNED NOT NULL COMMENT '用户类型id-外键',
--   `user_id` BIGINT UNSIGNED NOT NULL COMMENT '用户id-外键',
--   `status` tinyint NOT NULL DEFAULT '1' COMMENT '状态0-inactive 1:actice 3:delete',
--   `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间 默认当时时间',
--   `create_user_id` BIGINT UNSIGNED NOT NULL COMMENT '创建人id',
--   `update_user_id` BIGINT UNSIGNED NOT NULL COMMENT '修改人id',
--   `update_time` timestamp NULL DEFAULT NULL COMMENT '修改时间',
--   `version` int DEFAULT '1' COMMENT '版本号',
--   PRIMARY KEY (`user_type_user_id`),
--   KEY `user_type_id` (`user_type_id`),
--   KEY `user_id` (`user_id`),
--   CONSTRAINT `user_type_user_ibfk_1` FOREIGN KEY (`user_type_id`) REFERENCES `user_type` (`user_type_id`),
--   CONSTRAINT `user_type_user_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
-- ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='用户类型_用户_关联表';
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

DROP TABLE IF EXISTS `order`;
CREATE TABLE `order` (
    `order_id` BIGINT UNSIGNED NOT NULL,  -- 订单ID，主键，自增
    `order_user_id` BIGINT UNSIGNED NOT NULL,                     -- 用户ID，外键，指向用户表
    `order_vip_type`TINYINT NOT NULL DEFAULT 0,     -- 会员类型，例如：普通会员、VIP会员等
    `price` DECIMAL(10, 2) NOT NULL,            -- 订单价格
    `payment_method` TINYINT NOT NULL,      -- 支付方式，例如：信用卡、PayPal等
    `payment_status` TINYINT NOT NULL DEFAULT 0,      -- 支付状态，例如：1-已支付、0-未支付、2-支付失败等
    `status` TINYINT NOT NULL DEFAULT 0,        -- 订单状态， 1完成 0-进行中、2-已取消 等
   `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间 默认当时时间',
  `create_user_id` BIGINT UNSIGNED NOT NULL COMMENT '创建人id',
  `update_user_id` BIGINT UNSIGNED NOT NULL COMMENT '修改人id',
  `update_time` timestamp NULL DEFAULT NULL COMMENT '修改时间',
  `version` int DEFAULT '1' COMMENT '版本号',
  PRIMARY KEY (`order_id`),
  KEY`user_id`(`order_user_id`),
   CONSTRAINT `order_ibfk_1` FOREIGN KEY (`order_user_id`) REFERENCES `user` (`user_id`)

)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='订单表';
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-01-09 12:55:19
DROP TABLE IF EXISTS `login`;
-- 创建登录表
CREATE TABLE login (
    login_id BIGINT UNSIGNED PRIMARY KEY COMMENT'登录表',
    user_id BIGINT UNSIGNED NOT NULL,
    device_id BIGINT UNSIGNED NOT NULL,
    ip_address VARCHAR(45) NOT NULL,
    os VARCHAR(100),  -- 操作系统信息
    browser VARCHAR(100),  -- 浏览器信息
    login_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
     `status` TINYINT NOT NULL DEFAULT 0,        -- 订单状态， 1完成 0-进行中、2-已取消 等
   `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间 默认当时时间',
  `create_user_id` BIGINT UNSIGNED NOT NULL COMMENT '创建人id',
  `update_user_id` BIGINT UNSIGNED NOT NULL COMMENT '修改人id',
  `update_time` timestamp NULL DEFAULT NULL COMMENT '修改时间',
  `version` int DEFAULT '1' COMMENT '版本号',
    FOREIGN KEY (user_id) REFERENCES user(user_id),
    FOREIGN KEY (device_id) REFERENCES device(device_id)
);

DROP TABLE IF EXISTS `device`;
-- 创建设别表
CREATE TABLE device (
    device_id BIGINT UNSIGNED PRIMARY KEY COMMENT '设备id',
    device_name VARCHAR(100) NOT NULL COMMENT '设备名',
    device_type VARCHAR(50) NOT NULL COMMENT '设备类型',
     `status` TINYINT NOT NULL DEFAULT 0,        -- 订单状态， 1完成 0-进行中、2-已取消 等
   `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间 默认当时时间',
  `create_user_id` BIGINT UNSIGNED NOT NULL COMMENT '创建人id',
  `update_user_id` BIGINT UNSIGNED NOT NULL COMMENT '修改人id',
  `update_time` timestamp NULL DEFAULT NULL COMMENT '修改时间',
  `version` int DEFAULT '1' COMMENT '版本号',
  
);

-- 创建任务接收表
CREATE TABLE `receive`(
  `receive_id` BIGINT  UNSIGNED  NOT NULL COMMENT '公开任务接收表主键',
  `user_id` BIGINT UNSIGNED  NOT NULL COMMENT '接收用户id',
    `receive_type` TINYINT NOT NULL COMMENT '区分接收的数据是公开任务还是通知',
  `public_task_id` BIGINT UNSIGNED  DEFAULT NULL COMMENT '公开任务id',
  `notification_id` BIGINT  UNSIGNED DEFAULT NULL COMMENT '公开任务id',
`is_read` TINYINT DEFAULT '0' COMMENT '是否已读',
   `status` TINYINT NOT NULL DEFAULT 0,        -- 订单状态， 1完成 0-进行中、2-已取消 等
   `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间 默认当时时间',
  `create_user_id` BIGINT UNSIGNED NOT NULL COMMENT '创建人id',
  `update_user_id` BIGINT UNSIGNED NOT NULL COMMENT '修改人id',
  `update_time` timestamp NULL DEFAULT NULL COMMENT '修改时间',
  `version` int DEFAULT '1' COMMENT '版本号',
 PRIMARY KEY(`receive_id`)

);
-- 创建公开任务可编辑用户关联表

CREATE TABLE `editable_user_public_task`(
  `editable_user_public_task_id` BIGINT  UNSIGNED NOT NULL COMMENT '可编辑公开任务关联表主键',
  `public_task_id` BIGINT UNSIGNED NOT NULL COMMENT '可编辑任务id',
  `editable_user_id` BIGINT UNSIGNED NOT NULL COMMENT '可编辑任务用户id',
   `status` TINYINT NOT NULL DEFAULT 0,        -- 订单状态， 1完成 0-进行中、2-已取消 等
   `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间 默认当时时间',
  `create_user_id` BIGINT UNSIGNED NOT NULL COMMENT '创建人id',
  `update_user_id` BIGINT UNSIGNED NOT NULL COMMENT '修改人id',
  `update_time` timestamp NULL DEFAULT NULL COMMENT '修改时间',
  `version` int DEFAULT '1' COMMENT '版本号',
  PRIMARY KEY(`editable_user_public_task_id`),
   FOREIGN KEY (public_task_id) REFERENCES `public_task`(`public_task_id`),
    FOREIGN KEY (editable_user_id) REFERENCES `user`(`user_id`)
);

//创建编辑表
CREATE `edite`(
  `edite_id` BIGINT NOT NULL  COMMENT '编辑表主键id'
  `public_task_id` BIGINT NOT NULL COMMENT '对应的公开任务id'
  `edite_log` VARCHAR(255) DEFAULT NULL COMMENT '编辑日志'
   `status` TINYINT NOT NULL DEFAULT 0,        -- 订单状态， 1完成 0-进行中、2-已取消 等
   `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间 默认当时时间',
  `create_user_id` BIGINT UNSIGNED NOT NULL COMMENT '创建人id',
  `update_user_id` BIGINT UNSIGNED NOT NULL COMMENT '修改人id',
  `update_time` timestamp NULL DEFAULT NULL COMMENT '修改时间',
  `version` int DEFAULT '1' COMMENT '版本号',
  PRIMARY KEY(`editable_user_public_task_id`)
)
-- 创建通知接收表
-- CREATE TABLE `receive_notification`(
--   `receiver_notification_id` BIGINT  UNSIGNED  NOT NULL COMMENT '公开任务接收表主键',
--   `recevice_id` BIGINT UNSIGNED  NOT NULL COMMENT '接收用户id',
--   `notification_id` BIGINT UNSIGNED  NOT NULL COMMENT '公开任务id',
--    `status` TINYINT NOT NULL DEFAULT 0,        -- 订单状态， 1完成 0-进行中、2-已取消 等
--    `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间 默认当时时间',
--   `create_user_id` BIGINT UNSIGNED NOT NULL COMMENT '创建人id',
--   `update_user_id` BIGINT UNSIGNED NOT NULL COMMENT '修改人id',
--   `update_time` timestamp NULL DEFAULT NULL COMMENT '修改时间',
--   `version` int DEFAULT '1' COMMENT '版本号',

-- );
--创建专注表 
CREATE TABLE `focus`(
  `focus_id` BIGINT UNSIGNED NOT NULL COMMENT '专注id',
  `task_type` TINYINT  NOT NULL COMMENT '专注类型 1-私有任务 2-公开任务 3-习惯',
  `habit_id` BIGINT DEFAULT NULL COMMENT '关联的任务id',
  `personal_task_id` BIGINT DEFAULT NULL COMMENT '关联的任务id',
  `public_task_id` BIGINT DEFAULT NULL COMMENT '关联的任务id',
  `user_id` BIGINT UNSIGNED NOT NULL COMMENT '专注用户id',
  `focus_start_time` TIMESTAMP NOT NULL COMMENT '专注开始时间',
  `focus_end_time` TIMESTAMP NOT NULL COMMENT '专注结束时间',
  `focus_expect_duration` INT NOT NULL COMMENT '期望专注时长',
  `focus_actual_duration` INT NOT NULL COMMENT '实际专注时长',
  `focus_log` VARCHAR(255) COMMENT '本次专注描述',
  `status` TINYINT NOT NULL DEFAULT 0,        
   `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间 默认当时时间',
  `create_user_id` BIGINT UNSIGNED NOT NULL COMMENT '创建人id',
  `update_user_id` BIGINT UNSIGNED NOT NULL COMMENT '修改人id',
  `update_time` timestamp NULL DEFAULT NULL COMMENT '修改时间',
  `version` int DEFAULT '1' COMMENT '版本号',
  PRIMARY KEY(`focus_id`)
  -- FOREIGN KEY (task_id) REFERENCES `user`(`user_id`)
);

--创建私有任务专注关联
-- CREATE TABLE `focus_personal_task`(
--   `focus_personal_task_id` BIGINT UNSIGNED NOT NULL COMMENT '私有任务专注关联id',
--   `focus_id` BIGINT UNSIGNED NOT NULL COMMENT '专注id',
--   `personal_task_id` BIGINT UNSIGNED NOT NULL COMMENT '私有任务id',
--   `status` TINYINT NOT NULL DEFAULT 0,        
--    `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间 默认当时时间',
--   `create_user_id` BIGINT UNSIGNED NOT NULL COMMENT '创建人id',
--   `update_user_id` BIGINT UNSIGNED NOT NULL COMMENT '修改人id',
--   `update_time` timestamp NULL DEFAULT NULL COMMENT '修改时间',
--   `version` int DEFAULT '1' COMMENT '版本号',
--   PRIMARY KEY(`focus_personal_task_id`),
--   FOREIGN KEY (focus_id) REFERENCES `focus`(`focus_id`),
--   FOREIGN KEY (personal_task_id) REFERENCES `personal_task`(`personal_task_id`)
-- );
--创建公开任务专注关联
-- CREATE TABLE `focus_public_task`(
--   `focus_public_task_id` BIGINT UNSIGNED NOT NULL COMMENT '公开任务专注关联id',
--   `focus_id` BIGINT UNSIGNED NOT NULL COMMENT '专注id',
--   `public_task_id` BIGINT UNSIGNED NOT NULL COMMENT '公开任务id',
--   `status` TINYINT NOT NULL DEFAULT 0,        
--    `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间 默认当时时间',
--   `create_user_id` BIGINT UNSIGNED NOT NULL COMMENT '创建人id',
--   `update_user_id` BIGINT UNSIGNED NOT NULL COMMENT '修改人id',
--   `update_time` timestamp NULL DEFAULT NULL COMMENT '修改时间',
--   `version` int DEFAULT '1' COMMENT '版本号',
--   PRIMARY KEY(`focus_public_task_id`),
--   FOREIGN KEY (focus_id) REFERENCES `focus`(`focus_id`),
--   FOREIGN KEY (public_task_id) REFERENCES `public_task`(`public_task_id`)
-- );
-- 创建习惯专注关联
-- CREATE TABLE `focus_habit`(
--   `focus_habit_id` BIGINT UNSIGNED NOT NULL COMMENT '习惯专注关联id',
--   `focus_id` BIGINT UNSIGNED NOT NULL COMMENT '专注id',
--   `habit_id` BIGINT UNSIGNED NOT NULL COMMENT '习惯id',
--   `status` TINYINT NOT NULL DEFAULT 0,        
--    `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间 默认当时时间',
--   `create_user_id` BIGINT UNSIGNED NOT NULL COMMENT '创建人id',
--   `update_user_id` BIGINT UNSIGNED NOT NULL COMMENT '修改人id',
--   `update_time` timestamp NULL DEFAULT NULL COMMENT '修改时间',
--   `version` int DEFAULT '1' COMMENT '版本号',
--   PRIMARY KEY(`focus_habit_id`),
--   FOREIGN KEY (focus_id) REFERENCES `focus`(`focus_id`),
--   FOREIGN KEY (habit_id) REFERENCES `habit`(`habit_id`)
-- );

