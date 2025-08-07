-- phpMyAdmin SQL Dump
-- version 5.1.2
-- https://www.phpmyadmin.net/
--
-- 主機： localhost:3306
-- 產生時間： 2025-08-07 06:05:29
-- 伺服器版本： 5.7.24
-- PHP 版本： 8.3.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 資料庫: `lab_pet`
--

-- --------------------------------------------------------

--
-- 資料表結構 `userinfo`
--

CREATE TABLE `userinfo` (
  `user_id` int(10) UNSIGNED NOT NULL,
  `phonenumber` varchar(50) DEFAULT NULL,
  `icon` blob COMMENT '頭像',
  `username` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `gender` varchar(100) CHARACTER SET utf8mb4 DEFAULT NULL COMMENT '性别(M:男生;F:女生)',
  `accountemail` varchar(100) NOT NULL COMMENT '帳號',
  `city` varchar(100) DEFAULT NULL COMMENT '居住城市',
  `district` varchar(100) DEFAULT NULL COMMENT '居住區域',
  `experience` varchar(100) DEFAULT NULL COMMENT '飼養經驗(N:無;Y:有)',
  `daily` varchar(1000) DEFAULT NULL COMMENT '飼主生活作息',
  `activities` varchar(1000) DEFAULT NULL COMMENT '飼主日常活動',
  `pet` varchar(1000) DEFAULT NULL COMMENT '飼養偏好',
  `pet_activities` varchar(1000) DEFAULT NULL COMMENT '寵物個性',
  `isaccount` varchar(100) DEFAULT NULL COMMENT '帳號是否刪除',
  `isblacklist` varchar(100) DEFAULT NULL COMMENT '是否為黑名單'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `userinfo`
--
ALTER TABLE `userinfo`
  ADD PRIMARY KEY (`user_id`);

--
-- 在傾印的資料表使用自動遞增(AUTO_INCREMENT)
--

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `userinfo`
--
ALTER TABLE `userinfo`
  MODIFY `user_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
