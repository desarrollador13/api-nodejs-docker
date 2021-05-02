CREATE TABLE PRUEBA.Ciudad (
	IdCiudad INT auto_increment NOT NULL,
	NombreCiudad varchar(100) NOT NULL,
	PRIMARY KEY (IdCiudad)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8
COLLATE=utf8_spanish_ci;


CREATE TABLE PRUEBA.Sede (
	IdSede INT auto_increment NOT NULL,
	NombreSede varchar(100) NOT NULL,
	IdCiudad INT NOT NULL,
	PRIMARY KEY (IdSede)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8
COLLATE=utf8_spanish_ci;


CREATE TABLE PRUEBA.Role (
	IdRoll INT auto_increment NOT NULL,
	NombreRoll varchar(100) NOT NULL,
	PRIMARY KEY (IdRoll)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8
COLLATE=utf8_spanish_ci;


CREATE TABLE PRUEBA.Usuario (
	IdUsuario INT auto_increment NOT NULL,
	Nombre varchar(100) NOT NULL,
	Usuario varchar(100) NOT NULL,
	Contrasena varchar(100) NOT NULL,
	IdSede INT NOT NULL,
	IdRoll INT NOT NULL,
	PRIMARY KEY (IdUsuario)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8
COLLATE=utf8_spanish_ci;



INSERT INTO PRUEBA.Ciudad
(NombreCiudad)
VALUES('Bogota');

INSERT INTO PRUEBA.Sede
(NombreSede, IdCiudad)
VALUES('Centro', 1);

INSERT INTO PRUEBA.`Role`
(NombreRoll)
VALUES('Admin');

INSERT INTO PRUEBA.Usuario
(Nombre, Usuario, Contrasena, IdSede, IdRoll)
VALUES('Jonathan pinto', 'jpinto', '123456', 1, 1);

