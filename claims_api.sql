-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 20, 2025 at 02:24 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `claims_api`
--

-- --------------------------------------------------------

--
-- Table structure for table `claims`
--

CREATE TABLE `claims` (
  `id` int(11) NOT NULL,
  `series_no` varchar(150) NOT NULL,
  `member_pin` int(11) NOT NULL,
  `date_admited` date NOT NULL,
  `status` varchar(250) NOT NULL,
  `xml_data` longtext DEFAULT NULL,
  `hci_no` varchar(200) NOT NULL,
  `date_created` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `claims`
--

INSERT INTO `claims` (`id`, `series_no`, `member_pin`, `date_admited`, `status`, `xml_data`, `hci_no`, `date_created`) VALUES
(7, '123450001', 2147483647, '2024-01-31', 'pending', '', 'H2000543', '2024-02-23');

-- --------------------------------------------------------

--
-- Table structure for table `esoa`
--

CREATE TABLE `esoa` (
  `id` int(11) NOT NULL,
  `professional_fee` double NOT NULL,
  `hci_no` varchar(100) NOT NULL,
  `date_created` timestamp NOT NULL DEFAULT current_timestamp(),
  `total_amount` double NOT NULL,
  `sum_philhealth_amount` double NOT NULL,
  `prof_philhealth_amount` double NOT NULL,
  `xml_data` longtext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `hospital_accounts`
--

CREATE TABLE `hospital_accounts` (
  `hos_id` int(11) NOT NULL,
  `hospital_name` varchar(200) NOT NULL,
  `accreditation_num` int(11) NOT NULL,
  `cypher_key` varchar(50) NOT NULL,
  `created_by` varchar(20) NOT NULL,
  `date_ceated` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `icd_codes`
--

CREATE TABLE `icd_codes` (
  `id` int(11) NOT NULL,
  `icd_10_code` varchar(10) NOT NULL,
  `description` longtext NOT NULL,
  `group` longtext NOT NULL,
  `case_rate` double NOT NULL,
  `professional_fee` double NOT NULL,
  `hci_fee` double NOT NULL,
  `date_created` timestamp NOT NULL DEFAULT current_timestamp(),
  `date_updated` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `icd_codes`
--

INSERT INTO `icd_codes` (`id`, `icd_10_code`, `description`, `group`, `case_rate`, `professional_fee`, `hci_fee`, `date_created`, `date_updated`) VALUES
(134, 'P91.3', 'Neonatal cerebral irritability', 'ABNORMAL SENSORIUM IN THE NEWBORN', 12000, 3600, 8400, '2024-06-01 02:32:54', '2024-06-01 02:32:54'),
(135, 'P91.4', 'Neonatal cerebral depression', 'ABNORMAL SENSORIUM IN THE NEWBORN', 12000, 3600, 8400, '2024-06-01 02:32:54', '2024-06-01 02:32:54'),
(136, 'P91.6', 'Hypoxic ischaemic encephalopathy of newborn', 'ABNORMAL SENSORIUM IN THE NEWBORN', 12000, 3600, 8400, '2024-06-01 02:32:54', '2024-06-01 02:32:54'),
(137, 'P91.8', 'Other specified disturbances of cerebral status of newborn', 'ABNORMAL SENSORIUM IN THE NEWBORN', 12000, 3600, 8400, '2024-06-01 02:32:54', '2024-06-01 02:32:54'),
(138, 'P91.9', 'Disturbance of cerebral status of newborn, unspecified', 'ABNORMAL SENSORIUM IN THE NEWBORN', 12000, 3600, 8400, '2024-06-01 02:32:54', '2024-06-01 02:32:54'),
(139, 'J36', 'Peritonsillar abscess; Abscess of tonsil; Peritonsillar cellulitis; Quinsy', 'ABSCESS OF RESPIRATORY TRACT', 10000, 3000, 7000, '2024-06-01 02:32:54', '2024-06-01 02:32:54'),
(140, 'J38.7', 'Other diseases of larynx; Abscess of larynx; Cellulitis of larynx; Disease NOS of larynx; Necrosis of larynx; Pachyderma of larynx; Perichondritis of larynx; Ulcer of larynx', 'ABSCESS OF RESPIRATORY TRACT', 10000, 3000, 7000, '2024-06-01 02:32:54', '2024-06-01 02:32:54'),
(141, 'J39.0', 'Retropharyngeal and parapharyngeal abscess;\r\nPeripharyngeal abscess', 'ABSCESS OF RESPIRATORY TRACT', 10000, 3000, 7000, '2024-06-01 02:32:54', '2024-06-01 02:32:54'),
(142, 'J39.1', 'Other abscess of pharynx; Cellulitis of pharynx;\r\nNasopharyngeal abscess', 'ABSCESS OF RESPIRATORY TRACT', 10000, 3000, 7000, '2024-06-01 02:32:54', '2024-06-01 02:32:54'),
(143, 'J39.2', 'Other diseases of pharynx; Cyst of pharynx or nasopharynx;\r\nOedema of pharynx or nasopharynx', 'ABSCESS OF RESPIRATORY TRACT', 10000, 3000, 7000, '2024-06-01 02:32:54', '2024-06-01 02:32:54'),
(144, 'J85.1', 'Abscess of lung with pneumonia', 'ABSCESS OF RESPIRATORY TRACT', 10000, 3000, 7000, '2024-06-01 02:32:54', '2024-06-01 02:32:54'),
(145, 'J85.2', 'Abscess of lung without pneumonia; Abscess of lung NOS', 'ABSCESS OF RESPIRATORY TRACT', 10000, 3000, 7000, '2024-06-01 02:32:54', '2024-06-01 02:32:54'),
(146, 'J85.3', 'Abscess of mediastinum', 'ABSCESS OF RESPIRATORY TRACT', 10000, 3000, 7000, '2024-06-01 02:32:54', '2024-06-01 02:32:54'),
(147, 'J86.0', 'Pyothorax with fistula', 'ABSCESS OF RESPIRATORY TRACT', 10000, 3000, 7000, '2024-06-01 02:32:54', '2024-06-01 02:32:54'),
(148, 'J86.9', 'Pyothorax without fistula; Abscess of pleura; Abscess of\r\nthorax; Empyema; Pyopneumothorax', 'ABSCESS OF RESPIRATORY TRACT', 10000, 3000, 7000, '2024-06-01 02:32:54', '2024-06-01 02:32:54'),
(149, 'A00.0', 'Cholera due to Vibrio cholerae 01, biovar cholerae', 'ACUTE GASTROENTERITIS', 6000, 1800, 4200, '2024-06-01 02:32:54', '2024-06-01 02:32:54'),
(150, 'A00.1', 'Cholera due to Vibrio cholerae 01, biovar eltor', 'ACUTE GASTROENTERITIS', 6000, 1800, 4200, '2024-06-01 02:32:54', '2024-06-01 02:32:54'),
(151, 'A00.9', 'Cholera, unspecified', 'ACUTE GASTROENTERITIS', 6000, 1800, 4200, '2024-06-01 02:32:54', '2024-06-01 02:32:54'),
(152, 'A03.0', 'Shigellosis due to Shigella dysenteriae; Group A shigellosis\r\n[Shiga-Kruse dysentery]', 'ACUTE GASTROENTERITIS', 6000, 1800, 4200, '2024-06-01 02:32:54', '2024-06-01 02:32:54'),
(153, 'A03.1', 'Shigellosis due to Shigella flexneri;Group B shigellosis', 'ACUTE GASTROENTERITIS', 6000, 1800, 4200, '2024-06-01 02:32:54', '2024-06-01 02:32:54'),
(154, 'A03.2', 'Shigellosis due to Shigella boydii; Group C shigellosis', 'ACUTE GASTROENTERITIS', 6000, 1800, 4200, '2024-06-01 02:32:54', '2024-06-01 02:32:54'),
(155, 'A03.3', 'Shigellosis due to Shigella sonnei; Group D shigellosis', 'ACUTE GASTROENTERITIS', 6000, 1800, 4200, '2024-06-01 02:32:54', '2024-06-01 02:32:54'),
(156, 'A03.8', 'Other shigellosis', 'ACUTE GASTROENTERITIS', 6000, 1800, 4200, '2024-06-01 02:32:54', '2024-06-01 02:32:54'),
(157, 'A03.9', 'Shigellosis, unspecified; ; Bacillary dysentery NOS', 'ACUTE GASTROENTERITIS', 6000, 1800, 4200, '2024-06-01 02:32:54', '2024-06-01 02:32:54'),
(158, 'A04.0', 'Enteropathogenic Escherichia coli infection', 'ACUTE GASTROENTERITIS', 6000, 1800, 4200, '2024-06-01 02:32:54', '2024-06-01 02:32:54'),
(159, 'A04.1', 'Enterotoxigenic Escherichia coli infection', 'ACUTE GASTROENTERITIS', 6000, 1800, 4200, '2024-06-01 02:32:54', '2024-06-01 02:32:54'),
(160, 'A04.2', 'Enteroinvasive Escherichia coli infection', 'ACUTE GASTROENTERITIS', 6000, 1800, 4200, '2024-06-01 02:32:54', '2024-06-01 02:32:54'),
(161, 'A04.3', 'Enterohaemorrhagic Escherichia coli infection', 'ACUTE GASTROENTERITIS', 6000, 1800, 4200, '2024-06-01 02:32:54', '2024-06-01 02:32:54'),
(162, 'A04.4', 'Other intestinal Escherichia coli infections', 'ACUTE GASTROENTERITIS', 6000, 1800, 4200, '2024-06-01 02:32:54', '2024-06-01 02:32:54'),
(163, 'A04.5', 'Campylobacter enteritis', 'ACUTE GASTROENTERITIS', 6000, 1800, 4200, '2024-06-01 02:32:54', '2024-06-01 02:32:54'),
(164, 'A04.6', 'Enteritis due to Yersinia enterocolitica', 'ACUTE GASTROENTERITIS', 6000, 1800, 4200, '2024-06-01 02:32:54', '2024-06-01 02:32:54'),
(165, 'A04.7', 'Enterocolitis due to Clostridium difficile; Foodborne intoxication by Clostridium difficile; Pseudomembranous\r\ncolitis', 'ACUTE GASTROENTERITIS', 6000, 1800, 4200, '2024-06-01 02:32:54', '2024-06-01 02:32:54'),
(166, 'A04.8', 'Other specified bacterial intestinal infections', 'ACUTE GASTROENTERITIS', 6000, 1800, 4200, '2024-06-01 02:32:54', '2024-06-01 02:32:54'),
(167, 'A04.9', 'Bacterial intestinal infection, unspecified. Bacterial enteritis NOS', 'ACUTE GASTROENTERITIS', 6000, 1800, 4200, '2024-06-01 02:32:54', '2024-06-01 02:32:54'),
(168, 'A05.0', 'Foodborne staphylococcal intoxication', 'ACUTE GASTROENTERITIS', 6000, 1800, 4200, '2024-06-01 02:32:54', '2024-06-01 02:32:54'),
(169, 'A05.2', 'Foodborne Clostridium perfringens [Clostridium welchii] intoxication. Enteritis necroticans.\r\nPig-bel', 'ACUTE GASTROENTERITIS', 6000, 1800, 4200, '2024-06-01 02:32:54', '2024-06-01 02:32:54'),
(170, 'A05.3', 'Foodborne Vibrio parahaemolyticus intoxication', 'ACUTE GASTROENTERITIS', 6000, 1800, 4200, '2024-06-01 02:32:54', '2024-06-01 02:32:54'),
(171, 'A05.4', 'Foodborne Bacillus cereus intoxication', 'ACUTE GASTROENTERITIS', 6000, 1800, 4200, '2024-06-01 02:32:54', '2024-06-01 02:32:54'),
(172, 'A05.8', 'Other specified bacterial foodborne intoxications', 'ACUTE GASTROENTERITIS', 6000, 1800, 4200, '2024-06-01 02:32:54', '2024-06-01 02:32:54'),
(173, 'A05.9', 'Bacterial foodborne intoxication, unspecified', 'ACUTE GASTROENTERITIS', 6000, 1800, 4200, '2024-06-01 02:32:54', '2024-06-01 02:32:54'),
(174, 'A07.0', 'Balantidiasis; Balantidial dysentery', 'ACUTE GASTROENTERITIS', 6000, 1800, 4200, '2024-06-01 02:32:54', '2024-06-01 02:32:54'),
(175, 'A07.1', 'Giardiasis [lambliasis]', 'ACUTE GASTROENTERITIS', 6000, 1800, 4200, '2024-06-01 02:32:54', '2024-06-01 02:32:54'),
(176, 'A07.2', 'Cryptosporidiosis', 'ACUTE GASTROENTERITIS', 6000, 1800, 4200, '2024-06-01 02:32:54', '2024-06-01 02:32:54'),
(177, 'A07.3', 'Isosporiasis; Infection due to Isospora belli and Isospora\r\nhominis; Intestinal coccidiosis; Isosporosis', 'ACUTE GASTROENTERITIS', 6000, 1800, 4200, '2024-06-01 02:32:54', '2024-06-01 02:32:54'),
(178, 'A07.8', 'Other specified protozoal intestinal diseases; Intestinal\r\ntrichomoniasis; Sarcocystosis; Sarcosporidiosis', 'ACUTE GASTROENTERITIS', 6000, 1800, 4200, '2024-06-01 02:32:54', '2024-06-01 02:32:54'),
(179, 'A07.9', 'Protozoal intestinal disease, unspecified;Flagellate\r\ndiarrhoea; Protozoal colitis;  Protozoal diarrhoea; Protozoal dysentery', 'ACUTE GASTROENTERITIS', 6000, 1800, 4200, '2024-06-01 02:32:54', '2024-06-01 02:32:54'),
(180, 'A08.0', 'Rotaviral enteritis', 'ACUTE GASTROENTERITIS', 6000, 1800, 4200, '2024-06-01 02:32:54', '2024-06-01 02:32:54'),
(181, 'A08.1', 'Acute gastroenteropathy due to Norovirus; Noroviral enteritis; Small round structured virus enteritis', 'ACUTE GASTROENTERITIS', 6000, 1800, 4200, '2024-06-01 02:32:54', '2024-06-01 02:32:54'),
(182, 'A08.2', 'Adenoviral enteritis', 'ACUTE GASTROENTERITIS', 6000, 1800, 4200, '2024-06-01 02:32:54', '2024-06-01 02:32:54'),
(183, 'A08.3', 'Other viral enteritis', 'ACUTE GASTROENTERITIS', 6000, 1800, 4200, '2024-06-01 02:32:54', '2024-06-01 02:32:54'),
(184, 'A08.4', 'Viral intestinal infection, unspecified; Viral enteritis NOS; Viral gastroenteritis NOS; Viral gastroenteropathy NOS', 'ACUTE GASTROENTERITIS', 6000, 1800, 4200, '2024-06-01 02:32:54', '2024-06-01 02:32:54'),
(185, 'A08.5', 'Other specified intestinal infections', 'ACUTE GASTROENTERITIS', 6000, 1800, 4200, '2024-06-01 02:32:54', '2024-06-01 02:32:54');

-- --------------------------------------------------------

--
-- Table structure for table `profiles`
--

CREATE TABLE `profiles` (
  `profileId` varchar(255) NOT NULL,
  `userId` varchar(255) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `zip` varchar(255) DEFAULT NULL,
  `about` varchar(255) DEFAULT NULL,
  `links` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `profiles`
--

INSERT INTO `profiles` (`profileId`, `userId`, `image`, `name`, `email`, `phone`, `address`, `country`, `state`, `city`, `zip`, `about`, `links`) VALUES
('3cfad306-6178-4e8c-a312-ca38cf368124', '1a7b7851-4755-41f3-b363-f73a3b3d12bd', NULL, NULL, 'test1', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('bde80dc5-d6d7-406e-803a-9f4c6bcb15e8', '7fbb6144-a447-4e27-a3dd-494cc449cfb8', NULL, NULL, 'test', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('d7fd2bd0-b659-41d0-8ae3-e1defcbd4668', 'a676a5ad-eaa3-4a17-9143-e26f4d8d2b3d', NULL, NULL, 'test@gmail.com', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `rvs_codes`
--

CREATE TABLE `rvs_codes` (
  `rvs_code` varchar(50) NOT NULL,
  `description` longtext NOT NULL,
  `id` int(11) NOT NULL,
  `case_rate` double NOT NULL,
  `professional_fee` double NOT NULL,
  `hci_fee` double NOT NULL,
  `date_created` timestamp NOT NULL DEFAULT current_timestamp(),
  `date_updated` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `rvs_codes`
--

INSERT INTO `rvs_codes` (`rvs_code`, `description`, `id`, `case_rate`, `professional_fee`, `hci_fee`, `date_created`, `date_updated`) VALUES
('10060', 'Incision and drainage of abscess (e.g., carbuncle, suppurative hidradenitis, cutaneous or subcutaneous abscess, cyst, furuncle, or paronychia)', 41, 3640, 840, 2800, '2024-03-17 12:44:26', '2024-03-17 12:44:26'),
('10080', 'Incision and drainage of pilonidal cyst', 42, 3640, 840, 2800, '2024-03-17 12:44:26', '2024-03-17 12:44:26'),
('10120', 'Incision and removal of foreign body, subcutaneous tissues', 43, 3640, 840, 2800, '2024-03-17 12:44:26', '2024-03-17 12:44:26'),
('10140', 'Incision and drainage of hematoma, seroma, or fluid collection', 44, 3640, 840, 2800, '2024-03-17 12:44:26', '2024-03-17 12:44:26'),
('10160', 'Puncture aspiration of abscess, hematoma, bulla, or cyst', 45, 3640, 840, 2800, '2024-03-17 12:44:26', '2024-03-17 12:44:26'),
('10180', 'Incision and drainage, complex, postoperative wound infection', 46, 5560, 1260, 4300, '2024-03-17 12:44:26', '2024-03-17 12:44:26'),
('11000', 'Debridement of extensive eczematous or infected skin', 47, 10540, 5040, 5500, '2024-03-17 12:46:41', '2024-03-17 12:46:41'),
('ewe', 'sdewewe', 56, 323, 32, 32, '2024-05-02 13:48:35', '2024-05-02 13:48:35');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userId` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userId`, `email`, `password`) VALUES
('1a7b7851-4755-41f3-b363-f73a3b3d12bd', 'test1', '$2a$10$261Ufzp1Htdz8yqbV9PQcuQSSSAqqK1ePM97jhhCXrwtaASYRBQAO'),
('7fbb6144-a447-4e27-a3dd-494cc449cfb8', 'test', '$2a$10$RCXCk5bUmIjEZunu8e4Hs.NzZSrsUEHCgvvNuHqm5cy//d4tuMP1S'),
('a676a5ad-eaa3-4a17-9143-e26f4d8d2b3d', 'test@gmail.com', '$2a$10$EqLDVJckoTxQx9WffX39VO.3OpxYONsN64jLTr7X34ic.Ls4rExDC');

-- --------------------------------------------------------

--
-- Table structure for table `user_accounts`
--

CREATE TABLE `user_accounts` (
  `id` int(11) NOT NULL,
  `username` varchar(150) NOT NULL,
  `password` varchar(250) NOT NULL,
  `email` varchar(150) NOT NULL,
  `role_id` int(11) NOT NULL,
  `accreditation_no` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_accounts`
--

INSERT INTO `user_accounts` (`id`, `username`, `password`, `email`, `role_id`, `accreditation_no`) VALUES
(1, 'testHCI', 'xxx12345', 'testHCI@gmail.com', 1, 'H92006568'),
(2, 'test2', '1234567890', 'test2@gmail.com', 1, 'H12009988');

-- --------------------------------------------------------

--
-- Table structure for table `user_roles`
--

CREATE TABLE `user_roles` (
  `id` int(11) NOT NULL,
  `role_id` int(11) NOT NULL,
  `name` varchar(150) NOT NULL,
  `desc` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_roles`
--

INSERT INTO `user_roles` (`id`, `role_id`, `name`, `desc`) VALUES
(1, 1, 'admin', 'Role is Admin'),
(2, 1, 'employee', 'Role is employee');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `claims`
--
ALTER TABLE `claims`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `esoa`
--
ALTER TABLE `esoa`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `hospital_accounts`
--
ALTER TABLE `hospital_accounts`
  ADD PRIMARY KEY (`hos_id`);

--
-- Indexes for table `icd_codes`
--
ALTER TABLE `icd_codes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `profiles`
--
ALTER TABLE `profiles`
  ADD UNIQUE KEY `profileId` (`profileId`),
  ADD UNIQUE KEY `userId` (`userId`);

--
-- Indexes for table `rvs_codes`
--
ALTER TABLE `rvs_codes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD UNIQUE KEY `userId` (`userId`);

--
-- Indexes for table `user_accounts`
--
ALTER TABLE `user_accounts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_roles`
--
ALTER TABLE `user_roles`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `claims`
--
ALTER TABLE `claims`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `esoa`
--
ALTER TABLE `esoa`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `hospital_accounts`
--
ALTER TABLE `hospital_accounts`
  MODIFY `hos_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `icd_codes`
--
ALTER TABLE `icd_codes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=186;

--
-- AUTO_INCREMENT for table `rvs_codes`
--
ALTER TABLE `rvs_codes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=57;

--
-- AUTO_INCREMENT for table `user_accounts`
--
ALTER TABLE `user_accounts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `user_roles`
--
ALTER TABLE `user_roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
