-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Apr 03, 2025 at 02:35 AM
-- Server version: 11.5.2-MariaDB
-- PHP Version: 8.2.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `incidentes`
--

-- --------------------------------------------------------

--
-- Table structure for table `banos`
--

DROP TABLE IF EXISTS `banos`;
CREATE TABLE IF NOT EXISTS `banos` (
  `id_bano` int(11) NOT NULL AUTO_INCREMENT,
  `id_edificio` int(11) NOT NULL,
  `planta` enum('alta','baja') DEFAULT NULL,
  `tipo_bano` enum('hombre','mujer') NOT NULL,
  PRIMARY KEY (`id_bano`),
  KEY `fk_edificios` (`id_edificio`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `banos`
--

INSERT INTO `banos` (`id_bano`, `id_edificio`, `planta`, `tipo_bano`) VALUES
(1, 18, 'alta', 'hombre'),
(2, 18, 'baja', 'hombre'),
(3, 18, 'alta', 'mujer'),
(5, 20, 'baja', 'hombre'),
(8, 13, 'alta', 'mujer'),
(9, 20, 'alta', 'mujer'),
(10, 20, 'baja', 'mujer');

-- --------------------------------------------------------

--
-- Table structure for table `edificios`
--

DROP TABLE IF EXISTS `edificios`;
CREATE TABLE IF NOT EXISTS `edificios` (
  `id_edificio` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id_edificio`),
  UNIQUE KEY `nombre` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `edificios`
--

INSERT INTO `edificios` (`id_edificio`, `nombre`) VALUES
(13, '100'),
(14, '200'),
(15, '300'),
(18, '400'),
(16, '500'),
(17, '600'),
(21, 'Auditorio'),
(20, 'Centro de Información'),
(19, 'Gimnacio');

-- --------------------------------------------------------

--
-- Table structure for table `historial_incidentes`
--

DROP TABLE IF EXISTS `historial_incidentes`;
CREATE TABLE IF NOT EXISTS `historial_incidentes` (
  `id_historial` int(11) NOT NULL AUTO_INCREMENT,
  `id_incidente` int(11) NOT NULL,
  `id_usuario_responsable` int(11) DEFAULT NULL,
  `accion` varchar(50) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `fecha_registro` datetime DEFAULT NULL,
  PRIMARY KEY (`id_historial`),
  KEY `fk_incidentes` (`id_incidente`),
  KEY `fk_usuarios_responsable` (`id_usuario_responsable`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `incidentes`
--

DROP TABLE IF EXISTS `incidentes`;
CREATE TABLE IF NOT EXISTS `incidentes` (
  `id_incidente` int(11) NOT NULL AUTO_INCREMENT,
  `id_bano` int(11) DEFAULT NULL,
  `id_usuario_reporte` int(11) DEFAULT NULL,
  `descripcion` text NOT NULL,
  `img` mediumblob NOT NULL,
  `fecha_reporte` datetime NOT NULL,
  `estado_incidente` enum('pendiente','en_proceso','resuelto') NOT NULL DEFAULT 'pendiente',
  `prioridad` enum('baja','media','alta') NOT NULL,
  PRIMARY KEY (`id_incidente`),
  KEY `fk_usuarios` (`id_usuario_reporte`),
  KEY `fk_bano` (`id_bano`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;

--
-- Dumping data for table `incidentes`
--

INSERT INTO `incidentes` (`id_incidente`, `id_bano`, `id_usuario_reporte`, `descripcion`, `img`, `fecha_reporte`, `estado_incidente`, `prioridad`) VALUES
(14, 1, 4, 'Baño tapado con papel', 0x3634363238323838323031303138393435, '2025-04-03 01:22:10', 'pendiente', 'alta');

-- --------------------------------------------------------

--
-- Table structure for table `notificaciones`
--

DROP TABLE IF EXISTS `notificaciones`;
CREATE TABLE IF NOT EXISTS `notificaciones` (
  `id_notificacion` int(11) NOT NULL AUTO_INCREMENT,
  `id_incidente` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `tipo_notificacion` enum('SMS','email','app') NOT NULL,
  `mensaje` text NOT NULL,
  `fecha_envio` datetime DEFAULT NULL,
  `estado` enum('pendiente','enviado','fallido') DEFAULT NULL,
  PRIMARY KEY (`id_notificacion`),
  KEY `fk_usuario` (`id_usuario`),
  KEY `fk_incidente` (`id_incidente`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
CREATE TABLE IF NOT EXISTS `usuarios` (
  `id_usuario` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `telefono` varchar(15) NOT NULL,
  `rol` enum('administrador','encargado_limpieza') NOT NULL,
  `contrasenia` varchar(255) NOT NULL,
  `estado` enum('activo','inactivo') DEFAULT 'activo',
  PRIMARY KEY (`id_usuario`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;

--
-- Dumping data for table `usuarios`
--

INSERT INTO `usuarios` (`id_usuario`, `nombre`, `email`, `telefono`, `rol`, `contrasenia`, `estado`) VALUES
(4, 'Diego Francisco Soto Flores', 'eldieguillo87@gmail.com', '12345678', 'encargado_limpieza', 'pizzaconpiña', 'inactivo'),
(5, 'Salva Laguna', 'al22760575@ite.edu.mx', '5849265365', 'encargado_limpieza', 'atunconarroz', 'activo');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `banos`
--
ALTER TABLE `banos`
  ADD CONSTRAINT `fk_edificios` FOREIGN KEY (`id_edificio`) REFERENCES `edificios` (`id_edificio`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `historial_incidentes`
--
ALTER TABLE `historial_incidentes`
  ADD CONSTRAINT `fk_incidentes` FOREIGN KEY (`id_incidente`) REFERENCES `incidentes` (`id_incidente`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_usuarios_responsable` FOREIGN KEY (`id_usuario_responsable`) REFERENCES `usuarios` (`id_usuario`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `incidentes`
--
ALTER TABLE `incidentes`
  ADD CONSTRAINT `fk_bano` FOREIGN KEY (`id_bano`) REFERENCES `banos` (`id_bano`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_usuarios` FOREIGN KEY (`id_usuario_reporte`) REFERENCES `usuarios` (`id_usuario`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `notificaciones`
--
ALTER TABLE `notificaciones`
  ADD CONSTRAINT `fk_incidente` FOREIGN KEY (`id_incidente`) REFERENCES `incidentes` (`id_incidente`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
