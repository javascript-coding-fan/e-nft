-- -------------------------------------------------------------
-- TablePlus 4.5.0(396)
--
-- https://tableplus.com/
--
-- Database: creator
-- Generation Time: 2021-11-23 16:07:59.7870
-- -------------------------------------------------------------


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


DROP TABLE IF EXISTS `analytics`;
CREATE TABLE `analytics` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `count` int DEFAULT NULL,
  `type` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

DROP TABLE IF EXISTS `analyticsSetting`;
CREATE TABLE `analyticsSetting` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `enabled` tinyint(1) DEFAULT NULL,
  `port` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `processInterval` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

DROP TABLE IF EXISTS `authentication`;
CREATE TABLE `authentication` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `service` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `entity` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `secret` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `authStrategies` json DEFAULT NULL,
  `local` json DEFAULT NULL,
  `jwtOptions` json DEFAULT NULL,
  `bearerToken` json DEFAULT NULL,
  `callback` json DEFAULT NULL,
  `oauth` json DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

DROP TABLE IF EXISTS `Aws`;
CREATE TABLE `Aws` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `keys` json DEFAULT NULL,
  `route53` json DEFAULT NULL,
  `s3` json DEFAULT NULL,
  `cloudfront` json DEFAULT NULL,
  `sms` json DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

DROP TABLE IF EXISTS `block_creator`;
CREATE TABLE `block_creator` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `creatorId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `blockedId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `creatorId` (`creatorId`),
  KEY `blockedId` (`blockedId`),
  CONSTRAINT `block_creator_ibfk_1` FOREIGN KEY (`creatorId`) REFERENCES `creator` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `block_creator_ibfk_2` FOREIGN KEY (`blockedId`) REFERENCES `creator` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

DROP TABLE IF EXISTS `bot`;
CREATE TABLE `bot` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `description` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `locationId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `locationId` (`locationId`),
  CONSTRAINT `bot_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `bot_ibfk_2` FOREIGN KEY (`locationId`) REFERENCES `location` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

DROP TABLE IF EXISTS `botCommand`;
CREATE TABLE `botCommand` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `description` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `botId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `botId` (`botId`),
  CONSTRAINT `botcommand_ibfk_1` FOREIGN KEY (`botId`) REFERENCES `bot` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

DROP TABLE IF EXISTS `channel`;
CREATE TABLE `channel` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `channelType` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `userId1` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `userId2` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `groupId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `partyId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `channelType` (`channelType`),
  KEY `userId1` (`userId1`),
  KEY `userId2` (`userId2`),
  KEY `groupId` (`groupId`),
  KEY `partyId` (`partyId`),
  CONSTRAINT `channel_ibfk_1` FOREIGN KEY (`channelType`) REFERENCES `channel_type` (`type`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `channel_ibfk_2` FOREIGN KEY (`userId1`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `channel_ibfk_3` FOREIGN KEY (`userId2`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `channel_ibfk_4` FOREIGN KEY (`groupId`) REFERENCES `group` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `channel_ibfk_5` FOREIGN KEY (`partyId`) REFERENCES `party` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

DROP TABLE IF EXISTS `channel_type`;
CREATE TABLE `channel_type` (
  `type` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`type`),
  UNIQUE KEY `type` (`type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

DROP TABLE IF EXISTS `chargebeeSetting`;
CREATE TABLE `chargebeeSetting` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `url` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `apikey` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

DROP TABLE IF EXISTS `clientSetting`;
CREATE TABLE `clientSetting` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `enabled` tinyint(1) DEFAULT NULL,
  `logo` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `title` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `url` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `releaseName` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

DROP TABLE IF EXISTS `collection`;
CREATE TABLE `collection` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `sid` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `description` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `version` int DEFAULT NULL,
  `metadata` json DEFAULT NULL,
  `isPublic` tinyint(1) NOT NULL DEFAULT '1',
  `ownedFileIds` mediumtext COLLATE utf8mb4_general_ci,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `type` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `thumbnailOwnedFileId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `locationId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `type` (`type`),
  KEY `locationId` (`locationId`),
  CONSTRAINT `collection_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `collection_ibfk_2` FOREIGN KEY (`type`) REFERENCES `collection_type` (`type`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `collection_ibfk_3` FOREIGN KEY (`locationId`) REFERENCES `location` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

DROP TABLE IF EXISTS `collection_type`;
CREATE TABLE `collection_type` (
  `type` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`type`),
  UNIQUE KEY `type` (`type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

DROP TABLE IF EXISTS `comments`;
CREATE TABLE `comments` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `text` text COLLATE utf8mb4_general_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `creatorId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `feedId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `creatorId` (`creatorId`),
  KEY `feedId` (`feedId`),
  CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`creatorId`) REFERENCES `creator` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`feedId`) REFERENCES `feed` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

DROP TABLE IF EXISTS `comments_fires`;
CREATE TABLE `comments_fires` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `creatorId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `commentId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `creatorId` (`creatorId`),
  KEY `commentId` (`commentId`),
  CONSTRAINT `comments_fires_ibfk_1` FOREIGN KEY (`creatorId`) REFERENCES `creator` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `comments_fires_ibfk_2` FOREIGN KEY (`commentId`) REFERENCES `comments` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

DROP TABLE IF EXISTS `component`;
CREATE TABLE `component` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `data` json DEFAULT NULL,
  `entityId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `type` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `entityId` (`entityId`),
  CONSTRAINT `component_ibfk_1` FOREIGN KEY (`entityId`) REFERENCES `entity` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

DROP TABLE IF EXISTS `component_type`;
CREATE TABLE `component_type` (
  `type` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`type`),
  UNIQUE KEY `type` (`type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

DROP TABLE IF EXISTS `creator`;
CREATE TABLE `creator` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `verified` tinyint(1) DEFAULT NULL,
  `isBlocked` tinyint(1) DEFAULT NULL,
  `steps` tinyint(1) DEFAULT NULL,
  `terms` tinyint(1) DEFAULT NULL,
  `policy` tinyint(1) DEFAULT NULL,
  `name` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `username` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `link` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `bio` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `twitter` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `tiktok` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `snap` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `instagram` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `avatarId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

DROP TABLE IF EXISTS `emailSetting`;
CREATE TABLE `emailSetting` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `smtp` json DEFAULT NULL,
  `from` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `subject` json DEFAULT NULL,
  `smsNameCharacterLimit` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

DROP TABLE IF EXISTS `entity`;
CREATE TABLE `entity` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `entityId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `parent` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `collectionId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `index` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

DROP TABLE IF EXISTS `feed`;
CREATE TABLE `feed` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `description` text COLLATE utf8mb4_general_ci NOT NULL,
  `viewsCount` int NOT NULL DEFAULT '0',
  `featured` tinyint(1) NOT NULL DEFAULT '0',
  `featuredByAdmin` tinyint(1) NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `creatorId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `videoId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `previewId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `creatorId` (`creatorId`),
  CONSTRAINT `feed_ibfk_1` FOREIGN KEY (`creatorId`) REFERENCES `creator` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

DROP TABLE IF EXISTS `feed_bookmark`;
CREATE TABLE `feed_bookmark` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `creatorId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `feedId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `creatorId` (`creatorId`),
  KEY `feedId` (`feedId`),
  CONSTRAINT `feed_bookmark_ibfk_1` FOREIGN KEY (`creatorId`) REFERENCES `creator` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `feed_bookmark_ibfk_2` FOREIGN KEY (`feedId`) REFERENCES `feed` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

DROP TABLE IF EXISTS `feed_fires`;
CREATE TABLE `feed_fires` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `creatorId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `feedId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `feed_fires_creator_id_feed_id` (`creatorId`,`feedId`),
  KEY `feedId` (`feedId`),
  CONSTRAINT `feed_fires_ibfk_1` FOREIGN KEY (`creatorId`) REFERENCES `creator` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `feed_fires_ibfk_2` FOREIGN KEY (`feedId`) REFERENCES `feed` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

DROP TABLE IF EXISTS `feed_likes`;
CREATE TABLE `feed_likes` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `feedId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `creatorId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `feedId` (`feedId`),
  KEY `creatorId` (`creatorId`),
  CONSTRAINT `feed_likes_ibfk_1` FOREIGN KEY (`feedId`) REFERENCES `feed` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `feed_likes_ibfk_2` FOREIGN KEY (`creatorId`) REFERENCES `creator` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

DROP TABLE IF EXISTS `feed_report`;
CREATE TABLE `feed_report` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `creatorId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `feedId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `creatorId` (`creatorId`),
  KEY `feedId` (`feedId`),
  CONSTRAINT `feed_report_ibfk_1` FOREIGN KEY (`creatorId`) REFERENCES `creator` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `feed_report_ibfk_2` FOREIGN KEY (`feedId`) REFERENCES `feed` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

DROP TABLE IF EXISTS `follow_creator`;
CREATE TABLE `follow_creator` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `creatorId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `followerId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `creatorId` (`creatorId`),
  KEY `followerId` (`followerId`),
  CONSTRAINT `follow_creator_ibfk_1` FOREIGN KEY (`creatorId`) REFERENCES `creator` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `follow_creator_ibfk_2` FOREIGN KEY (`followerId`) REFERENCES `creator` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

DROP TABLE IF EXISTS `gameServerSetting`;
CREATE TABLE `gameServerSetting` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `clientHost` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `enabled` tinyint(1) DEFAULT NULL,
  `rtc_start_port` int DEFAULT NULL,
  `rtc_end_port` int DEFAULT NULL,
  `rtc_port_block_size` int DEFAULT NULL,
  `identifierDigits` int DEFAULT NULL,
  `local` tinyint(1) DEFAULT NULL,
  `domain` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `releaseName` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `port` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `mode` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `locationName` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

DROP TABLE IF EXISTS `group`;
CREATE TABLE `group` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `description` text COLLATE utf8mb4_general_ci,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

DROP TABLE IF EXISTS `group_user`;
CREATE TABLE `group_user` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `groupId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `groupUserRank` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `group_user_groupId_userId_unique` (`userId`,`groupId`),
  KEY `groupId` (`groupId`),
  KEY `groupUserRank` (`groupUserRank`),
  CONSTRAINT `group_user_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `group_user_ibfk_2` FOREIGN KEY (`groupId`) REFERENCES `group` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `group_user_ibfk_3` FOREIGN KEY (`groupUserRank`) REFERENCES `group_user_rank` (`rank`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

DROP TABLE IF EXISTS `group_user_rank`;
CREATE TABLE `group_user_rank` (
  `rank` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`rank`),
  UNIQUE KEY `rank` (`rank`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

DROP TABLE IF EXISTS `identity_provider`;
CREATE TABLE `identity_provider` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `isVerified` tinyint(1) DEFAULT NULL,
  `verifyToken` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `verifyShortToken` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `verifyExpires` datetime DEFAULT NULL,
  `verifyChanges` json DEFAULT NULL,
  `resetToken` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `resetExpires` datetime DEFAULT NULL,
  `type` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `identity_provider_user_id_token` (`userId`,`token`),
  UNIQUE KEY `identity_provider_user_id_type` (`userId`,`type`),
  KEY `identity_provider_id` (`id`),
  CONSTRAINT `identity_provider_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

DROP TABLE IF EXISTS `invite`;
CREATE TABLE `invite` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `identityProviderType` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `passcode` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `targetObjectId` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `inviteType` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `userId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `inviteeId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `inviteType` (`inviteType`),
  KEY `userId` (`userId`),
  KEY `inviteeId` (`inviteeId`),
  CONSTRAINT `invite_ibfk_1` FOREIGN KEY (`inviteType`) REFERENCES `invite_type` (`type`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `invite_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `invite_ibfk_3` FOREIGN KEY (`inviteeId`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

DROP TABLE IF EXISTS `invite_type`;
CREATE TABLE `invite_type` (
  `type` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`type`),
  UNIQUE KEY `type` (`type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

DROP TABLE IF EXISTS `location`;
CREATE TABLE `location` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `sceneId` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `slugifiedName` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `isLobby` tinyint(1) DEFAULT '0',
  `isFeatured` tinyint(1) DEFAULT '0',
  `maxUsersPerInstance` int NOT NULL DEFAULT '50',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `slugifiedName` (`slugifiedName`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

DROP TABLE IF EXISTS `location_admin`;
CREATE TABLE `location_admin` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `locationId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `userId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `location_admin_locationId_userId_unique` (`locationId`,`userId`),
  KEY `userId` (`userId`),
  CONSTRAINT `location_admin_ibfk_1` FOREIGN KEY (`locationId`) REFERENCES `location` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `location_admin_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

DROP TABLE IF EXISTS `location_ban`;
CREATE TABLE `location_ban` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `locationId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `userId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `locationId` (`locationId`),
  KEY `userId` (`userId`),
  CONSTRAINT `location_ban_ibfk_1` FOREIGN KEY (`locationId`) REFERENCES `location` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `location_ban_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

DROP TABLE IF EXISTS `location_settings`;
CREATE TABLE `location_settings` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `videoEnabled` tinyint(1) DEFAULT '0',
  `audioEnabled` tinyint(1) DEFAULT '0',
  `screenSharingEnabled` tinyint(1) DEFAULT '0',
  `faceStreamingEnabled` tinyint(1) DEFAULT '0',
  `instanceMediaChatEnabled` tinyint(1) DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `locationType` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `locationId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `locationType` (`locationType`),
  KEY `locationId` (`locationId`),
  CONSTRAINT `location_settings_ibfk_1` FOREIGN KEY (`locationType`) REFERENCES `location_type` (`type`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `location_settings_ibfk_2` FOREIGN KEY (`locationId`) REFERENCES `location` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

DROP TABLE IF EXISTS `location_type`;
CREATE TABLE `location_type` (
  `type` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`type`),
  UNIQUE KEY `type` (`type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

DROP TABLE IF EXISTS `login_token`;
CREATE TABLE `login_token` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `expiresAt` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `identityProviderId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `identityProviderId` (`identityProviderId`),
  CONSTRAINT `login_token_ibfk_1` FOREIGN KEY (`identityProviderId`) REFERENCES `identity_provider` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

DROP TABLE IF EXISTS `message`;
CREATE TABLE `message` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `text` varchar(1023) COLLATE utf8mb4_general_ci NOT NULL,
  `isNotification` tinyint(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `channelId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `senderId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `channelId` (`channelId`),
  KEY `senderId` (`senderId`),
  CONSTRAINT `message_ibfk_1` FOREIGN KEY (`channelId`) REFERENCES `channel` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `message_ibfk_2` FOREIGN KEY (`senderId`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

DROP TABLE IF EXISTS `message_status`;
CREATE TABLE `message_status` (
  `id` int NOT NULL AUTO_INCREMENT,
  `status` varchar(255) COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'unread',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `messageId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `userId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `messageId` (`messageId`),
  KEY `userId` (`userId`),
  CONSTRAINT `message_status_ibfk_1` FOREIGN KEY (`messageId`) REFERENCES `message` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `message_status_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

DROP TABLE IF EXISTS `notifications`;
CREATE TABLE `notifications` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `type` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

DROP TABLE IF EXISTS `owned_file`;
CREATE TABLE `owned_file` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `key` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `url` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `content_type` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `content_length` int NOT NULL,
  `state` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `ownerUserId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `ownerUserId` (`ownerUserId`),
  CONSTRAINT `owned_file_ibfk_1` FOREIGN KEY (`ownerUserId`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

DROP TABLE IF EXISTS `party`;
CREATE TABLE `party` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

DROP TABLE IF EXISTS `party_user`;
CREATE TABLE `party_user` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `isOwner` tinyint(1) DEFAULT '0',
  `isInviteAccepted` tinyint(1) DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `partyId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `userId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `party_user_partyId_userId_unique` (`partyId`,`userId`),
  KEY `userId` (`userId`),
  CONSTRAINT `party_user_ibfk_1` FOREIGN KEY (`partyId`) REFERENCES `party` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `party_user_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

DROP TABLE IF EXISTS `project`;
CREATE TABLE `project` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `storageProviderManifest` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `sourceManifest` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

DROP TABLE IF EXISTS `redisSetting`;
CREATE TABLE `redisSetting` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `enabled` tinyint(1) DEFAULT NULL,
  `address` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `port` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

DROP TABLE IF EXISTS `route`;
CREATE TABLE `route` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `project` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `route` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

DROP TABLE IF EXISTS `scope`;
CREATE TABLE `scope` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `groupId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `type` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `groupId` (`groupId`),
  KEY `type` (`type`),
  CONSTRAINT `scope_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `scope_ibfk_2` FOREIGN KEY (`groupId`) REFERENCES `group` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `scope_ibfk_3` FOREIGN KEY (`type`) REFERENCES `scopeType` (`type`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

DROP TABLE IF EXISTS `scopeType`;
CREATE TABLE `scopeType` (
  `type` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`type`),
  UNIQUE KEY `type` (`type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

DROP TABLE IF EXISTS `serverSetting`;
CREATE TABLE `serverSetting` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `hostName` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `serverEnabled` tinyint(1) DEFAULT NULL,
  `serverMode` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `port` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `clientHost` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `rootDirectory` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `publicDirectory` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `nodeModulesDirectory` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `localStorageProvider` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `performDryRun` tinyint(1) DEFAULT NULL,
  `storageProvider` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `gaTrackingId` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `hub` json DEFAULT NULL,
  `paginate` int DEFAULT '10',
  `url` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `certPath` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `keyPath` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `local` tinyint(1) DEFAULT NULL,
  `releaseName` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `defaultContentPackURL` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

DROP TABLE IF EXISTS `static_resource`;
CREATE TABLE `static_resource` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `sid` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `description` varchar(1023) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `url` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `key` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `mimeType` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `metadata` json DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `staticResourceType` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `parentResourceId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `componentId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `url` (`url`),
  KEY `userId` (`userId`),
  KEY `staticResourceType` (`staticResourceType`),
  KEY `parentResourceId` (`parentResourceId`),
  CONSTRAINT `static_resource_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `static_resource_ibfk_2` FOREIGN KEY (`staticResourceType`) REFERENCES `static_resource_type` (`type`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `static_resource_ibfk_3` FOREIGN KEY (`parentResourceId`) REFERENCES `static_resource` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

DROP TABLE IF EXISTS `static_resource_component`;
CREATE TABLE `static_resource_component` (
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `staticResourceId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `componentId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  PRIMARY KEY (`staticResourceId`,`componentId`),
  KEY `componentId` (`componentId`),
  CONSTRAINT `static_resource_component_ibfk_1` FOREIGN KEY (`staticResourceId`) REFERENCES `static_resource` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `static_resource_component_ibfk_2` FOREIGN KEY (`componentId`) REFERENCES `component` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

DROP TABLE IF EXISTS `static_resource_type`;
CREATE TABLE `static_resource_type` (
  `type` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`type`),
  UNIQUE KEY `type` (`type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

DROP TABLE IF EXISTS `thefeeds`;
CREATE TABLE `thefeeds` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `description` text COLLATE utf8mb4_general_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `videoId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

DROP TABLE IF EXISTS `thefeeds_fires`;
CREATE TABLE `thefeeds_fires` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `creatorId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `thefeedsId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `creatorId` (`creatorId`),
  KEY `thefeedsId` (`thefeedsId`),
  CONSTRAINT `thefeeds_fires_ibfk_1` FOREIGN KEY (`creatorId`) REFERENCES `creator` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `thefeeds_fires_ibfk_2` FOREIGN KEY (`thefeedsId`) REFERENCES `thefeeds` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `avatarId` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `inviteCode` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userRole` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `partyId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `inviteCode` (`inviteCode`),
  KEY `userRole` (`userRole`),
  KEY `partyId` (`partyId`),
  CONSTRAINT `user_ibfk_1` FOREIGN KEY (`userRole`) REFERENCES `user_role` (`role`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `user_ibfk_2` FOREIGN KEY (`partyId`) REFERENCES `party` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

DROP TABLE IF EXISTS `user_relationship`;
CREATE TABLE `user_relationship` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `relatedUserId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `userRelationshipType` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `type` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_relationship_id` (`id`),
  UNIQUE KEY `user_relationship_userId_relatedUserId_unique` (`userId`,`relatedUserId`),
  KEY `relatedUserId` (`relatedUserId`),
  KEY `userRelationshipType` (`userRelationshipType`),
  KEY `type` (`type`),
  CONSTRAINT `user_relationship_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `user_relationship_ibfk_2` FOREIGN KEY (`relatedUserId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `user_relationship_ibfk_3` FOREIGN KEY (`userRelationshipType`) REFERENCES `user_relationship_type` (`type`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `user_relationship_ibfk_4` FOREIGN KEY (`type`) REFERENCES `user_relationship_type` (`type`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

DROP TABLE IF EXISTS `user_relationship_type`;
CREATE TABLE `user_relationship_type` (
  `type` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`type`),
  UNIQUE KEY `type` (`type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

DROP TABLE IF EXISTS `user_role`;
CREATE TABLE `user_role` (
  `role` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`role`),
  UNIQUE KEY `role` (`role`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

DROP TABLE IF EXISTS `user_settings`;
CREATE TABLE `user_settings` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `microphone` int DEFAULT '50',
  `audio` int DEFAULT '50',
  `spatialAudioEnabled` tinyint(1) DEFAULT '1',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `user_settings_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `analytics` (`id`, `count`, `type`, `createdAt`, `updatedAt`) VALUES
('b75fab20-4959-11ec-80be-933bdc7376e0', 200, 'activeParties', '2021-11-19 16:57:01', '2021-11-19 16:57:01'),
('b75fab21-4959-11ec-80be-933bdc7376e0', 100, 'activeInstances', '2021-11-19 16:57:01', '2021-11-19 16:57:01'),
('b75fab22-4959-11ec-80be-933bdc7376e0', 150, 'activeLocations', '2021-11-19 16:57:01', '2021-11-19 16:57:01'),
('b75fab23-4959-11ec-80be-933bdc7376e0', 120, 'activeScenes', '2021-11-19 16:57:01', '2021-11-19 16:57:01'),
('b75fab24-4959-11ec-80be-933bdc7376e0', 110, 'channelUsers', '2021-11-19 16:57:01', '2021-11-19 16:57:01'),
('b75fab25-4959-11ec-80be-933bdc7376e0', 200, 'instanceUsers', '2021-11-19 16:57:01', '2021-11-19 16:57:01');

INSERT INTO `analyticsSetting` (`id`, `enabled`, `port`, `processInterval`, `createdAt`, `updatedAt`) VALUES
('b75a05d0-4959-11ec-80be-933bdc7376e0', 1, '3032', '30', '2021-11-19 16:57:01', '2021-11-19 16:57:01');

INSERT INTO `authentication` (`id`, `service`, `entity`, `secret`, `authStrategies`, `local`, `jwtOptions`, `bearerToken`, `callback`, `oauth`, `createdAt`, `updatedAt`) VALUES
('b7594280-4959-11ec-80be-933bdc7376e0', 'identity-provider', 'identity-provider', 'test', '\"[{\\\"jwt\\\":true},{\\\"local\\\":true},{\\\"facebook\\\":true},{\\\"github\\\":true},{\\\"google\\\":true},{\\\"linkedin\\\":true},{\\\"twitter\\\":true}]\"', '\"{\\\"usernameField\\\":\\\"email\\\",\\\"passwordField\\\":\\\"password\\\"}\"', '\"{\\\"expiresIn\\\":\\\"30 days\\\"}\"', '\"{\\\"numBytes\\\":16}\"', '\"{\\\"facebook\\\":\\\"https://127.0.0.1:3030/auth/oauth/facebook\\\",\\\"github\\\":\\\"https://127.0.0.1:3030/auth/oauth/github\\\",\\\"google\\\":\\\"https://127.0.0.1:3030/auth/oauth/google\\\",\\\"linkedin\\\":\\\"https://127.0.0.1:3000/auth/oauth/linkedin\\\",\\\"twitter\\\":\\\"https://127.0.0.1:3000/auth/oauth/twitter\\\"}\"', '\"{\\\"defaults\\\":\\\"{\\\\\\\"host\\\\\\\":\\\\\\\"127.0.0.1:3030\\\\\\\",\\\\\\\"protocol\\\\\\\":\\\\\\\"https\\\\\\\"}\\\",\\\"facebook\\\":\\\"{\\\\\\\"key\\\\\\\":\\\\\\\"262344435023143\\\\\\\",\\\\\\\"secret\\\\\\\":\\\\\\\"\\\\\\\"}\\\",\\\"github\\\":\\\"{\\\\\\\"key\\\\\\\":\\\\\\\"4b3e9e2c5fca8073809a\\\\\\\",\\\\\\\"secret\\\\\\\":\\\\\\\"\\\\\\\"}\\\",\\\"google\\\":\\\"{\\\\\\\"key\\\\\\\":\\\\\\\"502422558160-5co6malq1jaj7qnnf1jjreia2pr9jjvm.apps.googleusercontent.com\\\\\\\",\\\\\\\"secret\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"scope\\\\\\\":[\\\\\\\"profile\\\\\\\",\\\\\\\"email\\\\\\\"]}\\\",\\\"linkedin\\\":\\\"{\\\\\\\"key\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"secret\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"scope\\\\\\\":[\\\\\\\"r_liteprofile\\\\\\\",\\\\\\\"r_emailaddress\\\\\\\"]}\\\",\\\"twitter\\\":\\\"{\\\\\\\"key\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"secret\\\\\\\":\\\\\\\"\\\\\\\"}\\\"}\"', '2021-11-19 16:57:01', '2021-11-19 16:57:01');

INSERT INTO `Aws` (`id`, `keys`, `route53`, `s3`, `cloudfront`, `sms`, `createdAt`, `updatedAt`) VALUES
('b75a2ce0-4959-11ec-80be-933bdc7376e0', '\"{\\\"accessKeyId\\\":\\\"\\\",\\\"secretAccessKey\\\":\\\"\\\"}\"', '\"{\\\"hostedZoneId\\\":\\\"\\\",\\\"keys\\\":\\\"{\\\\\\\"accessKeyId\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"secretAccessKey\\\\\\\":\\\\\\\"\\\\\\\"}\\\"}\"', '\"{\\\"baseUrl\\\":\\\"https://s3.amazonaws.com\\\",\\\"staticResourceBucket\\\":\\\"creator-static-resources\\\",\\\"region\\\":\\\"us-east-1\\\",\\\"avatarDir\\\":\\\"avatars\\\",\\\"s3DevMode\\\":\\\"local\\\"}\"', '\"{\\\"domain\\\":\\\"resources.creator.xyz\\\",\\\"distributionId\\\":\\\"E3E9EQTR0OYMND\\\"}\"', '\"{\\\"accessKeyId\\\":\\\"AKIARQM6EGKHAEN2K47Y\\\",\\\"applicationId\\\":\\\"\\\",\\\"region\\\":\\\"us-east-1\\\",\\\"senderId\\\":\\\"\\\",\\\"secretAccessKey\\\":\\\"\\\"}\"', '2021-11-19 16:57:01', '2021-11-19 16:57:01');

INSERT INTO `channel_type` (`type`) VALUES
('group'),
('instance'),
('party'),
('user');

INSERT INTO `chargebeeSetting` (`id`, `url`, `apikey`, `createdAt`, `updatedAt`) VALUES
('b759b7b0-4959-11ec-80be-933bdc7376e0', 'undefined.chargebee.com', NULL, '2021-11-19 16:57:01', '2021-11-19 16:57:01');

INSERT INTO `clientSetting` (`id`, `enabled`, `logo`, `title`, `url`, `releaseName`, `createdAt`, `updatedAt`) VALUES
('b7568360-4959-11ec-80be-933bdc7376e0', 1, 'https://creator-static.s3-us-east-1.amazonaws.com/logo.png', 'Creator', 'https://127.0.0.1:3000', NULL, '2021-11-19 16:57:01', '2021-11-19 16:57:01');

INSERT INTO `collection` (`id`, `sid`, `name`, `description`, `version`, `metadata`, `isPublic`, `ownedFileIds`, `createdAt`, `updatedAt`, `userId`, `type`, `thumbnailOwnedFileId`, `locationId`) VALUES
('d4457fc0-24e4-11eb-bc2e-e7e742fb069f', 'j9o2NLiD', 'Test', NULL, 4, '{\"name\": \"Crater\"}', 1, NULL, '2020-11-12 02:54:59', '2021-11-19 16:57:01', NULL, 'scene', 'd0828450-24e4-11eb-8630-81b209daf73a', NULL);

INSERT INTO `collection_type` (`type`) VALUES
('inventory'),
('scene');

INSERT INTO `component` (`id`, `data`, `entityId`, `createdAt`, `updatedAt`, `type`) VALUES
('08cc03a0-24e9-11eb-bc2e-e7e742fb069f', '{\"far\": 1000, \"near\": 0.0025, \"type\": \"disabled\", \"color\": \"#ffffff\", \"density\": 0.0025}', '08c8a840-24e9-11eb-bc2e-e7e742fb069f', '2020-11-12 05:14:45', '2021-11-19 16:57:01', 'fog'),
('08cc03a1-24e9-11eb-bc2e-e7e742fb069f', '{\"color\": \"#aaaaaa\"}', '08c8a840-24e9-11eb-bc2e-e7e742fb069f', '2020-11-12 05:14:45', '2021-11-19 16:57:01', 'background'),
('08cc03a2-24e9-11eb-bc2e-e7e742fb069f', '{\"mediaVolume\": 0.5, \"mediaMaxDistance\": 10000, \"mediaRefDistance\": 1, \"avatarMaxDistance\": 10000, \"avatarRefDistance\": 1, \"mediaConeOuterGain\": 0, \"mediaDistanceModel\": \"inverse\", \"mediaRolloffFactor\": 1, \"usePositionalAudio\": false, \"avatarDistanceModel\": \"inverse\", \"avatarRolloffFactor\": 2, \"mediaConeInnerAngle\": 360, \"mediaConeOuterAngle\": 0}', '08c8a840-24e9-11eb-bc2e-e7e742fb069f', '2020-11-12 05:14:45', '2021-11-19 16:57:01', 'audio-settings'),
('08cc03ab-24e9-11eb-bc2e-e7e742fb069f', '{\"scale\": {\"x\": 1, \"y\": 1, \"z\": 1}, \"position\": {\"x\": 0, \"y\": 5, \"z\": 10}, \"rotation\": {\"x\": -0.4636, \"y\": 0, \"z\": 0}}', '08c8a843-24e9-11eb-bc2e-e7e742fb069f', '2020-11-12 05:14:45', '2021-11-19 16:57:01', 'transform'),
('08cc03ac-24e9-11eb-bc2e-e7e742fb069f', '{\"visible\": true}', '08c8a843-24e9-11eb-bc2e-e7e742fb069f', '2020-11-12 05:14:45', '2021-11-19 16:57:01', 'visible'),
('08cc03ad-24e9-11eb-bc2e-e7e742fb069f', '{}', '08c8a843-24e9-11eb-bc2e-e7e742fb069f', '2020-11-12 05:14:45', '2021-11-19 16:57:01', 'scene-preview-camera'),
('08cc03b4-24e9-11eb-bc2e-e7e742fb069f', '{\"scale\": {\"x\": 1, \"y\": 1, \"z\": 1}, \"position\": {\"x\": 0, \"y\": 0, \"z\": 0}, \"rotation\": {\"x\": 0, \"y\": 0, \"z\": 0}}', '08c8a846-24e9-11eb-bc2e-e7e742fb069f', '2020-11-12 05:14:45', '2021-11-19 16:57:01', 'transform'),
('08cc03b5-24e9-11eb-bc2e-e7e742fb069f', '{\"visible\": true}', '08c8a846-24e9-11eb-bc2e-e7e742fb069f', '2020-11-12 05:14:45', '2021-11-19 16:57:01', 'visible'),
('08cc03b6-24e9-11eb-bc2e-e7e742fb069f', '{\"azimuth\": 0.2333333333333333, \"distance\": 8000, \"rayleigh\": 0.82, \"luminance\": 1.055, \"turbidity\": 6.09, \"inclination\": 0.10471975511965978, \"mieCoefficient\": 0.043, \"mieDirectionalG\": 0.8}', '08c8a846-24e9-11eb-bc2e-e7e742fb069f', '2020-11-12 05:14:45', '2021-11-19 16:57:01', 'skybox'),
('08cc03b7-24e9-11eb-bc2e-e7e742fb069f', '{\"scale\": {\"x\": 1, \"y\": 1, \"z\": 1}, \"position\": {\"x\": 0, \"y\": 0, \"z\": 0}, \"rotation\": {\"x\": 0, \"y\": 0, \"z\": 0}}', '1B698482-C15A-4CEC-9247-03873520DF70', '2020-11-12 05:14:45', '2021-11-19 16:57:01', 'transform'),
('08cc03b8-24e9-11eb-bc2e-e7e742fb069f', '{\"visible\": true}', '1B698482-C15A-4CEC-9247-03873520DF70', '2020-11-12 05:14:45', '2021-11-19 16:57:01', 'visible'),
('08cc03b9-24e9-11eb-bc2e-e7e742fb069f', '{\"color\": \"#7ed321\"}', '1B698482-C15A-4CEC-9247-03873520DF70', '2020-11-12 05:14:45', '2021-11-19 16:57:01', 'ground-plane'),
('08cc03c1-24e9-11eb-bc2e-e7e742fb069f', '{\"receive\": true}', '1B698482-C15A-4CEC-9247-03873520DF70', '2020-11-12 05:14:45', '2021-11-19 16:57:01', 'shadow'),
('08cc03c2-24e9-11eb-bc2e-e7e742fb069f', '{}', '1B698482-C15A-4CEC-9247-03873520DF70', '2020-11-12 05:14:45', '2021-11-19 16:57:01', 'walkable'),
('08cc03c3-24e9-11eb-bc2e-e7e742fb069f', '{\"scale\": {\"x\": 1, \"y\": 1, \"z\": 1}, \"position\": {\"x\": 0, \"y\": 0, \"z\": 0}, \"rotation\": {\"x\": 0, \"y\": 0, \"z\": 0}}', '1B698483-C15A-4CEC-9247-03873520DF70', '2020-11-12 05:14:45', '2021-11-19 16:57:01', 'transform'),
('08cc03c4-24e9-11eb-bc2e-e7e742fb069f', '{}', '1B698483-C15A-4CEC-9247-03873520DF70', '2020-11-12 05:14:45', '2021-11-19 16:57:01', 'spawn-point'),
('09cc03c3-24e9-11eb-bc2e-e7e742fb069f', '{\"scale\": {\"x\": 1, \"y\": 1, \"z\": 1}, \"position\": {\"x\": 0, \"y\": 0, \"z\": 0}, \"rotation\": {\"x\": 0, \"y\": 0, \"z\": 0}}', '1B698484-C15A-4CEC-9247-03873520DF71', '2020-11-12 05:14:45', '2021-11-19 16:57:01', 'transform'),
('09cc03c4-24e9-11eb-bc2e-e7e742fb069f', '{}', '1B698484-C15A-4CEC-9247-03873520DF70', '2020-11-12 05:14:45', '2021-11-19 16:57:01', 'postprocessing'),
('09cc03c4-24e9-sd1b-bc2e-e7e742fb069f', '{\"options\": {\"bakeScale\": {\"x\": 1, \"y\": 1, \"z\": 1}, \"intensity\": 10, \"lookupName\": \"EnvMap\", \"resolution\": 512, \"refreshMode\": 0, \"bakePosition\": {\"x\": 0, \"y\": 0, \"z\": 0}, \"reflectionType\": 1, \"bakePositionOffset\": {\"x\": 0, \"y\": 0, \"z\": 0}}}', '1A698484-D15A-4DED-9247-03873520DX70', '2020-11-12 05:14:45', '2021-11-19 16:57:01', 'envMap'),
('9cc03c3-24e9-11eb-bc2e-e7e742fb069f', '{\"skyColor\": \"#ffffff\", \"intensity\": 1, \"groundColor\": \"#ffffff\"}', '1B698484-C15A-4CEC-9247-03873520DF71', '2020-11-12 05:14:45', '2021-11-19 16:57:01', 'hemisphere-light');

INSERT INTO `component_type` (`type`) VALUES
('ambient-light'),
('animation'),
('audio-settings'),
('background'),
('box-collider'),
('camera'),
('cursor'),
('debug'),
('device-orientation-permission-ui'),
('embedded'),
('fog'),
('geometry'),
('gltf-model'),
('grid'),
('ground'),
('ground-plane'),
('hand-controls'),
('keyboard-shortcuts'),
('laser-controls'),
('light'),
('line'),
('link'),
('loading-screen'),
('look-controls'),
('networked'),
('obj-model'),
('oculus-go-controls'),
('pool'),
('position'),
('raycaster'),
('renderer'),
('rotation'),
('scale'),
('scene-preview-camera'),
('screenshot'),
('shadow'),
('skybox'),
('sound'),
('stats'),
('text'),
('tracked-controls'),
('transform'),
('visible'),
('vive-controls'),
('vive-focus-controls'),
('vr-mode-ui'),
('walkable'),
('wasd-controls'),
('windows-motion-controls');

INSERT INTO `creator` (`id`, `verified`, `isBlocked`, `steps`, `terms`, `policy`, `name`, `username`, `email`, `link`, `bio`, `twitter`, `tiktok`, `snap`, `instagram`, `createdAt`, `updatedAt`, `userId`, `avatarId`) VALUES
('2bad6300-4c2f-11ec-acb1-abcd5087bd20', 0, 0, 0, 0, 0, 'User366', 'user_366', '', '', '', '', '', '', '', '2021-11-23 07:30:02', '2021-11-23 07:30:02', '2b889cf0-4c2f-11ec-acb1-abcd5087bd20', NULL),
('e8c628b0-4c2e-11ec-acb1-abcd5087bd20', 0, 0, 0, 0, 0, 'User434', 'user_434', '', '', '', '', '', '', '', '2021-11-23 07:28:09', '2021-11-23 07:28:09', 'dc280370-4c2a-11ec-87ba-c7145c7fc1f9', NULL);

INSERT INTO `emailSetting` (`id`, `smtp`, `from`, `subject`, `smsNameCharacterLimit`, `createdAt`, `updatedAt`) VALUES
('b758cd50-4959-11ec-80be-933bdc7376e0', '\"{\\\"host\\\":\\\"email-smtp.us-east-1.amazonaws.com\\\",\\\"port\\\":465,\\\"secure\\\":true,\\\"auth\\\":\\\"{\\\\\\\"user\\\\\\\":\\\\\\\"AKIARQM6EGKHMXLVZEOP\\\\\\\",\\\\\\\"pass\\\\\\\":\\\\\\\"test\\\\\\\"}\\\"}\"', 'noreply <info@login.creator.xyz>', '\"{\\\"login\\\":\\\"Creator login link\\\",\\\"friend\\\":\\\"Creator friend request\\\",\\\"group\\\":\\\"Creator group invitation\\\",\\\"party\\\":\\\"Creator party invitation\\\"}\"', 20, '2021-11-19 16:57:01', '2021-11-19 16:57:01');

INSERT INTO `entity` (`id`, `entityId`, `name`, `parent`, `collectionId`, `index`, `createdAt`, `updatedAt`) VALUES
('08c8a840-24e9-11eb-bc2e-e7e742fb069f', '2266BED7-6CC4-48A6-95DD-9BCD3CF9EAFC', 'crater', NULL, 'd4457fc0-24e4-11eb-bc2e-e7e742fb069f', NULL, '2020-11-12 05:14:45', '2021-11-19 16:57:01'),
('08c8a843-24e9-11eb-bc2e-e7e742fb069f', '1463EAC0-883F-493A-9A33-6757CC8FF48B', 'scene preview camera', '2266BED7-6CC4-48A6-95DD-9BCD3CF9EAFC', 'd4457fc0-24e4-11eb-bc2e-e7e742fb069f', 2, '2020-11-12 05:14:45', '2021-11-19 16:57:01'),
('08c8a846-24e9-11eb-bc2e-e7e742fb069f', 'ED0888E7-4032-4DD9-9B43-59B02ECCCB7E', 'Skybox', '2266BED7-6CC4-48A6-95DD-9BCD3CF9EAFC', 'd4457fc0-24e4-11eb-bc2e-e7e742fb069f', 5, '2020-11-12 05:14:45', '2021-11-19 16:57:01'),
('1A698484-D15A-4DED-9247-03873520DX70', '1A698484-D15A-4DED-9247-03873520DX70', 'Cubemap bake', '2266BED7-6CC4-48A6-95DD-9BCD3CF9EAFC', 'd4457fc0-24e4-11eb-bc2e-e7e742fb069f', 9, '2020-11-12 05:14:45', '2021-11-19 16:57:01'),
('1B698482-C15A-4CEC-9247-03873520DF70', '1B698482-C15A-4CEC-9247-03873520DF70', 'Ground Plane', '2266BED7-6CC4-48A6-95DD-9BCD3CF9EAFC', 'd4457fc0-24e4-11eb-bc2e-e7e742fb069f', 5, '2020-11-12 05:14:45', '2021-11-19 16:57:01'),
('1B698483-C15A-4CEC-9247-03873520DF70', '1B698483-C15A-4CEC-9247-03873520DF70', 'Spawn Point', '2266BED7-6CC4-48A6-95DD-9BCD3CF9EAFC', 'd4457fc0-24e4-11eb-bc2e-e7e742fb069f', 6, '2020-11-12 05:14:45', '2021-11-19 16:57:01'),
('1B698484-C15A-4CEC-9247-03873520DF70', '1B698484-C15A-4CEC-9247-03873520DF70', 'Post Processing', '2266BED7-6CC4-48A6-95DD-9BCD3CF9EAFC', 'd4457fc0-24e4-11eb-bc2e-e7e742fb069f', 7, '2020-11-12 05:14:45', '2021-11-19 16:57:01'),
('1B698484-C15A-4CEC-9247-03873520DF71', '1B698484-C15A-4CEC-9247-03873520DF71', 'Hemisphere Light', '2266BED7-6CC4-48A6-95DD-9BCD3CF9EAFC', 'd4457fc0-24e4-11eb-bc2e-e7e742fb069f', 8, '2020-11-12 05:14:45', '2021-11-19 16:57:01');

INSERT INTO `feed` (`id`, `title`, `description`, `viewsCount`, `featured`, `featuredByAdmin`, `createdAt`, `updatedAt`, `creatorId`, `videoId`, `previewId`) VALUES
('10844300-4c2f-11ec-acb1-abcd5087bd20', '1', '', 0, 0, 0, '2021-11-23 07:29:16', '2021-11-23 07:29:16', 'e8c628b0-4c2e-11ec-acb1-abcd5087bd20', '10342730-4c2f-11ec-acb1-abcd5087bd20', '1079e2c0-4c2f-11ec-acb1-abcd5087bd20');

INSERT INTO `feed_fires` (`id`, `createdAt`, `updatedAt`, `creatorId`, `feedId`) VALUES
('4b332660-4c2f-11ec-acb1-abcd5087bd20', '2021-11-23 07:30:55', '2021-11-23 07:30:55', '2bad6300-4c2f-11ec-acb1-abcd5087bd20', '10844300-4c2f-11ec-acb1-abcd5087bd20');

INSERT INTO `gameServerSetting` (`id`, `clientHost`, `enabled`, `rtc_start_port`, `rtc_end_port`, `rtc_port_block_size`, `identifierDigits`, `local`, `domain`, `releaseName`, `port`, `mode`, `locationName`, `createdAt`, `updatedAt`) VALUES
('b7596990-4959-11ec-80be-933bdc7376e0', '127.0.0.1:3000', 1, 40000, 49999, 50, 5, 1, '00000.gameserver-test.creator.xyz', NULL, '3031', 'local', NULL, '2021-11-19 16:57:01', '2021-11-19 16:57:01');

INSERT INTO `group_user_rank` (`rank`) VALUES
('admin'),
('owner'),
('user');

INSERT INTO `identity_provider` (`id`, `token`, `password`, `isVerified`, `verifyToken`, `verifyShortToken`, `verifyExpires`, `verifyChanges`, `resetToken`, `resetExpires`, `type`, `createdAt`, `updatedAt`, `userId`) VALUES
('1007de20-495d-11ec-9c1e-0504cb482b94', '1004a9d0-495d-11ec-aae3-cd845270d297', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'guest', '2021-11-19 17:20:59', '2021-11-19 17:20:59', '1006a5a0-495d-11ec-9c1e-0504cb482b94'),
('2415b750-495a-11ec-80be-933bdc7376e0', '24114a80-495a-11ec-a8f7-1d794e7069f5', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'guest', '2021-11-19 17:00:04', '2021-11-19 17:00:04', '2413e290-495a-11ec-80be-933bdc7376e0'),
('2b8c4670-4c2f-11ec-acb1-abcd5087bd20', '2b867a10-4c2f-11ec-8b24-1117c0c73b69', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'guest', '2021-11-23 07:30:01', '2021-11-23 07:30:01', '2b889cf0-4c2f-11ec-acb1-abcd5087bd20'),
('4c257740-495e-11ec-9c1e-0504cb482b94', '4c2417b0-495e-11ec-ac6d-ab7650b3f08c', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'guest', '2021-11-19 17:29:49', '2021-11-19 17:29:49', '4c2465d0-495e-11ec-9c1e-0504cb482b94'),
('51668cf0-4c2c-11ec-ac6a-959ed8ceb31d', '33996b80-4c2b-11ec-bc52-d1d01fb263e8', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'guest', '2021-11-23 07:09:36', '2021-11-23 07:09:36', '5161f910-4c2c-11ec-ac6a-959ed8ceb31d'),
('727217e0-4c2a-11ec-87ba-c7145c7fc1f9', '7205e890-4c2a-11ec-8dfd-3ba9bcdbe1e1', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'guest', '2021-11-23 06:56:13', '2021-11-23 06:56:13', '720ee940-4c2a-11ec-87ba-c7145c7fc1f9'),
('8fd8db30-495e-11ec-9c1e-0504cb482b94', 'hailrywyoming280@gmail.com', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'email', '2021-11-19 17:31:43', '2021-11-19 17:31:43', '8fd7f0d0-495e-11ec-9c1e-0504cb482b94'),
('dc28edd0-4c2a-11ec-87ba-c7145c7fc1f9', 'onefire88888@outlook.com', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'email', '2021-11-23 06:59:10', '2021-11-23 06:59:10', 'dc280370-4c2a-11ec-87ba-c7145c7fc1f9');

INSERT INTO `invite_type` (`type`) VALUES
('friend'),
('group'),
('party');

INSERT INTO `location` (`id`, `name`, `sceneId`, `slugifiedName`, `isLobby`, `isFeatured`, `maxUsersPerInstance`, `createdAt`, `updatedAt`) VALUES
('98cbcc30-fd2d-11ea-bc7c-cd4cac9a8d61', 'Test', 'j9o2NLiD', 'test', 0, 0, 30, '2021-11-19 16:57:02', '2021-11-19 16:57:02');

INSERT INTO `location_settings` (`id`, `videoEnabled`, `audioEnabled`, `screenSharingEnabled`, `faceStreamingEnabled`, `instanceMediaChatEnabled`, `createdAt`, `updatedAt`, `locationType`, `locationId`) VALUES
('b79b7ba0-4959-11ec-80be-933bdc7376e0', 1, 0, 0, 0, 1, '2021-11-19 16:57:02', '2021-11-19 16:57:02', 'public', '98cbcc30-fd2d-11ea-bc7c-cd4cac9a8d61');

INSERT INTO `location_type` (`type`) VALUES
('private'),
('public'),
('showroom');

INSERT INTO `login_token` (`id`, `token`, `expiresAt`, `createdAt`, `updatedAt`, `identityProviderId`) VALUES
('5d09e070-495c-11ec-9c1e-0504cb482b94', 'f15196421fd971f259ec2f2f84c9eff8', '2021-11-21 17:15:58', '2021-11-19 17:15:58', '2021-11-19 17:15:58', NULL),
('612c39f0-495c-11ec-9c1e-0504cb482b94', 'a5a9df32eb66e6e6f83f04b7b7adeff6', '2021-11-21 17:16:05', '2021-11-19 17:16:05', '2021-11-19 17:16:05', NULL),
('758eb0e0-495b-11ec-9c1e-0504cb482b94', 'd101967efb30f734564ebfc9f1a6df46', '2021-11-21 17:09:30', '2021-11-19 17:09:30', '2021-11-19 17:09:30', NULL),
('8fecb150-495e-11ec-9c1e-0504cb482b94', '0e7b633d3d941e49929138481ef13c72', '2021-11-21 17:31:43', '2021-11-19 17:31:43', '2021-11-19 17:31:43', '8fd8db30-495e-11ec-9c1e-0504cb482b94'),
('90edfa70-4c2c-11ec-ac6a-959ed8ceb31d', '80bfd09d152f848f988b511632f5af1f', '2021-11-25 07:11:23', '2021-11-23 07:11:23', '2021-11-23 07:11:23', 'dc28edd0-4c2a-11ec-87ba-c7145c7fc1f9'),
('d6025d50-4960-11ec-9c1e-0504cb482b94', 'a520dca4ea0381ab20e0bed12dcb4abc', '2021-11-21 17:47:59', '2021-11-19 17:47:59', '2021-11-19 17:47:59', '8fd8db30-495e-11ec-9c1e-0504cb482b94'),
('dc544390-4c2a-11ec-87ba-c7145c7fc1f9', '665246681cb58032411cc4e46bd023c9', '2021-11-25 06:59:11', '2021-11-23 06:59:11', '2021-11-23 06:59:11', 'dc28edd0-4c2a-11ec-87ba-c7145c7fc1f9');

INSERT INTO `message_status` (`id`, `status`, `createdAt`, `updatedAt`, `messageId`, `userId`) VALUES
(1, 'unread', '2021-11-19 16:57:01', '2021-11-19 16:57:01', NULL, NULL),
(2, 'unread', '2021-11-19 16:57:01', '2021-11-19 16:57:01', NULL, NULL);

INSERT INTO `redisSetting` (`id`, `enabled`, `address`, `port`, `password`, `createdAt`, `updatedAt`) VALUES
('b759dec0-4959-11ec-80be-933bdc7376e0', 1, '127.0.0.1', '6379', NULL, '2021-11-19 16:57:01', '2021-11-19 16:57:01');

INSERT INTO `route` (`id`, `project`, `route`, `createdAt`, `updatedAt`) VALUES
('b75b6560-4959-11ec-80be-933bdc7376e0', 'theoverlay', '/', '2021-11-19 16:57:01', '2021-11-19 16:57:01'),
('b75b6561-4959-11ec-80be-933bdc7376e0', 'theoverlay', '/login', '2021-11-19 16:57:01', '2021-11-19 16:57:01'),
('b75b6562-4959-11ec-80be-933bdc7376e0', 'theoverlay', '/admin', '2021-11-19 16:57:01', '2021-11-19 16:57:01'),
('b75b8c70-4959-11ec-80be-933bdc7376e0', 'theoverlay', '/auth', '2021-11-19 16:57:01', '2021-11-19 16:57:01');

INSERT INTO `scope` (`id`, `createdAt`, `updatedAt`, `userId`, `groupId`, `type`) VALUES
('10279b20-495d-11ec-9c1e-0504cb482b94', '2021-11-19 17:20:59', '2021-11-19 17:20:59', '1006a5a0-495d-11ec-9c1e-0504cb482b94', NULL, 'editor:write'),
('10279b21-495d-11ec-9c1e-0504cb482b94', '2021-11-19 17:20:59', '2021-11-19 17:20:59', '1006a5a0-495d-11ec-9c1e-0504cb482b94', NULL, 'location:read'),
('10279b22-495d-11ec-9c1e-0504cb482b94', '2021-11-19 17:20:59', '2021-11-19 17:20:59', '1006a5a0-495d-11ec-9c1e-0504cb482b94', NULL, 'location:write'),
('1027c230-495d-11ec-9c1e-0504cb482b94', '2021-11-19 17:20:59', '2021-11-19 17:20:59', '1006a5a0-495d-11ec-9c1e-0504cb482b94', NULL, 'editor:write'),
('1027c231-495d-11ec-9c1e-0504cb482b94', '2021-11-19 17:20:59', '2021-11-19 17:20:59', '1006a5a0-495d-11ec-9c1e-0504cb482b94', NULL, 'location:read'),
('1027c232-495d-11ec-9c1e-0504cb482b94', '2021-11-19 17:20:59', '2021-11-19 17:20:59', '1006a5a0-495d-11ec-9c1e-0504cb482b94', NULL, 'location:write'),
('2424ab70-495a-11ec-80be-933bdc7376e0', '2021-11-19 17:00:04', '2021-11-19 17:00:04', '2413e290-495a-11ec-80be-933bdc7376e0', NULL, 'editor:write'),
('2424ab71-495a-11ec-80be-933bdc7376e0', '2021-11-19 17:00:04', '2021-11-19 17:00:04', '2413e290-495a-11ec-80be-933bdc7376e0', NULL, 'location:read'),
('2424ab72-495a-11ec-80be-933bdc7376e0', '2021-11-19 17:00:04', '2021-11-19 17:00:04', '2413e290-495a-11ec-80be-933bdc7376e0', NULL, 'location:write'),
('2424ab73-495a-11ec-80be-933bdc7376e0', '2021-11-19 17:00:04', '2021-11-19 17:00:04', '2413e290-495a-11ec-80be-933bdc7376e0', NULL, 'editor:write'),
('2424ab74-495a-11ec-80be-933bdc7376e0', '2021-11-19 17:00:04', '2021-11-19 17:00:04', '2413e290-495a-11ec-80be-933bdc7376e0', NULL, 'location:read'),
('2424ab75-495a-11ec-80be-933bdc7376e0', '2021-11-19 17:00:04', '2021-11-19 17:00:04', '2413e290-495a-11ec-80be-933bdc7376e0', NULL, 'location:write'),
('2b9260f0-4c2f-11ec-acb1-abcd5087bd20', '2021-11-23 07:30:01', '2021-11-23 07:30:01', '2b889cf0-4c2f-11ec-acb1-abcd5087bd20', NULL, 'editor:write'),
('2b9260f1-4c2f-11ec-acb1-abcd5087bd20', '2021-11-23 07:30:01', '2021-11-23 07:30:01', '2b889cf0-4c2f-11ec-acb1-abcd5087bd20', NULL, 'location:read'),
('2b9260f2-4c2f-11ec-acb1-abcd5087bd20', '2021-11-23 07:30:01', '2021-11-23 07:30:01', '2b889cf0-4c2f-11ec-acb1-abcd5087bd20', NULL, 'location:write'),
('2b928800-4c2f-11ec-acb1-abcd5087bd20', '2021-11-23 07:30:01', '2021-11-23 07:30:01', '2b889cf0-4c2f-11ec-acb1-abcd5087bd20', NULL, 'editor:write'),
('2b928801-4c2f-11ec-acb1-abcd5087bd20', '2021-11-23 07:30:01', '2021-11-23 07:30:01', '2b889cf0-4c2f-11ec-acb1-abcd5087bd20', NULL, 'location:read'),
('2b928802-4c2f-11ec-acb1-abcd5087bd20', '2021-11-23 07:30:01', '2021-11-23 07:30:01', '2b889cf0-4c2f-11ec-acb1-abcd5087bd20', NULL, 'location:write'),
('4c6f2a70-495e-11ec-9c1e-0504cb482b94', '2021-11-19 17:29:49', '2021-11-19 17:29:49', '4c2465d0-495e-11ec-9c1e-0504cb482b94', NULL, 'editor:write'),
('4c6f2a71-495e-11ec-9c1e-0504cb482b94', '2021-11-19 17:29:49', '2021-11-19 17:29:49', '4c2465d0-495e-11ec-9c1e-0504cb482b94', NULL, 'location:read'),
('4c6f2a72-495e-11ec-9c1e-0504cb482b94', '2021-11-19 17:29:49', '2021-11-19 17:29:49', '4c2465d0-495e-11ec-9c1e-0504cb482b94', NULL, 'location:write'),
('4c6f2a73-495e-11ec-9c1e-0504cb482b94', '2021-11-19 17:29:49', '2021-11-19 17:29:49', '4c2465d0-495e-11ec-9c1e-0504cb482b94', NULL, 'editor:write'),
('4c6f2a74-495e-11ec-9c1e-0504cb482b94', '2021-11-19 17:29:49', '2021-11-19 17:29:49', '4c2465d0-495e-11ec-9c1e-0504cb482b94', NULL, 'location:read'),
('4c6f2a75-495e-11ec-9c1e-0504cb482b94', '2021-11-19 17:29:49', '2021-11-19 17:29:49', '4c2465d0-495e-11ec-9c1e-0504cb482b94', NULL, 'location:write'),
('51781920-4c2c-11ec-ac6a-959ed8ceb31d', '2021-11-23 07:09:37', '2021-11-23 07:09:37', '5161f910-4c2c-11ec-ac6a-959ed8ceb31d', NULL, 'editor:write'),
('51781921-4c2c-11ec-ac6a-959ed8ceb31d', '2021-11-23 07:09:37', '2021-11-23 07:09:37', '5161f910-4c2c-11ec-ac6a-959ed8ceb31d', NULL, 'location:read'),
('51781922-4c2c-11ec-ac6a-959ed8ceb31d', '2021-11-23 07:09:37', '2021-11-23 07:09:37', '5161f910-4c2c-11ec-ac6a-959ed8ceb31d', NULL, 'location:write'),
('51784030-4c2c-11ec-ac6a-959ed8ceb31d', '2021-11-23 07:09:37', '2021-11-23 07:09:37', '5161f910-4c2c-11ec-ac6a-959ed8ceb31d', NULL, 'editor:write'),
('51784031-4c2c-11ec-ac6a-959ed8ceb31d', '2021-11-23 07:09:37', '2021-11-23 07:09:37', '5161f910-4c2c-11ec-ac6a-959ed8ceb31d', NULL, 'location:read'),
('51784032-4c2c-11ec-ac6a-959ed8ceb31d', '2021-11-23 07:09:37', '2021-11-23 07:09:37', '5161f910-4c2c-11ec-ac6a-959ed8ceb31d', NULL, 'location:write'),
('72e1c9a0-4c2a-11ec-87ba-c7145c7fc1f9', '2021-11-23 06:56:14', '2021-11-23 06:56:14', '720ee940-4c2a-11ec-87ba-c7145c7fc1f9', NULL, 'editor:write'),
('72e1f0b0-4c2a-11ec-87ba-c7145c7fc1f9', '2021-11-23 06:56:14', '2021-11-23 06:56:14', '720ee940-4c2a-11ec-87ba-c7145c7fc1f9', NULL, 'location:read'),
('72e1f0b1-4c2a-11ec-87ba-c7145c7fc1f9', '2021-11-23 06:56:14', '2021-11-23 06:56:14', '720ee940-4c2a-11ec-87ba-c7145c7fc1f9', NULL, 'location:write'),
('72e1f0b2-4c2a-11ec-87ba-c7145c7fc1f9', '2021-11-23 06:56:14', '2021-11-23 06:56:14', '720ee940-4c2a-11ec-87ba-c7145c7fc1f9', NULL, 'editor:write'),
('72e1f0b3-4c2a-11ec-87ba-c7145c7fc1f9', '2021-11-23 06:56:14', '2021-11-23 06:56:14', '720ee940-4c2a-11ec-87ba-c7145c7fc1f9', NULL, 'location:read'),
('72e217c0-4c2a-11ec-87ba-c7145c7fc1f9', '2021-11-23 06:56:14', '2021-11-23 06:56:14', '720ee940-4c2a-11ec-87ba-c7145c7fc1f9', NULL, 'location:write'),
('758e14a0-495b-11ec-9c1e-0504cb482b94', '2021-11-19 17:09:30', '2021-11-19 17:09:30', NULL, NULL, 'editor:write'),
('758e3bb0-495b-11ec-9c1e-0504cb482b94', '2021-11-19 17:09:30', '2021-11-19 17:09:30', NULL, NULL, 'location:read'),
('758e3bb1-495b-11ec-9c1e-0504cb482b94', '2021-11-19 17:09:30', '2021-11-19 17:09:30', NULL, NULL, 'location:write'),
('8fec3c20-495e-11ec-9c1e-0504cb482b94', '2021-11-19 17:31:43', '2021-11-19 17:31:43', '8fd7f0d0-495e-11ec-9c1e-0504cb482b94', NULL, 'editor:write'),
('8fec6330-495e-11ec-9c1e-0504cb482b94', '2021-11-19 17:31:43', '2021-11-19 17:31:43', '8fd7f0d0-495e-11ec-9c1e-0504cb482b94', NULL, 'location:read'),
('8fec6331-495e-11ec-9c1e-0504cb482b94', '2021-11-19 17:31:43', '2021-11-19 17:31:43', '8fd7f0d0-495e-11ec-9c1e-0504cb482b94', NULL, 'location:write'),
('dc507300-4c2a-11ec-87ba-c7145c7fc1f9', '2021-11-23 06:59:11', '2021-11-23 06:59:11', 'dc280370-4c2a-11ec-87ba-c7145c7fc1f9', NULL, 'editor:write'),
('dc507301-4c2a-11ec-87ba-c7145c7fc1f9', '2021-11-23 06:59:11', '2021-11-23 06:59:11', 'dc280370-4c2a-11ec-87ba-c7145c7fc1f9', NULL, 'location:read'),
('dc507302-4c2a-11ec-87ba-c7145c7fc1f9', '2021-11-23 06:59:11', '2021-11-23 06:59:11', 'dc280370-4c2a-11ec-87ba-c7145c7fc1f9', NULL, 'location:write');

INSERT INTO `scopeType` (`type`, `createdAt`, `updatedAt`) VALUES
('bot:read', '2021-11-19 16:57:01', '2021-11-19 16:57:01'),
('bot:write', '2021-11-19 16:57:01', '2021-11-19 16:57:01'),
('contentPacks:read', '2021-11-19 16:57:01', '2021-11-19 16:57:01'),
('contentPacks:write', '2021-11-19 16:57:01', '2021-11-19 16:57:01'),
('editor:write', '2021-11-19 16:57:01', '2021-11-19 16:57:01'),
('globalAvatars:read', '2021-11-19 16:57:01', '2021-11-19 16:57:01'),
('globalAvatars:write', '2021-11-19 16:57:01', '2021-11-19 16:57:01'),
('groups:read', '2021-11-19 16:57:01', '2021-11-19 16:57:01'),
('groups:write', '2021-11-19 16:57:01', '2021-11-19 16:57:01'),
('instance:read', '2021-11-19 16:57:01', '2021-11-19 16:57:01'),
('instance:write', '2021-11-19 16:57:01', '2021-11-19 16:57:01'),
('invite:read', '2021-11-19 16:57:01', '2021-11-19 16:57:01'),
('location:read', '2021-11-19 16:57:01', '2021-11-19 16:57:01'),
('location:write', '2021-11-19 16:57:01', '2021-11-19 16:57:01'),
('party:read', '2021-11-19 16:57:01', '2021-11-19 16:57:01'),
('party:write', '2021-11-19 16:57:01', '2021-11-19 16:57:01'),
('projects:read', '2021-11-19 16:57:01', '2021-11-19 16:57:01'),
('projects:write', '2021-11-19 16:57:01', '2021-11-19 16:57:01'),
('routes:read', '2021-11-19 16:57:01', '2021-11-19 16:57:01'),
('routes:write', '2021-11-19 16:57:01', '2021-11-19 16:57:01'),
('scene:read', '2021-11-19 16:57:01', '2021-11-19 16:57:01'),
('scene:write', '2021-11-19 16:57:01', '2021-11-19 16:57:01'),
('static_resource:read', '2021-11-19 16:57:01', '2021-11-19 16:57:01'),
('static_resource:write', '2021-11-19 16:57:01', '2021-11-19 16:57:01'),
('user:read', '2021-11-19 16:57:01', '2021-11-19 16:57:01'),
('user:write', '2021-11-19 16:57:01', '2021-11-19 16:57:01');

INSERT INTO `serverSetting` (`id`, `hostName`, `serverEnabled`, `serverMode`, `port`, `clientHost`, `rootDirectory`, `publicDirectory`, `nodeModulesDirectory`, `localStorageProvider`, `performDryRun`, `storageProvider`, `gaTrackingId`, `hub`, `paginate`, `url`, `certPath`, `keyPath`, `local`, `releaseName`, `defaultContentPackURL`, `createdAt`, `updatedAt`) VALUES
('b756aa70-4959-11ec-80be-933bdc7376e0', NULL, NULL, NULL, '3030', '127.0.0.1:3000', '/Volumes/DATA/5_new_work/XR/StandardCreative/standard-feathers-git/packages/server', '/Volumes/DATA/5_new_work/XR/StandardCreative/standard-feathers-git/packages/server/public', '/Volumes/DATA/5_new_work/XR/StandardCreative/standard-feathers-git/packages/server-core/src/node_modules', '127.0.0.1:8642', 0, 'local', NULL, '\"{\\\"endpoint\\\":\\\"https://creator.xyz\\\"}\"', 100, 'https://127.0.0.1:3030', '/Volumes/DATA/5_new_work/XR/StandardCreative/standard-feathers-git/certs/cert.pem', '/Volumes/DATA/5_new_work/XR/StandardCreative/standard-feathers-git/certs/key.pem', 1, NULL, NULL, '2021-11-19 16:57:01', '2021-11-19 16:57:01');

INSERT INTO `static_resource` (`id`, `sid`, `name`, `description`, `url`, `key`, `mimeType`, `metadata`, `createdAt`, `updatedAt`, `userId`, `staticResourceType`, `parentResourceId`, `componentId`) VALUES
('10342730-4c2f-11ec-acb1-abcd5087bd20', 'kny4Dg2l', NULL, NULL, 'https://127.0.0.1:8642/10342730-4c2f-11ec-acb1-abcd5087bd20/1.png', '10342730-4c2f-11ec-acb1-abcd5087bd20/1.png', 'image/png', NULL, '2021-11-23 07:29:16', '2021-11-23 07:29:16', 'dc280370-4c2a-11ec-87ba-c7145c7fc1f9', NULL, NULL, NULL),
('1079e2c0-4c2f-11ec-acb1-abcd5087bd20', '8qesYnhJ', NULL, NULL, 'https://127.0.0.1:8642/1079e2c0-4c2f-11ec-acb1-abcd5087bd20/1.png', '1079e2c0-4c2f-11ec-acb1-abcd5087bd20/1.png', 'image/png', NULL, '2021-11-23 07:29:16', '2021-11-23 07:29:16', 'dc280370-4c2a-11ec-87ba-c7145c7fc1f9', NULL, NULL, NULL),
('b78e5c40-4959-11ec-80be-933bdc7376e0', 'zroZp4vJ', 'Allison', NULL, '/models/avatars/Allison.glb', 'avatars/Allison.glb', NULL, NULL, '2021-11-19 16:57:02', '2021-11-19 16:57:02', NULL, 'avatar', NULL, NULL),
('b78eaa60-4959-11ec-80be-933bdc7376e0', '0Hel_n_y', 'Allison', NULL, '/static/Allison.png', 'avatars/Allison.png', NULL, NULL, '2021-11-19 16:57:02', '2021-11-19 16:57:02', NULL, 'user-thumbnail', NULL, NULL),
('b78f1f90-4959-11ec-80be-933bdc7376e0', '5BXy1KRo', 'Cornelius', NULL, '/models/avatars/Cornelius.glb', 'avatars/Cornelius.glb', NULL, NULL, '2021-11-19 16:57:02', '2021-11-19 16:57:02', NULL, 'avatar', NULL, NULL),
('b78f6db0-4959-11ec-80be-933bdc7376e0', 'lrLIksx8', 'Cornelius', NULL, '/static/Cornelius.png', 'avatars/Cornelius.png', NULL, NULL, '2021-11-19 16:57:02', '2021-11-19 16:57:02', NULL, 'user-thumbnail', NULL, NULL),
('b78fbbd0-4959-11ec-80be-933bdc7376e0', 'pak_UrBC', 'James_ReadyPlayerMe', NULL, '/models/avatars/James_ReadyPlayerMe.glb', 'avatars/James_ReadyPlayerMe.glb', NULL, NULL, '2021-11-19 16:57:02', '2021-11-19 16:57:02', NULL, 'avatar', NULL, NULL),
('b78fe2e0-4959-11ec-80be-933bdc7376e0', 'sQj1sbkJ', 'James_ReadyPlayerMe', NULL, '/static/James_ReadyPlayerMe.png', 'avatars/James_ReadyPlayerMe.png', NULL, NULL, '2021-11-19 16:57:02', '2021-11-19 16:57:02', NULL, 'user-thumbnail', NULL, NULL),
('b79009f0-4959-11ec-80be-933bdc7376e0', '_o_f3wZ3', 'Jamie', NULL, '/models/avatars/Jamie.glb', 'avatars/Jamie.glb', NULL, NULL, '2021-11-19 16:57:02', '2021-11-19 16:57:02', NULL, 'avatar', NULL, NULL),
('b7903100-4959-11ec-80be-933bdc7376e0', '0kGYRiML', 'Jamie', NULL, '/static/Jamie.png', 'avatars/Jamie.png', NULL, NULL, '2021-11-19 16:57:02', '2021-11-19 16:57:02', NULL, 'user-thumbnail', NULL, NULL),
('b7905810-4959-11ec-80be-933bdc7376e0', 'XJiJ-RTM', 'Mogrid', NULL, '/models/avatars/Mogrid.glb', 'avatars/Mogrid.glb', NULL, NULL, '2021-11-19 16:57:02', '2021-11-19 16:57:02', NULL, 'avatar', NULL, NULL),
('b790cd40-4959-11ec-80be-933bdc7376e0', 'uPyv3RT3', 'Mogrid', NULL, '/static/Mogrid.png', 'avatars/Mogrid.png', NULL, NULL, '2021-11-19 16:57:02', '2021-11-19 16:57:02', NULL, 'user-thumbnail', NULL, NULL),
('b790f450-4959-11ec-80be-933bdc7376e0', 'eEAhCJS0', 'Warrior', NULL, '/models/avatars/Warrior.glb', 'avatars/Warrior.glb', NULL, NULL, '2021-11-19 16:57:02', '2021-11-19 16:57:02', NULL, 'avatar', NULL, NULL),
('b7911b60-4959-11ec-80be-933bdc7376e0', 'd1RN5bP6', 'Warrior', NULL, '/static/Warrior.png', 'avatars/Warrior.png', NULL, NULL, '2021-11-19 16:57:02', '2021-11-19 16:57:02', NULL, 'user-thumbnail', NULL, NULL),
('b7914270-4959-11ec-80be-933bdc7376e0', '2cf0Q4vP', 'Zaris', NULL, '/models/avatars/Zaris.glb', 'avatars/Zaris.glb', NULL, NULL, '2021-11-19 16:57:02', '2021-11-19 16:57:02', NULL, 'avatar', NULL, NULL),
('b7916980-4959-11ec-80be-933bdc7376e0', 'xFaGF9wD', 'Zaris', NULL, '/static/Zaris.png', 'avatars/Zaris.png', NULL, NULL, '2021-11-19 16:57:02', '2021-11-19 16:57:02', NULL, 'user-thumbnail', NULL, NULL),
('d0828450-24e4-11eb-8630-81b209daf73a', 'j9o2NLiD', NULL, NULL, 'https://resources.theoverlay.io/c4efdc80-c9f0-11eb-b166-5b4d0f7861e6.jpeg', 'd0828450-24e4-11eb-8630-81b209daf73a.jpeg', 'image/jpeg', NULL, '2020-11-12 04:44:37', '2021-11-19 16:57:02', NULL, NULL, NULL, NULL);

INSERT INTO `static_resource_type` (`type`) VALUES
('audio'),
('avatar'),
('data'),
('image'),
('json'),
('model3d'),
('script'),
('user-thumbnail'),
('video');

INSERT INTO `user` (`id`, `name`, `avatarId`, `inviteCode`, `createdAt`, `updatedAt`, `userRole`, `partyId`) VALUES
('1006a5a0-495d-11ec-9c1e-0504cb482b94', 'Guest #257', 'Razer6', NULL, '2021-11-19 17:20:59', '2021-11-19 17:20:59', 'guest', NULL),
('2413e290-495a-11ec-80be-933bdc7376e0', 'Guest #813', 'Razer2', NULL, '2021-11-19 17:00:04', '2021-11-19 17:00:04', 'guest', NULL),
('2b889cf0-4c2f-11ec-acb1-abcd5087bd20', 'Guest #617', 'Razer6', NULL, '2021-11-23 07:30:01', '2021-11-23 07:30:01', 'guest', NULL),
('4c2465d0-495e-11ec-9c1e-0504cb482b94', 'Guest #670', 'Razer5', NULL, '2021-11-19 17:29:49', '2021-11-19 17:29:49', 'guest', NULL),
('5161f910-4c2c-11ec-ac6a-959ed8ceb31d', 'Guest #501', 'Razer3', NULL, '2021-11-23 07:09:36', '2021-11-23 07:09:36', 'guest', NULL),
('720ee940-4c2a-11ec-87ba-c7145c7fc1f9', 'Guest #103', 'Razer1', NULL, '2021-11-23 06:56:13', '2021-11-23 06:56:13', 'guest', NULL),
('8fd7f0d0-495e-11ec-9c1e-0504cb482b94', 'Guest #771', 'Razer4', '8c978223', '2021-11-19 17:31:43', '2021-11-19 17:31:43', 'admin', NULL),
('b75c76d0-4959-11ec-80be-933bdc7376e0', 'Hayden Daugherty', 'Razer1', NULL, '2021-02-26 04:00:00', '2021-11-19 16:57:01', NULL, NULL),
('b75c9de0-4959-11ec-80be-933bdc7376e0', 'Keara Senger', 'Razer1', NULL, '2021-02-26 04:00:00', '2021-11-19 16:57:01', NULL, NULL),
('b75c9de1-4959-11ec-80be-933bdc7376e0', 'Waldo Reynolds', 'Razer1', NULL, '2021-02-26 04:00:00', '2021-11-19 16:57:01', NULL, NULL),
('dc280370-4c2a-11ec-87ba-c7145c7fc1f9', 'Guest #292', 'Razer3', 'd733279c', '2021-11-23 06:59:10', '2021-11-23 06:59:10', 'admin', NULL);

INSERT INTO `user_relationship_type` (`type`) VALUES
('blocked'),
('blocking'),
('friend'),
('requested');

INSERT INTO `user_role` (`role`) VALUES
('admin'),
('guest'),
('location-admin'),
('moderator'),
('user');

INSERT INTO `user_settings` (`id`, `microphone`, `audio`, `spatialAudioEnabled`, `createdAt`, `updatedAt`, `userId`) VALUES
('2b9df9b0-4c2f-11ec-acb1-abcd5087bd20', 50, 50, 1, '2021-11-23 07:30:02', '2021-11-23 07:30:02', '2b889cf0-4c2f-11ec-acb1-abcd5087bd20'),
('b77fb640-4959-11ec-80be-933bdc7376e0', 50, 50, 1, '2021-11-19 16:57:02', '2021-11-19 16:57:02', 'b75c76d0-4959-11ec-80be-933bdc7376e0'),
('b7800460-4959-11ec-80be-933bdc7376e0', 50, 50, 1, '2021-11-19 16:57:02', '2021-11-19 16:57:02', 'b75c9de0-4959-11ec-80be-933bdc7376e0'),
('b7805280-4959-11ec-80be-933bdc7376e0', 50, 50, 1, '2021-11-19 16:57:02', '2021-11-19 16:57:02', 'b75c9de1-4959-11ec-80be-933bdc7376e0'),
('e8ac1100-4c2e-11ec-acb1-abcd5087bd20', 50, 50, 1, '2021-11-23 07:28:09', '2021-11-23 07:28:09', 'dc280370-4c2a-11ec-87ba-c7145c7fc1f9');



/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;