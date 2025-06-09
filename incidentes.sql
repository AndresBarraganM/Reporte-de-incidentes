use incidentes_reportec;

START TRANSACTION;


DROP TABLE IF EXISTS `banos`;
CREATE TABLE IF NOT EXISTS `banos` (
  `id_bano` int(11) NOT NULL AUTO_INCREMENT,
  `id_edificio` int(11) DEFAULT NULL,
  `genero_bano` enum('hombre','mujer') DEFAULT NULL,
  PRIMARY KEY (`id_bano`),
  KEY `id_edificio` (`id_edificio`)
);

--
-- Volcado de datos para la tabla `banos`
-- id_edificio obtenido de la tabla `edificios` segun los edificios preexistentes

INSERT INTO `banos` (`id_edificio`, `genero_bano`) VALUES
(1, 'mujer'),
(1, 'hombre'),
(2, 'mujer'),
(2, 'hombre'),
(3, 'mujer'),
(3, 'hombre'),
(4, 'mujer'),
(4, 'hombre'),
(5, 'mujer'),
(5, 'hombre'),
(6, 'mujer'),
(6, 'hombre'),
(7, 'mujer'),
(7, 'hombre'),
(8, 'mujer'),
(8, 'hombre'),
(9, 'mujer'),
(9, 'hombre'),
(10, 'mujer'),
(10, 'hombre'),
(11, 'mujer'),
(11, 'hombre'),
(12, 'mujer'),
(12, 'hombre');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `edificios`
--

DROP TABLE IF EXISTS `edificios`;
CREATE TABLE IF NOT EXISTS `edificios` (
  `id_edificio` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(80) NOT NULL,
  `planta` enum('alta','baja') DEFAULT NULL,
  PRIMARY KEY (`id_edificio`)
)

--
-- Volcado de datos para la tabla `edificios`
--

INSERT INTO `edificios` (`id_edificio`, `nombre`, `planta`) VALUES
(1,'100', 'baja'),
(2,'100', 'alta'),
(3,'200', 'baja'),
(4,'200', 'alta'),
(5,'300', 'baja'),
(6,'400', 'baja'),
(7,'400', 'alta'),
(8,'500', 'baja'),
(9,'600', 'alta'),
(10,'Gimnacio', 'baja'),
(11,'Centro de Información', 'baja'),
(12,'Auditorio', 'baja');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `historial_incidentes`
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
);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `notificaciones`
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
);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reporte_incidente`
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
);

--
-- Volcado de datos para la tabla `reporte_incidente`
--

-- INSERT INTO `reporte_incidente` (`id_reporte`, `id_bano`, `id_usuario_reporta`, `id_incidente`, `img`, `descripcion`, `fecha_reporte`, `estado`, `prioridad`) VALUES
-- (1, 1, NULL, 2, NULL, 'Falta jabón en ambos dispensadores', '2025-04-10 17:29:09', 'pendiente', 'media'),
-- (2, 3, NULL, 1, NULL, 'Desperdicio de papel pegado en el techo', '2025-04-10 17:33:41', 'pendiente', 'media');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_incidente`
--

DROP TABLE IF EXISTS `tipo_incidente`;
CREATE TABLE IF NOT EXISTS `tipo_incidente` (
  `id_incidente` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(80) DEFAULT NULL,
  PRIMARY KEY (`id_incidente`)
);

--
-- Volcado de datos para la tabla `tipo_incidente`
--

INSERT INTO `tipo_incidente` (`nombre`) VALUES
('Inmobiliaro vandalisado'),
('Baño tapado'),
('Falta de papel'),
('Fuga de agua'),
('Mal olor'),
('Falta de luz'),
('Espejo dañado'),
('Inodoro dañado'),
('Lavabo dañado'),
('Puerta dañada'),
('Falta de jabón'),
('Falta de papel higiénico'),
('Falta de toallas de papel'),
('Otro');
-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
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
);


-- --------------------------------------------------------
-- Estructura de tabla para la tabla `usuariostelegram`
-- Utilizada para almacenar los usuarios de Telegram que reciben notificaciones
DROP TABLE IF EXISTS `usuariostelegram`;
CREATE TABLE IF NOT EXISTS usuariostelegram (
  chat_id bigint(20) NOT NULL,
  nombre varchar(100) DEFAULT NULL,
  PRIMARY KEY (chat_id)
);
--
-- Volcado de datos para la tabla `usuarios`
--

-- INSERT INTO `usuarios` (`id_usuario`, `nombre`, `email`, `telefono`, `contrasena_hash`) VALUES
-- (1, 'administrador', 'admin@ejemplo.com', '123456789', '$2b$10$rneWdL8Ax0MOc5GJOmFQSelm3/1t5A27G0jWpmrAYXSYoLoIJNS9a'),
-- (2, 'salva123', 'salva@ejemplo.com', '6461234567', '$2b$10$MUqDtGwdIe/q.spMopxPT.MNkXqzsj.g3R4nV3RiT1hU1QcjHRUwu');

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `banos`
--
ALTER TABLE `banos`
  ADD CONSTRAINT `banos_ibfk_1` FOREIGN KEY (`id_edificio`) REFERENCES `edificios` (`id_edificio`);

--
-- Filtros para la tabla `historial_incidentes`
--
ALTER TABLE `historial_incidentes`
  ADD CONSTRAINT `historial_incidentes_ibfk_1` FOREIGN KEY (`id_incidente`) REFERENCES `reporte_incidente` (`id_reporte`) ON DELETE CASCADE,
  ADD CONSTRAINT `historial_incidentes_ibfk_2` FOREIGN KEY (`id_usuario_responsable`) REFERENCES `usuarios` (`id_usuario`) ON DELETE SET NULL;

--
-- Filtros para la tabla `notificaciones`
--
ALTER TABLE `notificaciones`
  ADD CONSTRAINT `notificaciones_ibfk_1` FOREIGN KEY (`id_incidente`) REFERENCES `reporte_incidente` (`id_reporte`) ON DELETE CASCADE,
  ADD CONSTRAINT `notificaciones_ibfk_2` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`) ON DELETE CASCADE;

--
-- Filtros para la tabla `reporte_incidente`
--
ALTER TABLE `reporte_incidente`
  ADD CONSTRAINT `reporte_incidente_ibfk_1` FOREIGN KEY (`id_bano`) REFERENCES `banos` (`id_bano`),
  ADD CONSTRAINT `reporte_incidente_ibfk_2` FOREIGN KEY (`id_usuario_reporta`) REFERENCES `usuarios` (`id_usuario`),
  ADD CONSTRAINT `reporte_incidente_ibfk_3` FOREIGN KEY (`id_incidente`) REFERENCES `tipo_incidente` (`id_incidente`);
COMMIT;
