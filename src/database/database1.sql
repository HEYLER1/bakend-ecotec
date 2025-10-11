CREATE DATABASE ecoest_db
    WITH 
    OWNER = ecoest_user
    ENCODING 'UTF8'
    LC_COLLATE = 'en_US.UTF-8'
    LC_CTYPE = 'en_US.UTF-8'
    TEMPLATE template0;


-- ===============================
-- PERFIL Y OPCIONES
-- ===============================
CREATE TABLE perfil (
    id_perfil SERIAL PRIMARY KEY,
    descripcion VARCHAR(50),
    estado SMALLINT DEFAULT 1
);

CREATE TABLE opcion (
    id_opcion SERIAL PRIMARY KEY,
    descripcion VARCHAR(100),
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
    usuario VARCHAR(50) UNIQUE NOT NULL, 
    contrasena TEXT NOT NULL,           
    nombre VARCHAR(80) NOT NULL,
    apellido VARCHAR(80) NOT NULL,
    fecha_creacion TIMESTAMP DEFAULT NOW(),
    estado SMALLINT DEFAULT 1,           
    id_perfil INT NOT NULL REFERENCES perfil(id_perfil)
);

-- Subtipo: Personal
CREATE TABLE sede (
    id_sede SERIAL PRIMARY KEY,
    descripcion VARCHAR(100),
    estado SMALLINT DEFAULT 1
);

CREATE TABLE personal (
    id_usuario INT PRIMARY KEY REFERENCES usuarios(id_usuario),
    dni VARCHAR(8) UNIQUE NOT NULL,
    id_sede INT REFERENCES sede(id_sede),
	estado SMALLINT DEFAULT 1
);

-- Subtipo: Voluntario
CREATE TABLE voluntario (
    id_usuario INT PRIMARY KEY REFERENCES usuarios(id_usuario),
    codigo_mat VARCHAR(10) UNIQUE NOT NULL,
	estado SMALLINT DEFAULT 1
);

-- ===============================
-- HISTORIAL DE ACCESO
-- ===============================
CREATE TABLE historial_acceso (
    id_historial_acceso SERIAL PRIMARY KEY,
    fecha TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    id_usuario INT NOT NULL REFERENCES usuarios(id_usuario)
);

-- ===============================
-- ESTRUCTURA FÍSICA
-- ===============================
CREATE TABLE pabellon (
    id_pabellon SERIAL PRIMARY KEY,
    descripcion VARCHAR(100),
    estado SMALLINT DEFAULT 1,
    id_sede INT NOT NULL REFERENCES sede(id_sede)
);

CREATE TABLE pila_residuo (
    id_pila_residuo SERIAL PRIMARY KEY,
    descripcion VARCHAR(100),
    estado SMALLINT DEFAULT 1,
    id_pabellon INT NOT NULL REFERENCES pabellon(id_pabellon);
);

-- ===============================
-- REGISTROS DE GESTIÓN
-- ===============================
CREATE TABLE registro_kilos_personal (
    id_registro_kilos_personal SERIAL PRIMARY KEY,
    kilo_papel DECIMAL(8, 2),
    kilo_vidrio DECIMAL(8, 2),
    kilo_plastico DECIMAL(8, 2),
    kilo_organico DECIMAL(8, 2),
    kilo_metal DECIMAL(8, 2),
    kilo_no_aprovechable DECIMAL(8, 2),
    kilo_botella_canastilla DECIMAL(8, 2),
    kilo_papel_tacho_especial DECIMAL(8, 2),
    fecha_registro TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    estado SMALLINT DEFAULT 1,
    id_usuario INT NOT NULL REFERENCES usuarios(id_usuario),
    id_sede INT NOT NULL REFERENCES sede(id_sede),
    id_pabellon INT NOT NULL REFERENCES pabellon(id_pabellon);
);

CREATE TABLE registro_segregacion (
    id_registro_segregacion SERIAL PRIMARY KEY,
    papel_bien_segregado BOOLEAN,
    vidrio_bien_segregado BOOLEAN,
    plastico_bien_segregado BOOLEAN,
    organicos_bien_segregado BOOLEAN,
    metal_bien_segregado BOOLEAN,
    fecha_registro TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    estado SMALLINT DEFAULT 1,
    id_usuario INT NOT NULL REFERENCES usuarios(id_usuario),
    id_sede INT NOT NULL REFERENCES sede(id_sede),
    id_pabellon INT NOT NULL REFERENCES pabellon(id_pabellon)
    id_pila_residuo INT NOT NULL REFERENCES pila_residuo(id_pila_residuo);
);

-- Insertar datos en perfil
INSERT INTO perfil (descripcion) VALUES
('Administrador'),
('Personal'),
('Voluntario');

-- Insertar datos en la tabla sede
INSERT INTO sede (id_sede, descripcion)
VALUES
    (1, 'La Capilla - Académico'),
    (2, 'La Capilla - Administrativo'),
    (3, 'Ayabacas'),
    (4, 'Santa Catalina');


-- Insertar el administrador
INSERT INTO usuarios (usuario, contrasena, nombre, apellido, id_perfil)
VALUES (
    'admin',
    '$2b$10$lgdz.64elql2BEZT0KhasejJy567zoKRQ9VnCokSpPFEZB4M1fyAq', 
    'Administrador', 
    'Principal', 
    1
);