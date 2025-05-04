-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: May 04, 2025 at 04:12 PM
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
  `id_edificio` int(11) DEFAULT NULL,
  `genero_bano` enum('hombre','mujer') DEFAULT NULL,
  PRIMARY KEY (`id_bano`),
  KEY `id_edificio` (`id_edificio`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;

--
-- Dumping data for table `banos`
--

INSERT INTO `banos` (`id_bano`, `id_edificio`, `genero_bano`) VALUES
(1, 3, 'hombre'),
(2, 11, 'hombre'),
(3, 11, 'mujer'),
(4, 6, 'hombre'),
(5, 6, 'mujer');

-- --------------------------------------------------------

--
-- Table structure for table `edificios`
--

DROP TABLE IF EXISTS `edificios`;
CREATE TABLE IF NOT EXISTS `edificios` (
  `id_edificio` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(80) NOT NULL,
  `planta` enum('alta','baja') DEFAULT NULL,
  PRIMARY KEY (`id_edificio`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;

--
-- Dumping data for table `edificios`
--

INSERT INTO `edificios` (`id_edificio`, `nombre`, `planta`) VALUES
(2, '100', 'baja'),
(3, '100', 'alta'),
(4, '200', 'baja'),
(5, '200', 'alta'),
(6, '300', 'baja'),
(8, '400', 'baja'),
(9, '400', 'alta'),
(10, '500', 'baja'),
(11, '600', 'baja'),
(12, 'Gimnacio', 'baja'),
(13, 'Centro de Información', 'baja'),
(14, 'Auditorio', 'baja');

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
  KEY `id_incidente` (`id_incidente`),
  KEY `id_usuario_responsable` (`id_usuario_responsable`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;

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
  `estado` enum('pendiente','enviado','fallido') DEFAULT 'pendiente',
  PRIMARY KEY (`id_notificacion`),
  KEY `id_incidente` (`id_incidente`),
  KEY `id_usuario` (`id_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `reporte_incidente`
--

DROP TABLE IF EXISTS `reporte_incidente`;
CREATE TABLE IF NOT EXISTS `reporte_incidente` (
  `id_reporte` int(11) NOT NULL AUTO_INCREMENT,
  `id_bano` int(11) NOT NULL,
  `id_usuario_reporta` int(11) DEFAULT NULL,
  `id_incidente` int(11) DEFAULT NULL,
  `img` varchar(255) DEFAULT NULL,
  `descripcion` text NOT NULL,
  `fecha_reporte` datetime DEFAULT NULL,
  `estado` enum('pendiente','en_proceso','resuelto') DEFAULT 'pendiente',
  `prioridad` enum('baja','media','alta') DEFAULT 'media',
  PRIMARY KEY (`id_reporte`),
  KEY `id_bano` (`id_bano`),
  KEY `id_usuario_reporta` (`id_usuario_reporta`),
  KEY `id_incidente` (`id_incidente`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;

--
-- Dumping data for table `reporte_incidente`
--

INSERT INTO `reporte_incidente` (`id_reporte`, `id_bano`, `id_usuario_reporta`, `id_incidente`, `img`, `descripcion`, `fecha_reporte`, `estado`, `prioridad`) VALUES
(1, 1, NULL, 2, NULL, 'Falta jabón en ambos dispensadores', '2025-04-10 17:29:09', 'pendiente', 'media'),
(2, 3, NULL, 1, NULL, 'Desperdicio de papel pegado en el techo', '2025-04-10 17:33:41', 'pendiente', 'media');

-- --------------------------------------------------------

--
-- Table structure for table `tipo_incidente`
--

DROP TABLE IF EXISTS `tipo_incidente`;
CREATE TABLE IF NOT EXISTS `tipo_incidente` (
  `id_incidente` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(80) DEFAULT NULL,
  PRIMARY KEY (`id_incidente`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;

--
-- Dumping data for table `tipo_incidente`
--

INSERT INTO `tipo_incidente` (`id_incidente`, `nombre`) VALUES
(1, 'Bandalismo'),
(2, 'Falta de jabón');

-- --------------------------------------------------------

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
CREATE TABLE IF NOT EXISTS `usuarios` (
  `id_usuario` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `telefono` varchar(15) DEFAULT NULL,
  `contrasena_hash` varchar(255) NOT NULL,
  PRIMARY KEY (`id_usuario`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;

--
-- Dumping data for table `usuarios`
--

INSERT INTO `usuarios` (`id_usuario`, `nombre`, `email`, `telefono`, `contrasena_hash`) VALUES
(1, 'admin', 'admin@ejemplo.com', '123456789', 'admin123');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `banos`
--
ALTER TABLE `banos`
  ADD CONSTRAINT `banos_ibfk_1` FOREIGN KEY (`id_edificio`) REFERENCES `edificios` (`id_edificio`);

--
-- Constraints for table `historial_incidentes`
--
ALTER TABLE `historial_incidentes`
  ADD CONSTRAINT `historial_incidentes_ibfk_1` FOREIGN KEY (`id_incidente`) REFERENCES `reporte_incidente` (`id_reporte`) ON DELETE CASCADE,
  ADD CONSTRAINT `historial_incidentes_ibfk_2` FOREIGN KEY (`id_usuario_responsable`) REFERENCES `usuarios` (`id_usuario`) ON DELETE SET NULL;

--
-- Constraints for table `notificaciones`
--
ALTER TABLE `notificaciones`
  ADD CONSTRAINT `notificaciones_ibfk_1` FOREIGN KEY (`id_incidente`) REFERENCES `reporte_incidente` (`id_reporte`) ON DELETE CASCADE,
  ADD CONSTRAINT `notificaciones_ibfk_2` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`) ON DELETE CASCADE;

--
-- Constraints for table `reporte_incidente`
--
ALTER TABLE `reporte_incidente`
  ADD CONSTRAINT `reporte_incidente_ibfk_1` FOREIGN KEY (`id_bano`) REFERENCES `banos` (`id_bano`),
  ADD CONSTRAINT `reporte_incidente_ibfk_2` FOREIGN KEY (`id_usuario_reporta`) REFERENCES `usuarios` (`id_usuario`),
  ADD CONSTRAINT `reporte_incidente_ibfk_3` FOREIGN KEY (`id_incidente`) REFERENCES `tipo_incidente` (`id_incidente`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
