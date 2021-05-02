//import mysql from 'mysql';
import { Pool } from 'pg'
import { Singleton } from 'typescript-ioc';
import config from '../config';
import mysql from 'mysql';
/**
 * @category Database
 */
@Singleton
export default class DatabaseConnection {
  private connection:any
  constructor() {}
  public async getPool() {
    this.connection = mysql.createPool({
        host:'database_mysql',
        user:'root',
        database:'PRUEBA',
        password:'123456789',
        // ssl  : {
        //   // DO NOT DO THIS
        //   // set up your ca correctly to trust the connection
        //   rejectUnauthorized: false
        // }
    })
    return this.connection

  }
}