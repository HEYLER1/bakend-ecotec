/*POR EL MOMENTO SOLO USAS ESTOS */

-- Crear tabla perfil
CREATE TABLE perfil (
    id_perfil SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    descripcion VARCHAR(255),
    estado SMALLINT DEFAULT 1 CHECK (estado IN (0, 1))
);

-- Insertar datos de ejemplo
INSERT INTO perfil (nombre, descripcion, estado) VALUES
('personal', 'Personal de servicio', 1),
('estudiante', 'Estudiante o voluntario', 1);

-- Crear tabla usuario
CREATE TABLE usuario (
    id_usuario SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    usuario VARCHAR(50) UNIQUE NOT NULL,
    dni VARCHAR(8) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    nombre VARCHAR(80) NOT NULL,
    apellido VARCHAR(80) NOT NULL,
    telefono VARCHAR(20) DEFAULT NULL,
    fecha_creacion TIMESTAMP DEFAULT NOW(),
    estado SMALLINT DEFAULT 1 CHECK (estado IN (0, 1)),
    perfil_id INT NOT NULL DEFAULT 2,
    CONSTRAINT fk_usuario_perfil FOREIGN KEY (perfil_id)
        REFERENCES perfil (id_perfil)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
);


-- ===============================
-- TABLA SEDE
-- ===============================
CREATE TABLE sede (
    id_sede SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    imagen VARCHAR(255),
    estado SMALLINT DEFAULT 1
);

-- ===============================
-- INSERTAR DATOS EN SEDE
-- ===============================
INSERT INTO sede (nombre, imagen) VALUES
('SEDE CAPILLA - ADMINISTRATIVO', 'capilla.jpg'),
('SEDE AYABACAS', 'ayabacas.jpg'),
('SEDE CAPILLA - ACADEMICO', 'academico.jpg'),
('SEDE SANTA CATALINA', 'santa-catalina.jpg');


/*------------------------------------------------------------------------*/











\c postgres
DROP DATABASE ecoest_db WITH (FORCE);
CREATE DATABASE ecoest_db
    WITH 
    OWNER = ecoest_user
    ENCODING 'UTF8'
    LC_COLLATE = 'en_US.UTF-8'
    LC_CTYPE = 'en_US.UTF-8'
    TEMPLATE template0;
\c ecoest_db

-- ===============================
-- PERFIL Y OPCIONES
-- ===============================
CREATE TABLE perfil (
    id_perfil SERIAL PRIMARY KEY,
    nombre VARCHAR(50),
    descripcion TEXT,
    estado SMALLINT DEFAULT 1
);

CREATE TABLE opcion (
    id_opcion SERIAL PRIMARY KEY,
    nombre VARCHAR(100),
    icono VARCHAR(50),
    url VARCHAR(255),
    estado SMALLINT DEFAULT 1
);

CREATE TABLE acceso (
    id_perfil INT NOT NULL,
    id_opcion INT NOT NULL,
    estado SMALLINT DEFAULT 1,
    PRIMARY KEY (id_perfil, id_opcion),
    FOREIGN KEY (id_perfil) REFERENCES perfil(id_perfil),
    FOREIGN KEY (id_opcion) REFERENCES opcion(id_opcion)
);

-- ===============================
-- USUARIOS Y SUBTIPOS
-- ===============================
CREATE TABLE usuarios (
    id_usuario SERIAL PRIMARY KEY,
    email VARCHAR(255),
    usuario VARCHAR(50) UNIQUE NOT NULL, 
    dni VARCHAR(8) UNIQUE,
    password TEXT NOT NULL,           
    nombre VARCHAR(80) NOT NULL,
    apellido VARCHAR(80) NOT NULL,
    telefono VARCHAR(20) DEFAULT NULL,
    fecha_creacion TIMESTAMP DEFAULT NOW(),
    estado SMALLINT DEFAULT 1,           
    id_perfil INT NOT NULL REFERENCES perfil(id_perfil)
);

-- TABLA SEDE
CREATE TABLE sede (
    id_sede SERIAL PRIMARY KEY,
    nombre VARCHAR(100),
    imagen VARCHAR(255),
    estado SMALLINT DEFAULT 1
);
CREATE TABLE pabellon (
    id_pabellon SERIAL PRIMARY KEY,
    nombre VARCHAR(100),
    estado SMALLINT DEFAULT 1,
    id_sede INT NOT NULL REFERENCES sede(id_sede)
);

CREATE TABLE pila_codigo (
    id_pila_codigo SERIAL PRIMARY KEY,
    nombre VARCHAR(100),
    estado SMALLINT DEFAULT 1,
    id_pabellon INT NOT NULL REFERENCES pabellon(id_pabellon)
);


CREATE TABLE pila_residuo(
    id_pila_residuo  SERIAL PRIMARY KEY,
    kilo_papel DECIMAL(8, 2),
    kilo_vidrio DECIMAL(8, 2),
    kilo_plastico DECIMAL(8, 2),
    kilo_organico DECIMAL(8, 2),
    kilo_metal DECIMAL(8, 2),
    kilo_no_aprovechable DECIMAL(8, 2),
    fecha_registro TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    id_usuario INT NOT NULL REFERENCES usuarios(id_usuario),
    id_sede INT NOT NULL REFERENCES sede(id_sede),
    id_pabellon INT NOT NULL REFERENCES pabellon(id_pabellon)
);

CREATE TABLE canastilla(
    id_canastilla SERIAL PRIMARY KEY,
    kilo_botella_canastilla DECIMAL(8, 2),
    fecha_registro TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    id_usuario INT NOT NULL REFERENCES usuarios(id_usuario),
    id_sede INT NOT NULL REFERENCES sede(id_sede),
    id_pabellon INT NOT NULL REFERENCES pabellon(id_pabellon)
);
CREATE TABLE papel_oficina(
    id_papel_oficina SERIAL PRIMARY KEY,
    kilo_papel_oficina DECIMAL(8, 2),
    fecha_registro TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    id_usuario INT NOT NULL REFERENCES usuarios(id_usuario),
    id_sede INT NOT NULL REFERENCES sede(id_sede),
    id_pabellon INT NOT NULL REFERENCES pabellon(id_pabellon)
);

CREATE TABLE registros_personal (
    id_registro_personal SERIAL PRIMARY KEY,
    fecha_registro DATE NOT NULL, -- ESTE SACA EL ULTIMO ALMACENA DE LA TRES TABLAS ANTERIORES DE fecha_registro
    tipo_recoleccion VARCHAR(50) NOT NULL,
    id_usuario INT NOT NULL REFERENCES usuarios(id_usuario) ON DELETE RESTRICT,
    id_sede INT NOT NULL REFERENCES sede(id_sede) ON DELETE RESTRICT,
    id_pabellon INT NOT NULL REFERENCES pabellon(id_pabellon) ON DELETE RESTRICT,
    id_referencia INTEGER NOT NULL,  -- es el id de cada tabal de residuo
    CONSTRAINT chk_tipo_recoleccion CHECK (
        tipo_recoleccion IN ('pila_residuo', 'canastilla', 'papel_oficina')
    )
);

CREATE TABLE registro_segregacion (
    id_registro_segregacion SERIAL PRIMARY KEY,
    papel_bien_segregado BOOLEAN,
    vidrio_bien_segregado BOOLEAN,
    plastico_bien_segregado BOOLEAN,
    organicos_bien_segregado BOOLEAN,
    metal_bien_segregado BOOLEAN,
    fecha_registro TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    id_usuario INT NOT NULL REFERENCES usuarios(id_usuario),
    id_sede INT NOT NULL REFERENCES sede(id_sede),
    id_pabellon INT NOT NULL REFERENCES pabellon(id_pabellon),
    id_pila_codigo INT NOT NULL REFERENCES pila_codigo(id_pila_codigo)
);

-- Insertar datos en perfil
INSERT INTO perfil (nombre) VALUES
('Administrador'),
('Personal'),
('Voluntario');

-- Insertar datos en la tabla sede
INSERT INTO sede (id_sede, nombre)
VALUES
    (1, 'La Capilla - Académico'),
    (2, 'La Capilla - Administrativo'),
    (3, 'Ayabacas'),
    (4, 'Santa Catalina');


-- Insertar el administrador
INSERT INTO usuarios (usuario, password, nombre, apellido, id_perfil)
VALUES (
    'admin',
    '$2b$10$lgdz.64elql2BEZT0KhasejJy567zoKRQ9VnCokSpPFEZB4M1fyAq', 
    'Administrador', 
    'Principal', 
    1
);
-- copntraseña: admin123 hasheado  con bcrypt

-- Insertar datos para el pabellón
INSERT INTO pabellon (nombre, id_sede)
VALUES 
    ('EPIERR',3),
    ('EPIAF',3),
    ('EPIIA',3),
    ('EPITIC',3),
    ('Área recreativa',1),
    ('Auditorio',1),
    ('Bienestar universitario',1),
    ('Aulas generales',1),
    ('Patio',1),
    ('Laboratorios generales',1),
    ('Pabellón administrativo',2),
    ('Edifico Principal',4);

-- Insertando dato en la tabal pilas (necesitamos que otro grupo nos indique eso)
INSERT INTO pila_codigo (nombre, id_pabellon) VALUES
-- Pabellón 1
('Punto de Recolección Aaaa', 1),
('Punto de Recolección Aaab', 1),
('Punto de Recolección Aaac', 1),

-- Pabellón 2
('Punto de Recolección Baaa', 2),
('Punto de Recolección Baab', 2),
('Punto de Recolección Baac', 2),

-- Pabellón 3
('Punto de Recolección Caaa', 3),
('Punto de Recolección Caab', 3),
('Punto de Recolección Caac', 3),

-- Pabellón 4
('Punto de Recolección Daaa', 4),
('Punto de Recolección Daab', 4),
('Punto de Recolección Daac', 4),

-- Pabellón 5
('Punto de Recolección Eaaa', 5),
('Punto de Recolección Eaab', 5),
('Punto de Recolección Eaac', 5),

-- Pabellón 6
('Punto de Recolección Faaa', 6),
('Punto de Recolección Faab', 6),
('Punto de Recolección Faac', 6),

-- Pabellón 7
('Punto de Recolección Gaaa', 7),
('Punto de Recolección Gaab', 7),
('Punto de Recolección Gaac', 7),

-- Pabellón 8
('Punto de Recolección Haaa', 8),
('Punto de Recolección Haab', 8),
('Punto de Recolección Haac', 8),

-- Pabellón 9
('Punto de Recolección Iaaa', 9),
('Punto de Recolección Iaab', 9),
('Punto de Recolección Iaac', 9),

-- Pabellón 10
('Punto de Recolección Jaaa', 10),
('Punto de Recolección Jaab', 10),
('Punto de Recolección Jaac', 10),

-- Pabellón 11
('Punto de Recolección Kaaa', 11),
('Punto de Recolección Kaab', 11),
('Punto de Recolección Kaac', 11),

-- Pabellón 12
('Punto de Recolección Laaa', 12),
('Punto de Recolección Laab', 12),
('Punto de Recolección Laac', 12);