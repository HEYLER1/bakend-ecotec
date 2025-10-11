--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `roles` (`id`, `nombre`, `descripcion`) VALUES
(1, 'personal', 'Personal de servicio'),
(2, 'estudiante', 'Estudiante o voluntario ');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `usuario` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `activo` tinyint(1) DEFAULT 1,
  `nombres` varchar(100) NOT NULL,
  `apellidos` varchar(100) NOT NULL,
  `codigo` varchar(20) DEFAULT NULL,
  `role_id` int(11) NOT NULL DEFAULT 2,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_email` (`email`),
  KEY `idx_role` (`role_id`),
  CONSTRAINT `fk_user_role` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sedes`
--

CREATE TABLE `sedes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `imagen` varchar(255) DEFAULT NULL,
  `activo` tinyint(1) DEFAULT 1,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `sedes` (`id`, `nombre`, `imagen`) VALUES
(1, 'SEDE CAPILLA - ADMINISTRATIVO', ''),
(2, 'SEDE AYABACAS', '', 1),
(3, 'SEDE CAPILLA - ACADÉMICO', '' ),
(4, 'SEDE SANTA CATALINA', '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `edificios`
--

CREATE TABLE `edificios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `id_sede` int(11) NOT NULL,

  PRIMARY KEY (`id`),
  KEY `idx_sede` (`id_sede`),
  CONSTRAINT `fk_edificio_sede` FOREIGN KEY (`id_sede`) REFERENCES `sedes` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `edificios` (`id`, `nombre`, `id_sede`, ) VALUES
(101, 'Edificio Sede Capilla Administrativo', 1),
(201, 'Edificio APIAF', 2),
(202, 'Edificio APIIA', 2),
(203, 'Edificio APIER', 2),
(204, 'Edificio EPITC', 2),
(301, 'Aulas Generales', 3),
(302, 'Laboratorios Generales', 3),
(303, 'Edificio de Bienestar', 3),
(304, 'Auditorio Magno', 3),
(305, 'Campo Recreacional', 3),
(306, 'Patio en General', 3),
(401, 'Edificio Sede Santa Catalina', 4);

-- --------------------------------------------------------

CREATE TABLE `tipos_recoleccion` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `codigo` varchar(20) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_codigo` (`codigo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `tipos_recoleccion` (`id`, `codigo`, `nombre`, `descripcion`) VALUES
(1, 'pilas', 'Pilas', 'Recolección de pilas de reciclaje - 6 tipos de residuos'),
(2, 'canastillas', 'Canastillas', 'Recolección de canastillas - Solo plásticos'),
(3, 'tacho', 'Papel-ofi', 'Recolección de tacho especial - Solo papel de oficina');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `registros_personal`
-- Registros del PERSONAL DE SERVICIO (datos cuantitativos en KG)
--

CREATE TABLE `registros_personal` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fecha_registro` date NOT NULL,
  `estado` tinyint(1) DEFAULT 1,
  `id_usuario` int(11) NOT NULL,
  `id_sede` int(11) NOT NULL,
  `id_edificio` int(11) NOT NULL,
  `id_tipo_recoleccion` int(11) NOT NULL,
  `observaciones` text DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `idx_usuario` (`id_usuario`),
  KEY `idx_sede` (`id_sede`),
  KEY `idx_edificio` (`id_edificio`),
  KEY `idx_tipo_recoleccion` (`id_tipo_recoleccion`),
  KEY `idx_fecha` (`fecha_registro`),
  CONSTRAINT `fk_registro_personal_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_registro_personal_sede` FOREIGN KEY (`id_sede`) REFERENCES `sedes` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_registro_personal_edificio` FOREIGN KEY (`id_edificio`) REFERENCES `edificios` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_registro_personal_tipo` FOREIGN KEY (`id_tipo_recoleccion`) REFERENCES `tipos_recoleccion` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Detalles de reciclaje PILAS (Personal)
--

CREATE TABLE `detalles_personal_pilas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_registro` int(11) NOT NULL,
  `plasticos_kg` decimal(10,2) DEFAULT 0.00,
  `organicos_kg` decimal(10,2) DEFAULT 0.00,
  `vidrio_kg` decimal(10,2) DEFAULT 0.00,
  `metales_kg` decimal(10,2) DEFAULT 0.00,
  `papel_carton_kg` decimal(10,2) DEFAULT 0.00,
  `no_aprovechables_kg` decimal(10,2) DEFAULT 0.00,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_registro` (`id_registro`),
  CONSTRAINT `fk_detalle_personal_pilas` FOREIGN KEY (`id_registro`) REFERENCES `registros_personal` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Detalles de reciclaje CANASTILLAS (Personal)
--

CREATE TABLE `detalles_personal_canastillas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_registro` int(11) NOT NULL,
  `plasticos_kg` decimal(10,2) DEFAULT 0.00,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_registro` (`id_registro`),
  CONSTRAINT `fk_detalle_personal_canastillas` FOREIGN KEY (`id_registro`) REFERENCES `registros_personal` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Detalles de reciclaje TACHO (Personal)
--

CREATE TABLE `detalles_personal_tacho` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_registro` int(11) NOT NULL,
  `papel_kg` decimal(10,2) DEFAULT 0.00,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_registro` (`id_registro`),
  CONSTRAINT `fk_detalle_personal_tacho` FOREIGN KEY (`id_registro`) REFERENCES `registros_personal` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `registros_estudiantes`
-- Registros de ESTUDIANTES/VOLUNTARIOS (datos cualitativos SI/NO)
--

CREATE TABLE `registros_estudiantes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fecha_registro` date NOT NULL,
  `estado` tinyint(1) DEFAULT 1,
  `id_usuario` int(11) NOT NULL,
  `id_sede` int(11) NOT NULL,
  `id_edificio` int(11) NOT NULL,
  `codigo_pila` varchar(50) DEFAULT NULL,
  `observaciones` text DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `idx_usuario` (`id_usuario`),
  KEY `idx_sede` (`id_sede`),
  KEY `idx_edificio` (`id_edificio`),
  KEY `idx_fecha` (`fecha_registro`),
  KEY `idx_codigo_pila` (`codigo_pila`),
  CONSTRAINT `fk_registro_estudiante_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_registro_estudiante_sede` FOREIGN KEY (`id_sede`) REFERENCES `sedes` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_registro_estudiante_edificio` FOREIGN KEY (`id_edificio`) REFERENCES `edificios` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Detalles de verificación de segregación (Estudiantes)
-- Valores: 'si' o 'no' para cada tipo de residuo
--

CREATE TABLE `detalles_estudiante_verificacion` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_registro` int(11) NOT NULL,
  `papel_carton` enum('si','no') NOT NULL,
  `plasticos` enum('si','no') NOT NULL,
  `metales` enum('si','no') NOT NULL,
  `organicos` enum('si','no') NOT NULL,
  `vidrio` enum('si','no') NOT NULL,
  `no_aprovechables` enum('si','no') NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_registro` (`id_registro`),
  CONSTRAINT `fk_detalle_estudiante_verificacion` FOREIGN KEY (`id_registro`) REFERENCES `registros_estudiantes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Vistas para facilitar consultas
--

-- Vista para registros del personal
CREATE OR REPLACE VIEW `vista_registros_personal` AS
SELECT 
    rp.id,
    rp.fecha_registro,
    rp.estado,
    u.nombres,
    u.apellidos,
    u.email,
    u.codigo as codigo_usuario,
    s.nombre as sede,
    e.nombre as edificio,
    tr.nombre as tipo_recoleccion,
    tr.codigo as tipo_codigo,
    dp.plasticos_kg as pilas_plasticos,
    dp.organicos_kg as pilas_organicos,
    dp.vidrio_kg as pilas_vidrio,
    dp.metales_kg as pilas_metales,
    dp.papel_carton_kg as pilas_papel_carton,
    dp.no_aprovechables_kg as pilas_no_aprovechables,
    dc.plasticos_kg as canastillas_plasticos,
    dt.papel_kg as tacho_papel,
    rp.observaciones,
    rp.createdAt,
    rp.updatedAt
FROM registros_personal rp
INNER JOIN users u ON rp.id_usuario = u.id
INNER JOIN sedes s ON rp.id_sede = s.id
INNER JOIN edificios e ON rp.id_edificio = e.id
INNER JOIN tipos_recoleccion tr ON rp.id_tipo_recoleccion = tr.id
LEFT JOIN detalles_personal_pilas dp ON rp.id = dp.id_registro
LEFT JOIN detalles_personal_canastillas dc ON rp.id = dc.id_registro
LEFT JOIN detalles_personal_tacho dt ON rp.id = dt.id_registro;

-- Vista para registros de estudiantes
CREATE OR REPLACE VIEW `vista_registros_estudiantes` AS
SELECT 
    re.id,
    re.fecha_registro,
    re.estado,
    u.nombres,
    u.apellidos,
    u.email,
    u.codigo as codigo_usuario,
    s.nombre as sede,
    e.nombre as edificio,
    re.codigo_pila,
    dev.papel_carton,
    dev.plasticos,
    dev.metales,
    dev.organicos,
    dev.vidrio,
    dev.no_aprovechables,
    re.observaciones,
    re.createdAt,
    re.updatedAt
FROM registros_estudiantes re
INNER JOIN users u ON re.id_usuario = u.id
INNER JOIN sedes s ON re.id_sede = s.id
INNER JOIN edificios e ON re.id_edificio = e.id
LEFT JOIN detalles_estudiante_verificacion dev ON re.id = dev.id_registro;