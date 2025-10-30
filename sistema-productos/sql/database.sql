-- Eliminación de tablas (para evitar conflictos al recrear)
DROP TABLE IF EXISTS productos;
DROP TABLE IF EXISTS sucursales;
DROP TABLE IF EXISTS bodegas;
DROP TABLE IF EXISTS monedas;

-- Creación de tablas
CREATE TABLE bodegas (
id SERIAL PRIMARY KEY,
nombre VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE sucursales (
id SERIAL PRIMARY KEY,
nombre VARCHAR(100) NOT NULL,
bodega_id INT NOT NULL,
CONSTRAINT fk_bodega FOREIGN KEY (bodega_id) REFERENCES bodegas(id)
);

CREATE TABLE monedas (
id SERIAL PRIMARY KEY,
nombre VARCHAR(50) NOT NULL UNIQUE,
simbolo VARCHAR(5) NOT NULL
);

CREATE TABLE productos (
id SERIAL PRIMARY KEY,
codigo VARCHAR(15) NOT NULL UNIQUE,
nombre VARCHAR(50) NOT NULL,
descripcion VARCHAR(1000) NOT NULL,
precio NUMERIC(10, 2) NOT NULL,
bodega_id INT NOT NULL,
sucursal_id INT NOT NULL,
moneda_id INT NOT NULL,
materiales VARCHAR(255) NOT NULL,
fecha_registro TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
CONSTRAINT fk_bodega_producto FOREIGN KEY (bodega_id) REFERENCES bodegas(id),
CONSTRAINT fk_sucursal_producto FOREIGN KEY (sucursal_id) REFERENCES sucursales(id),
CONSTRAINT fk_moneda_producto FOREIGN KEY (moneda_id) REFERENCES monedas(id)
);

-- Inserción de datos iniciales
INSERT INTO bodegas (nombre) VALUES ('Bodega 1'), ('Bodega 2');
INSERT INTO sucursales (nombre, bodega_id) VALUES ('Sucursal 1', 1), ('Sucursal 2', 1), ('Sucursal A', 2), ('Sucursal B', 2);
INSERT INTO monedas (nombre, simbolo) VALUES ('DÓLAR', '$'), ('PESO CHILENO', '$'), ('EURO', '€');