-- phpMyAdmin SQL Dump
-- version 4.6.6deb5
-- https://www.phpmyadmin.net/
--
-- Φιλοξενητής: localhost:3306
-- Χρόνος δημιουργίας: 28 Μαρ 2020 στις 17:42:59
-- Έκδοση διακομιστή: 5.7.29-0ubuntu0.18.04.1
-- Έκδοση PHP: 7.2.24-0ubuntu0.18.04.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Βάση δεδομένων: `gitTasks`
--

-- --------------------------------------------------------

--
-- Δομή πίνακα για τον πίνακα `Repositories`
--

CREATE TABLE `Repositories` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(200) CHARACTER SET utf8mb4 NOT NULL,
  `path` varchar(250) CHARACTER SET utf8mb4 DEFAULT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `color` varchar(22) CHARACTER SET utf8mb4 DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Άδειασμα δεδομένων του πίνακα `Repositories`
--

INSERT INTO `Repositories` (`id`, `name`, `path`, `user_id`, `color`) VALUES
(14, 'qwdqwdqwd', 'qwdqwdqwd', 5, '#E94149'),
(15, 'wefwefwe', 'wefwef', 5, '#9b59b6'),
(16, '3r32r23r23r', '23r23r23r23r', 5, '#f1c40f'),
(17, 'wefwewefwef', 'wefwewef', 5, '#f39c12'),
(18, 'wfwefwef', 'wefwefwef', 5, '#2c3e50');

-- --------------------------------------------------------

--
-- Δομή πίνακα για τον πίνακα `Users`
--

CREATE TABLE `Users` (
  `id` int(10) UNSIGNED NOT NULL,
  `email` varchar(150) CHARACTER SET utf8mb4 NOT NULL,
  `password` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Άδειασμα δεδομένων του πίνακα `Users`
--

INSERT INTO `Users` (`id`, `email`, `password`) VALUES
(5, 'marioruci15@gmail.com', '$2b$10$jpIKS8FuzYru8/8z.b3AauATpEVFwC1Yu15NA.uuorG6NCLooLCnG'),
(6, 'mroutsi@hotmail.com', '$2b$10$55qy9jRt2WyodQpQ8ki8deRQn4Zk/Mwqi6mebKZSpZo.hZCgpFLP6'),
(7, 'asd@hirefaster.tech', '$2b$10$THcC4B.nh5Gd1DrV4sPPo.ag4hrctYh6Z.9lYvLYPBXw4CfReBuxS');

--
-- Ευρετήρια για άχρηστους πίνακες
--

--
-- Ευρετήρια για πίνακα `Repositories`
--
ALTER TABLE `Repositories`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Ευρετήρια για πίνακα `Users`
--
ALTER TABLE `Users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT για άχρηστους πίνακες
--

--
-- AUTO_INCREMENT για πίνακα `Repositories`
--
ALTER TABLE `Repositories`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;
--
-- AUTO_INCREMENT για πίνακα `Users`
--
ALTER TABLE `Users`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
