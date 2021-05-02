import Conection from '../loaders/databaseLoader'
import { Inject } from "typescript-ioc"

export class AutentUsuariosDAO {
	private data:object|any= {}

	constructor(@Inject private databaseConnection: Conection){}

	async validarRoles(Loguinusuario:string|any):Promise<any> {
		let data:any;
		try {
		  const connection = await this.databaseConnection.getPool()
		  return new Promise((resolve, reject) => {
				connection.query(`SELECT u.IdUsuario, u.IdRoll, r.NombreRoll,
					u.Nombre,u.Usuario,u.Contrasena
					from PRUEBA.Usuario u 
					INNER JOIN PRUEBA.Role r ON  u.IdRoll = r.IdRoll 
					INNER JOIN PRUEBA.Sede s ON  u.IdSede = s.IdSede 
					INNER JOIN PRUEBA.Ciudad c ON  s.IdCiudad = c.IdCiudad
					WHERE u.Usuario = ? `, [Loguinusuario], 
				async function (error:any, results:any, fields:any) {
				  if (error) reject([]);
				  resolve(JSON.parse(JSON.stringify(results)));
				}); 
			});
		}catch(error) {
			console.log(error, ' error')
			data = []; 
			return data
		}
	}


	async obtenerUsuario(Loguinusuario:string|any):Promise<any> {
		let data:any;
		try {
		  const connection = await this.databaseConnection.getPool()
		  return new Promise((resolve, reject) => {
				connection.query(`SELECT u.Nombre,u.Usuario,u.Contrasena, u.IdSede, s.NombreSede,u.IdRoll, 
					r.NombreRoll,c.IdCiudad, c.NombreCiudad 
					from PRUEBA.Usuario u 
					INNER JOIN PRUEBA.Role r ON  u.IdRoll = r.IdRoll 
					INNER JOIN PRUEBA.Sede s ON  u.IdSede = s.IdSede 
					INNER JOIN PRUEBA.Ciudad c ON  s.IdCiudad = c.IdCiudad 
					WHERE u.Usuario = ? `, [Loguinusuario], 
				async function (error:any, results:any, fields:any) {
				  if (error) reject([]);
				  resolve(JSON.parse(JSON.stringify(results)));
				}); 
			});
		}catch(error) {
			console.log(error, ' error')
			data = []; 
			return data
		}
	}
}