import Conection from '../loaders/databaseLoader'
import { Inject } from "typescript-ioc";

export class ServicesDAO {

	constructor(
		@Inject private databaseConnection: Conection
	) { }


	public async validarUsuarioToken(Loguinusuario:string|any, Contrasena:string|any):Promise<any>{
		let data: any
		try {
		  const connection = await this.databaseConnection.getPool()
		  return new Promise((resolve, reject) => {
				connection.query(`SELECT u.Nombre,u.Usuario,u.Contrasena, u.IdSede, s.NombreSede,u.IdRoll, 
					r.NombreRoll,c.IdCiudad, c.NombreCiudad 
					from PRUEBA.Usuario u 
					INNER JOIN PRUEBA.Role r ON  u.IdRoll = r.IdRoll 
					INNER JOIN PRUEBA.Sede s ON  u.IdSede = s.IdSede 
					INNER JOIN PRUEBA.Ciudad c ON  s.IdCiudad = c.IdCiudad 
					WHERE u.Usuario = ? and u.Contrasena = ? `, [Loguinusuario, Contrasena], 
				async function (error:any, results:any, fields:any) {
				  if (error) reject([]);
				  resolve(JSON.parse(JSON.stringify(results)));
				}); 
			});
		}catch(error) {
			data = []; 
			return data
		}
	}

	public async validarCiudad(NombreCiudad:string|any): Promise<any> {
		let data: any
		try {
		  const connection = await this.databaseConnection.getPool()
		  return new Promise((resolve, reject) => {
				connection.query(`SELECT NombreCiudad from PRUEBA.Ciudad WHERE NombreCiudad = ? `, [NombreCiudad], 
				async function (error:any, results:any, fields:any) {
				  if (error) reject([]);
				  resolve(JSON.parse(JSON.stringify(results)));
				}); 
			});
		}catch(error) {
			data = []; 
			return data
		}
	}

	public async validarCiudades(IdCiudad:string|any): Promise<any> {
		let data: any
		try {
		  const connection = await this.databaseConnection.getPool()
		  return new Promise((resolve, reject) => {
				connection.query(`SELECT NombreCiudad from PRUEBA.Ciudad WHERE IdCiudad = ? `, [IdCiudad], 
				async function (error:any, results:any, fields:any) {
				  if (error) reject([]);
				  resolve(JSON.parse(JSON.stringify(results)));
				}); 
			});
		}catch(error) {
			data = []; 
			return data
		}
	}

	public async registrarCiudad(NombreCiudad:string|any):Promise<any> {
		let data: any
		try {
		  const connection = await this.databaseConnection.getPool()
		  return new Promise((resolve, reject) => {
				connection.query(`INSERT INTO PRUEBA.Ciudad (NombreCiudad) VALUES(?)`, [NombreCiudad], 
				async function (error:any, results:any, fields:any) {
				  if (error) reject([]);
				  resolve([1]);
				}); 
			});
		}catch(error) {
			data = []; 
			return data
		}
	}

	public async registrarSede(NombreSede:string|any,IdCiudad:string|any):Promise<any> {
		let data: any
		try {
		  const connection = await this.databaseConnection.getPool()
		  return new Promise((resolve, reject) => {
				connection.query(`INSERT INTO PRUEBA.Sede (NombreSede, IdCiudad) VALUES(?, ?)`, [NombreSede,IdCiudad], 
				async function (error:any, results:any, fields:any) {
				  if (error) reject([]);
				  resolve([1]);
				}); 
			});
		}catch(error) {
			data = []; 
			return data
		}
	}

	public async validarSede(NombreSede:string|any,IdCiudad:string|any):Promise<any> {
		let data: any
		try {
		  const connection = await this.databaseConnection.getPool()
		  return new Promise((resolve, reject) => {
				connection.query(`SELECT NombreSede from PRUEBA.Sede WHERE NombreSede = ? and IdCiudad = ?`, [NombreSede,IdCiudad], 
				async function (error:any, results:any, fields:any) {
				  if (error) reject([]);
				  resolve(JSON.parse(JSON.stringify(results)));
				}); 
			});
		}catch(error) {
			data = []; 
			return data
		}
	}

	public async consultarUsuarios():Promise<any> {
		let data: any
		try {
		  const connection = await this.databaseConnection.getPool()
		  return new Promise((resolve, reject) => {
				connection.query(`SELECT 
					u.Nombre,u.Usuario,u.Contrasena,
					u.IdSede, s.NombreSede,
					u.IdRoll, r.NombreRoll,
					c.IdCiudad, c.NombreCiudad 
					from PRUEBA.Usuario u
					INNER JOIN PRUEBA.Role r ON  u.IdRoll = r.IdRoll
					INNER JOIN PRUEBA.Sede s ON  u.IdSede = s.IdSede
					INNER JOIN PRUEBA.Ciudad c ON  s.IdCiudad = c.IdCiudad `, 
				async function (error:any, results:any, fields:any) {
				  if (error) reject([]);
				  resolve(JSON.parse(JSON.stringify(results)));
				}); 
			});
		}catch(error) {
			data = []; 
			return data
		}
	}


}
