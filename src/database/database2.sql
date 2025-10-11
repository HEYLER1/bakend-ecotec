-- ===============================
-- BASE DE DATOS: ECOTEC-UNAJ
-- Sistema de Gestión de Reciclaje
-- PostgreSQL 12+
-- ===============================

-- Crear la base de datos
CREATE DATABASE "ecotec-unaj"
    WITH 
    ENCODING = 'UTF8'
    LC_COLLATE = 'es_PE.UTF-8'
    LC_CTYPE = 'es_PE.UTF-8'
    TEMPLATE = template0;

-- Conectar a la base de datos
\c "ecotec-unaj"

-- ===============================
-- SISTEMA DE PERMISOS Y PERFILES
-- ===============================

CREATE TABLE perfil (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    descripcion VARCHAR(255),
    activo BOOLEAN DEFAULT true
);

INSERT INTO perfil (id, nombre, descripcion, activo) VALUES
(1, 'Administrador', 'Acceso total al sistema', true),
(2, 'Personal', 'Registro de kilos de reciclaje', true),
(3, 'Estudiante', 'Verificación de segregación', true);

-- Reiniciar secuencia
SELECT setval('perfil_id_seq', (SELECT MAX(id) FROM perfil));

-- --------------------------------------------------------

CREATE TABLE opcion (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    icono VARCHAR(50),
    url VARCHAR(255),
    orden INTEGER DEFAULT 0,
    activo BOOLEAN DEFAULT true
);

INSERT INTO opcion (id, nombre, icono, url, orden, activo) VALUES
(1, 'Dashboard', 'dashboard', '/dashboard', 1, true),
(2, 'Registrar Kilos', 'weight', '/registros/kilos', 2, true),
(3, 'Verificar Segregación', 'check-circle', '/registros/verificacion', 3, true),
(4, 'Reportes', 'bar-chart', '/reportes', 4, true),
(5, 'Usuarios', 'users', '/usuarios', 5, true),
(6, 'Configuración', 'settings', '/configuracion', 6, true);

SELECT setval('opcion_id_seq', (SELECT MAX(id) FROM opcion));

-- --------------------------------------------------------

CREATE TABLE acceso (
    id_perfil INTEGER NOT NULL,
    id_opcion INTEGER NOT NULL,
    activo BOOLEAN DEFAULT true,
    PRIMARY KEY (id_perfil, id_opcion),
    CONSTRAINT fk_acceso_perfil FOREIGN KEY (id_perfil) REFERENCES perfil(id) ON DELETE CASCADE,
    CONSTRAINT fk_acceso_opcion FOREIGN KEY (id_opcion) REFERENCES opcion(id) ON DELETE CASCADE
);

-- Permisos para Administrador (todo)
INSERT INTO acceso (id_perfil, id_opcion, activo) VALUES
(1, 1, true), (1, 2, true), (1, 3, true), (1, 4, true), (1, 5, true), (1, 6, true);

-- Permisos para Personal (registro de kilos y reportes)
INSERT INTO acceso (id_perfil, id_opcion, activo) VALUES
(2, 1, true), (2, 2, true), (2, 4, true);

-- Permisos para Estudiante (verificación y reportes)
INSERT INTO acceso (id_perfil, id_opcion, activo) VALUES
(3, 1, true), (3, 3, true), (3, 4, true);

-- ===============================
-- USUARIOS Y SUBTIPOS
-- ===============================

CREATE TABLE usuario (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    activo BOOLEAN DEFAULT true,
    nombres VARCHAR(100) NOT NULL,
    apellidos VARCHAR(100) NOT NULL,
    id_perfil INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_usuario_perfil FOREIGN KEY (id_perfil) REFERENCES perfil(id)
);

-- Índices para usuario
CREATE INDEX idx_usuario_perfil ON usuario(id_perfil);
CREATE INDEX idx_usuario_username ON usuario(username);
CREATE INDEX idx_usuario_email ON usuario(email);

-- Función para actualizar updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para usuario
CREATE TRIGGER trigger_usuario_updated_at
    BEFORE UPDATE ON usuario
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- --------------------------------------------------------

CREATE TABLE sedes (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    imagen VARCHAR(255),
    activo BOOLEAN DEFAULT true
);

INSERT INTO sedes (id, nombre, imagen, activo) VALUES
(1, 'SEDE CAPILLA - ADMINISTRATIVO', '', true),
(2, 'SEDE AYABACAS', '', true),
(3, 'SEDE CAPILLA - ACADÉMICO', '', true),
(4, 'SEDE SANTA CATALINA', '', true);

SELECT setval('sedes_id_seq', (SELECT MAX(id) FROM sedes));

-- --------------------------------------------------------

CREATE TABLE personal (
    id_usuario INTEGER PRIMARY KEY,
    dni VARCHAR(8) UNIQUE NOT NULL,
    id_sede INTEGER NOT NULL,
    turno VARCHAR(10) CHECK (turno IN ('mañana', 'tarde', 'noche')),
    activo BOOLEAN DEFAULT true,
    CONSTRAINT fk_personal_usuario FOREIGN KEY (id_usuario) REFERENCES usuario(id) ON DELETE CASCADE,
    CONSTRAINT fk_personal_sede FOREIGN KEY (id_sede) REFERENCES sedes(id)
);

-- --------------------------------------------------------

CREATE TABLE estudiante (
    id_usuario INTEGER PRIMARY KEY,
    codigo VARCHAR(20) UNIQUE NOT NULL,
    carrera VARCHAR(100),
    ciclo INTEGER CHECK (ciclo >= 1 AND ciclo <= 12),
    activo BOOLEAN DEFAULT true,
    CONSTRAINT fk_estudiante_usuario FOREIGN KEY (id_usuario) REFERENCES usuario(id) ON DELETE CASCADE
);

-- ===============================
-- HISTORIAL DE ACCESOS
-- ===============================

CREATE TABLE historial_acceso (
    id SERIAL PRIMARY KEY,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    id_usuario INTEGER NOT NULL,
    ip_address VARCHAR(45),
    user_agent VARCHAR(255),
    CONSTRAINT fk_historial_usuario FOREIGN KEY (id_usuario) REFERENCES usuario(id) ON DELETE CASCADE
);

CREATE INDEX idx_historial_usuario ON historial_acceso(id_usuario);
CREATE INDEX idx_historial_fecha ON historial_acceso(fecha);

-- ===============================
-- ESTRUCTURA FÍSICA (EDIFICIOS)
-- ===============================

CREATE TABLE edificios (
    id INTEGER PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    id_sede INTEGER NOT NULL,
    activo BOOLEAN DEFAULT true,
    CONSTRAINT fk_edificio_sede FOREIGN KEY (id_sede) REFERENCES sedes(id) ON DELETE RESTRICT
);

CREATE INDEX idx_edificios_sede ON edificios(id_sede);

-- SEDE 1: CAPILLA - ADMINISTRATIVO
INSERT INTO edificios (id, nombre, id_sede, activo) VALUES
(101, 'Edificio Sede Capilla Administrativo', 1, true);

-- SEDE 2: AYABACAS
INSERT INTO edificios (id, nombre, id_sede, activo) VALUES
(201, 'Edificio APIAF', 2, true),
(202, 'Edificio APIIA', 2, true),
(203, 'Edificio APIER', 2, true),
(204, 'Edificio EPITC', 2, true);

-- SEDE 3: CAPILLA - ACADÉMICO
INSERT INTO edificios (id, nombre, id_sede, activo) VALUES
(301, 'Aulas Generales', 3, true),
(302, 'Laboratorios Generales', 3, true),
(303, 'Edificio de Bienestar', 3, true),
(304, 'Auditorio Magno', 3, true),
(305, 'Campo Recreacional', 3, true),
(306, 'Patio en General', 3, true);

-- SEDE 4: SANTA CATALINA
INSERT INTO edificios (id, nombre, id_sede, activo) VALUES
(401, 'Edificio Sede Santa Catalina', 4, true);

-- --------------------------------------------------------

CREATE TABLE pila_residuo (
    id SERIAL PRIMARY KEY,
    codigo VARCHAR(50) UNIQUE NOT NULL,
    descripcion VARCHAR(100),
    id_edificio INTEGER NOT NULL,
    activo BOOLEAN DEFAULT true,
    CONSTRAINT fk_pila_edificio FOREIGN KEY (id_edificio) REFERENCES edificios(id) ON DELETE RESTRICT
);

CREATE INDEX idx_pila_edificio ON pila_residuo(id_edificio);
CREATE INDEX idx_pila_codigo ON pila_residuo(codigo);

-- ===============================
-- TIPOS DE RECOLECCIÓN
-- ===============================

CREATE TABLE tipos_recoleccion (
    id SERIAL PRIMARY KEY,
    codigo VARCHAR(20) UNIQUE NOT NULL,
    nombre VARCHAR(50) NOT NULL,
    descripcion VARCHAR(255),
    activo BOOLEAN DEFAULT true
);

INSERT INTO tipos_recoleccion (id, codigo, nombre, descripcion, activo) VALUES
(1, 'pilas', 'Pilas', 'Recolección de pilas de reciclaje - 6 tipos de residuos', true),
(2, 'canastillas', 'Canastillas', 'Recolección de canastillas - Solo plásticos', true),
(3, 'tacho', 'Papel-ofi', 'Recolección de tacho especial - Solo papel de oficina', true);

SELECT setval('tipos_recoleccion_id_seq', (SELECT MAX(id) FROM tipos_recoleccion));

-- ===============================
-- REGISTROS DE PERSONAL
-- ===============================

CREATE TABLE registros_personal (
    id SERIAL PRIMARY KEY,
    fecha_registro DATE NOT NULL,
    estado BOOLEAN DEFAULT true,
    id_usuario INTEGER NOT NULL,
    id_sede INTEGER NOT NULL,
    id_edificio INTEGER NOT NULL,
    id_tipo_recoleccion INTEGER NOT NULL,
    observaciones TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_registro_personal_usuario FOREIGN KEY (id_usuario) REFERENCES usuario(id) ON DELETE RESTRICT,
    CONSTRAINT fk_registro_personal_sede FOREIGN KEY (id_sede) REFERENCES sedes(id) ON DELETE RESTRICT,
    CONSTRAINT fk_registro_personal_edificio FOREIGN KEY (id_edificio) REFERENCES edificios(id) ON DELETE RESTRICT,
    CONSTRAINT fk_registro_personal_tipo FOREIGN KEY (id_tipo_recoleccion) REFERENCES tipos_recoleccion(id) ON DELETE RESTRICT
);

CREATE INDEX idx_registro_personal_usuario ON registros_personal(id_usuario);
CREATE INDEX idx_registro_personal_sede ON registros_personal(id_sede);
CREATE INDEX idx_registro_personal_edificio ON registros_personal(id_edificio);
CREATE INDEX idx_registro_personal_tipo ON registros_personal(id_tipo_recoleccion);
CREATE INDEX idx_registro_personal_fecha ON registros_personal(fecha_registro);

-- Trigger para registros_personal
CREATE TRIGGER trigger_registros_personal_updated_at
    BEFORE UPDATE ON registros_personal
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- --------------------------------------------------------

CREATE TABLE detalles_personal_pilas (
    id SERIAL PRIMARY KEY,
    id_registro INTEGER UNIQUE NOT NULL,
    plasticos_kg NUMERIC(10,2) DEFAULT 0.00,
    organicos_kg NUMERIC(10,2) DEFAULT 0.00,
    vidrio_kg NUMERIC(10,2) DEFAULT 0.00,
    metales_kg NUMERIC(10,2) DEFAULT 0.00,
    papel_carton_kg NUMERIC(10,2) DEFAULT 0.00,
    no_aprovechables_kg NUMERIC(10,2) DEFAULT 0.00,
    CONSTRAINT fk_detalle_personal_pilas FOREIGN KEY (id_registro) REFERENCES registros_personal(id) ON DELETE CASCADE
);

-- --------------------------------------------------------

CREATE TABLE detalles_personal_canastillas (
    id SERIAL PRIMARY KEY,
    id_registro INTEGER UNIQUE NOT NULL,
    plasticos_kg NUMERIC(10,2) DEFAULT 0.00,
    CONSTRAINT fk_detalle_personal_canastillas FOREIGN KEY (id_registro) REFERENCES registros_personal(id) ON DELETE CASCADE
);

-- --------------------------------------------------------

CREATE TABLE detalles_personal_tacho (
    id SERIAL PRIMARY KEY,
    id_registro INTEGER UNIQUE NOT NULL,
    papel_kg NUMERIC(10,2) DEFAULT 0.00,
    CONSTRAINT fk_detalle_personal_tacho FOREIGN KEY (id_registro) REFERENCES registros_personal(id) ON DELETE CASCADE
);

-- ===============================
-- REGISTROS DE ESTUDIANTES
-- ===============================

CREATE TABLE registros_estudiantes (
    id SERIAL PRIMARY KEY,
    fecha_registro DATE NOT NULL,
    estado BOOLEAN DEFAULT true,
    id_usuario INTEGER NOT NULL,
    id_sede INTEGER NOT NULL,
    id_edificio INTEGER NOT NULL,
    id_pila_residuo INTEGER,
    observaciones TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_registro_estudiante_usuario FOREIGN KEY (id_usuario) REFERENCES usuario(id) ON DELETE RESTRICT,
    CONSTRAINT fk_registro_estudiante_sede FOREIGN KEY (id_sede) REFERENCES sedes(id) ON DELETE RESTRICT,
    CONSTRAINT fk_registro_estudiante_edificio FOREIGN KEY (id_edificio) REFERENCES edificios(id) ON DELETE RESTRICT,
    CONSTRAINT fk_registro_estudiante_pila FOREIGN KEY (id_pila_residuo) REFERENCES pila_residuo(id) ON DELETE SET NULL
);

CREATE INDEX idx_registro_estudiante_usuario ON registros_estudiantes(id_usuario);
CREATE INDEX idx_registro_estudiante_sede ON registros_estudiantes(id_sede);
CREATE INDEX idx_registro_estudiante_edificio ON registros_estudiantes(id_edificio);
CREATE INDEX idx_registro_estudiante_fecha ON registros_estudiantes(fecha_registro);
CREATE INDEX idx_registro_estudiante_pila ON registros_estudiantes(id_pila_residuo);

-- Trigger para registros_estudiantes
CREATE TRIGGER trigger_registros_estudiantes_updated_at
    BEFORE UPDATE ON registros_estudiantes
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- --------------------------------------------------------

CREATE TABLE detalles_estudiante_verificacion (
    id SERIAL PRIMARY KEY,
    id_registro INTEGER UNIQUE NOT NULL,
    papel_carton BOOLEAN NOT NULL,
    plasticos BOOLEAN NOT NULL,
    metales BOOLEAN NOT NULL,
    organicos BOOLEAN NOT NULL,
    vidrio BOOLEAN NOT NULL,
    no_aprovechables BOOLEAN NOT NULL,
    CONSTRAINT fk_detalle_estudiante_verificacion FOREIGN KEY (id_registro) REFERENCES registros_estudiantes(id) ON DELETE CASCADE
);

-- ===============================
-- VISTAS PARA CONSULTAS
-- ===============================

-- Vista para registros del personal
CREATE OR REPLACE VIEW vista_registros_personal AS
SELECT 
    rp.id,
    rp.fecha_registro,
    rp.estado,
    u.username,
    u.nombres,
    u.apellidos,
    u.email,
    p.dni,
    p.turno,
    s.nombre AS sede,
    e.nombre AS edificio,
    tr.nombre AS tipo_recoleccion,
    tr.codigo AS tipo_codigo,
    dp.plasticos_kg AS pilas_plasticos,
    dp.organicos_kg AS pilas_organicos,
    dp.vidrio_kg AS pilas_vidrio,
    dp.metales_kg AS pilas_metales,
    dp.papel_carton_kg AS pilas_papel_carton,
    dp.no_aprovechables_kg AS pilas_no_aprovechables,
    dc.plasticos_kg AS canastillas_plasticos,
    dt.papel_kg AS tacho_papel,
    rp.observaciones,
    rp.created_at,
    rp.updated_at
FROM registros_personal rp
INNER JOIN usuario u ON rp.id_usuario = u.id
INNER JOIN personal p ON u.id = p.id_usuario
INNER JOIN sedes s ON rp.id_sede = s.id
INNER JOIN edificios e ON rp.id_edificio = e.id
INNER JOIN tipos_recoleccion tr ON rp.id_tipo_recoleccion = tr.id
LEFT JOIN detalles_personal_pilas dp ON rp.id = dp.id_registro
LEFT JOIN detalles_personal_canastillas dc ON rp.id = dc.id_registro
LEFT JOIN detalles_personal_tacho dt ON rp.id = dt.id_registro;

-- Vista para registros de estudiantes
CREATE OR REPLACE VIEW vista_registros_estudiantes AS
SELECT 
    re.id,
    re.fecha_registro,
    re.estado,
    u.username,
    u.nombres,
    u.apellidos,
    u.email,
    est.codigo,
    est.carrera,
    est.ciclo,
    s.nombre AS sede,
    e.nombre AS edificio,
    pr.codigo AS codigo_pila,
    pr.descripcion AS descripcion_pila,
    dev.papel_carton,
    dev.plasticos,
    dev.metales,
    dev.organicos,
    dev.vidrio,
    dev.no_aprovechables,
    re.observaciones,
    re.created_at,
    re.updated_at
FROM registros_estudiantes re
INNER JOIN usuario u ON re.id_usuario = u.id
INNER JOIN estudiante est ON u.id = est.id_usuario
INNER JOIN sedes s ON re.id_sede = s.id
INNER JOIN edificios e ON re.id_edificio = e.id
LEFT JOIN pila_residuo pr ON re.id_pila_residuo = pr.id
LEFT JOIN detalles_estudiante_verificacion dev ON re.id = dev.id_registro;

-- Vista para usuarios con sus perfiles
CREATE OR REPLACE VIEW vista_usuarios_completa AS
SELECT 
    u.id,
    u.username,
    u.email,
    u.nombres,
    u.apellidos,
    u.activo,
    pf.nombre AS perfil,
    p.dni,
    p.turno,
    ps.nombre AS sede_personal,
    e.codigo AS codigo_estudiante,
    e.carrera,
    e.ciclo,
    u.created_at,
    u.updated_at
FROM usuario u
INNER JOIN perfil pf ON u.id_perfil = pf.id
LEFT JOIN personal p ON u.id = p.id_usuario
LEFT JOIN sedes ps ON p.id_sede = ps.id
LEFT JOIN estudiante e ON u.id = e.id_usuario;

-- ===============================
-- COMENTARIOS EN TABLAS
-- ===============================

COMMENT ON DATABASE "ecotec-unaj" IS 'Sistema de Gestión de Reciclaje - Universidad Nacional de Juliaca';
COMMENT ON TABLE perfil IS 'Perfiles de usuario del sistema (Administrador, Personal, Estudiante)';
COMMENT ON TABLE opcion IS 'Opciones del menú del sistema';
COMMENT ON TABLE acceso IS 'Control de acceso por perfil a las opciones del sistema';
COMMENT ON TABLE usuario IS 'Usuarios del sistema (base común)';
COMMENT ON TABLE personal IS 'Datos específicos del personal de servicio';
COMMENT ON TABLE estudiante IS 'Datos específicos de estudiantes/voluntarios';
COMMENT ON TABLE sedes IS 'Sedes de la universidad';
COMMENT ON TABLE edificios IS 'Edificios dentro de cada sede';
COMMENT ON TABLE pila_residuo IS 'Pilas de reciclaje identificadas por código';
COMMENT ON TABLE tipos_recoleccion IS 'Tipos de recolección: pilas, canastillas, tacho';
COMMENT ON TABLE registros_personal IS 'Registros cuantitativos (kg) realizados por personal';
COMMENT ON TABLE registros_estudiantes IS 'Registros cualitativos (verificación) realizados por estudiantes';
COMMENT ON TABLE historial_acceso IS 'Historial de inicio de sesión de usuarios';

-- ===============================
-- PERMISOS (Opcional - ajustar según usuario de BD)
-- ===============================

-- Crear rol de aplicación (opcional)
-- CREATE ROLE ecotec_app WITH LOGIN PASSWORD 'tu_password_seguro';
-- GRANT CONNECT ON DATABASE "ecotec-unaj" TO ecotec_app;
-- GRANT USAGE ON SCHEMA public TO ecotec_app;
-- GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO ecotec_app;
-- GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO ecotec_app;