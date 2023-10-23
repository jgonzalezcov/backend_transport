CREATE DATABASE easytransport  ;
--    
/**************Tablas****************/     
--Tabla transport
CREATE TABLE IF NOT EXISTS transport
(
      id SERIAL PRIMARY KEY,
      name VARCHAR (255) NOT NULL,
      last_name VARCHAR (255) NOT NULL,
      email VARCHAR (255) NOT NULL,
      phone VARCHAR (15) NOT NULL,
      address VARCHAR (255) NOT NULL,
      img VARCHAR(255) NOT NULL,
      password VARCHAR (255) NOT NULL,
      condition VARCHAR (15) NOT NULL DEFAULT 'active',
      rol VARCHAR (15) NOT NULL DEFAULT 'transport',
      total_starts INT NOT NULL DEFAULT 0,
      num_qualification INT NOT NULL DEFAULT 0,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, 
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      deleted_at BOOLEAN NOT NULL DEFAULT false
);
-- Tabla client
CREATE TABLE IF NOT EXISTS client
(
      id SERIAL PRIMARY KEY,
      name VARCHAR (255) NOT NULL,
      last_name VARCHAR (255) NOT NULL,
      email VARCHAR (255) NOT NULL,
      phone VARCHAR (15) NOT NULL,
      address VARCHAR (255) NOT NULL,
      img VARCHAR(255) NOT NULL,
      password VARCHAR (255) NOT NULL,
      condition VARCHAR (15) NOT NULL DEFAULT 'active',
      rol VARCHAR (15) NOT NULL DEFAULT 'client',
      total_starts INT NOT NULL DEFAULT 0,
      num_qualification INT NOT NULL DEFAULT 0,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, 
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      deleted_at BOOLEAN NOT NULL DEFAULT false
);
--Tabla truck
CREATE TABLE IF NOT EXISTS truck(
      id SERIAL PRIMARY KEY,
      transport_id INTEGER,
      name VARCHAR(50) NOT NULL,
      country_patent VARCHAR(50) NOT NULL,
      patent VARCHAR(50) NOT NULL,
      maken VARCHAR(50) NOT NULL,
      model VARCHAR(50) NOT NULL,
      color VARCHAR(50) NOT NULL,
      type_load VARCHAR(50) NOT NULL,
      cubic_meters SMALLINT NOT NULL,
      max_weight SMALLINT NOT NULL,
      long_load SMALLINT NOT NULL,
      wide_load SMALLINT NOT NULL, 
      high_load SMALLINT NOT NULL,
      condition VARCHAR (15) NOT NULL DEFAULT 'active',
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, 
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      deleted_at BOOLEAN NOT NULL DEFAULT false,
FOREIGN KEY ("transport_id")
REFERENCES "transport"("id")
);
--Tabla driver
CREATE TABLE IF NOT EXISTS driver(
      id SERIAL PRIMARY KEY,
      transport_id INTEGER,
      name VARCHAR (255) NOT NULL,
      last_name VARCHAR (255) NOT NULL,
      phone VARCHAR (15) NOT NULL,
      dni VARCHAR(50) NOT NULL,
      img VARCHAR(255) NOT NULL,
      status VARCHAR(50) DEFAULT 'activo' NOT NULL,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, 
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      deleted_at BOOLEAN NOT NULL DEFAULT false,
FOREIGN KEY ("transport_id")
REFERENCES "transport"("id")

);
--tabla trip 
CREATE TABLE IF NOT EXISTS trip(
      id SERIAL PRIMARY KEY,
      truck_id INTEGER,
      transport_id INTEGER,
      driver_id INTEGER,
      country_origin VARCHAR(50) NOT NULL,
      country_destiny VARCHAR(50) NOT NULL,
      city_origin VARCHAR(50) NOT NULL,
      city_destiny VARCHAR(50) NOT NULL,
      trip_date_ini DATE NOT NULL,
      time_ini TIME NOT NULL,
      time_end TIME NOT NULL,
      trip_date_end DATE NOT NULL,
      type_load_trip VARCHAR(50) NOT NULL,
      cubic_meters_trip SMALLINT NOT NULL,
      max_weight_trip SMALLINT NOT NULL,
      long_load_trip SMALLINT NOT NULL,
      wide_load_trip SMALLINT NOT NULL, 
      high_load_trip SMALLINT NOT NULL,
      status VARCHAR(50) DEFAULT 'no iniciado' NOT NULL,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, 
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      deleted_at BOOLEAN NOT NULL DEFAULT false,
FOREIGN KEY ("truck_id")
REFERENCES "truck"("id"),
FOREIGN KEY ("driver_id")
REFERENCES "driver"("id")
);

--Tabla Shipping
CREATE TABLE IF NOT EXISTS shipping(
      id SERIAL PRIMARY KEY,
      trip_id INTEGER,
      transport_id INTEGER,
      client_id INTEGER,
      description VARCHAR(255) NOT NULL,
      origin_address VARCHAR(50) NOT NULL,
      destiny_address VARCHAR(50) NOT NULL,
      type_load_shipping VARCHAR(50) NOT NULL,
      cubic_meters_Shipping SMALLINT NOT NULL,
      weight_Shipping SMALLINT NOT NULL,
      long_load_Shipping SMALLINT NOT NULL,
      wide_load_Shipping SMALLINT NOT NULL, 
      high_load_Shipping SMALLINT NOT NULL,
      status VARCHAR(50) DEFAULT 'asignado' NOT NULL,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, 
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      deleted_at BOOLEAN NOT NULL DEFAULT false,
FOREIGN KEY ("trip_id")
REFERENCES "trip"("id"),
FOREIGN KEY ("client_id")
REFERENCES "client"("id")
);
--/**************Triggers****************/
--/Creacion de trigger para colocar fecha de actualizacion de driver/
BEGIN;
CREATE OR REPLACE FUNCTION update_timestamp_driver()
RETURNS TRIGGER AS $$
BEGIN
      NEW.updated_at= now();
      RETURN NEW;
END;
$$ language 'plpgsql';
COMMIT;
CREATE TRIGGER driver_timestamp BEFORE INSERT OR UPDATE ON driver
FOR EACH ROW EXECUTE PROCEDURE update_timestamp_driver();
COMMIT;
--/Creacion de trigger para colocar fecha de actualizacion de Shipping/
BEGIN;
CREATE OR REPLACE FUNCTION update_timestamp_shipping()
RETURNS TRIGGER AS $$
BEGIN
      NEW.updated_at= now();
      RETURN NEW;
END;
$$ language 'plpgsql';
COMMIT;
CREATE TRIGGER shipping_timestamp BEFORE INSERT OR UPDATE ON shipping
FOR EACH ROW EXECUTE PROCEDURE update_timestamp_shipping();
COMMIT;
--/Creacion de trigger para colocar fecha de actualizacion de trip/
BEGIN;
CREATE OR REPLACE FUNCTION update_timestamp_trip()
RETURNS TRIGGER AS $$
BEGIN
      NEW.updated_at= now();
      RETURN NEW;
END;
$$ language 'plpgsql';
COMMIT;
CREATE TRIGGER trip_timestamp BEFORE INSERT OR UPDATE ON trip
FOR EACH ROW EXECUTE PROCEDURE update_timestamp_trip();
COMMIT;
--/Creacion de trigger para colocar fecha de actualizacion de truck/
BEGIN;
CREATE OR REPLACE FUNCTION update_timestamp_truck()
RETURNS TRIGGER AS $$
BEGIN
      NEW.updated_at= now();
      RETURN NEW;
END;
$$ language 'plpgsql';
COMMIT;
CREATE TRIGGER truck_timestamp BEFORE INSERT OR UPDATE ON truck
FOR EACH ROW EXECUTE PROCEDURE update_timestamp_truck();
COMMIT;

--/Creacion de trigger para colocar fecha de actualizacion de transport/
BEGIN;
CREATE OR REPLACE FUNCTION update_timestamp_transport()
RETURNS TRIGGER AS $$
BEGIN
      NEW.updated_at= now();
      RETURN NEW;
END;
$$ language 'plpgsql';
COMMIT;
CREATE TRIGGER transport_timestamp BEFORE INSERT OR UPDATE ON transport
FOR EACH ROW EXECUTE PROCEDURE update_timestamp_transport();
COMMIT;
--/Creacion de trigger para colocar fecha de actualizacion de client/
BEGIN;
CREATE OR REPLACE FUNCTION update_timestamp_client()
RETURNS TRIGGER AS $$
BEGIN
      NEW.updated_at= now();
      RETURN NEW;
END;
$$ language 'plpgsql';
COMMIT;
CREATE TRIGGER client_timestamp BEFORE INSERT OR UPDATE ON client
FOR EACH ROW EXECUTE PROCEDURE update_timestamp_client();
COMMIT;