import { Request, Response, NextFunction } from 'express'
import { Inject } from "typescript-ioc";
import { ServicesDAO } from '../DAO/ServicesDAO'
import requests from 'request-promise'
const multipart= require('connect-multiparty')
const fs= require('fs');
const csv= require('csvtojson')
const csvToJson= require('convert-csv-to-json')
const getStream = require('get-stream')
const parse = require('csv-parse')
const csv1 = require('fast-csv')

import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import config from "../config/Configuraciones"


export default class ServicesController {
	resValidacionArc:Array<any>|any
	constructor(
		@Inject private servicesDAO: ServicesDAO,
	) {
		this.resValidacionArc= []
	}

	async validarCredencialesToken(request:object|any):Promise<any> {
		let res:any
		try{
			const { Loguinusuario, Contrasena } = request.body
			let consultUser:any
			if(!Loguinusuario  &&  !Contrasena) return {status: 400, msg: 'bad request'}
			if(Loguinusuario == '' && Contrasena == '') return {status: 400, msg: 'los campos no pueden estar vacios' }
			consultUser= await this.servicesDAO.validarUsuarioToken(Loguinusuario,Contrasena)
			if(consultUser.length < 1)
				return {status:200, msg:"No existe el usuario", token: ''}
			const token = jwt.sign(consultUser[0], config.SECRET, {
	     	 expiresIn: 86400, // 24 hours
	    	})
			return {status:201, msg:"Exitoso", token:token}
		}catch(error){
			res = { 'status' :500, 'msg' : 'error'}
			return res
		}

	}

	async encryptarContrasena(contrasena:string|any):Promise<any> {
		const salt = await bcrypt.genSalt(10)
  	return await bcrypt.hash(contrasena, salt)
	}

	async compareContrasena(password:string|any, receivedPassword:string|any):Promise<any> {
 		return await bcrypt.compare(password, receivedPassword)
	}

	

	async registrarCiudad(request:object|any):Promise<any> {
		let res:any
		try{
			const { NombreCiudad } = request.body
			let consultCiudad:any
			if(!NombreCiudad) return {status: 400, msg: 'bad request' }
			if(NombreCiudad == '') return {status: 400, msg: 'los campos no pueden estar vacios' }

			consultCiudad= await this.servicesDAO.validarCiudad(NombreCiudad)
			if(consultCiudad.length > 0) return {status: 200, msg: 'recurso ya existente' }

			res = await this.servicesDAO.registrarCiudad(NombreCiudad)
			if(res.length > 0)
				return { 'status' :201, 'msg' : 'dato guardado' }
			return { 'status' :200, 'msg' : 'no se guardado' }
		}catch(error){
			res = { 'status' :500, 'msg' : 'error'}
			return res
		}

	}

	async registrarSede(request:object|any):Promise<any> {
		let res:any
		try{
			const { NombreSede, IdCiudad } = request.body
			console.log(NombreSede, IdCiudad)
			let consultCiudad:any
			let consult:any;
			if(!NombreSede) return {status: 400, msg: 'bad request' }
			if(!IdCiudad) return {status: 400, msg: 'bad request' }
			if(NombreSede == '') return {status: 400, msg: 'los campos no pueden estar vacios' }
			if(IdCiudad=='' ) return {status: 400, msg: 'los campos no pueden estar vacios' }

			consultCiudad= await this.servicesDAO.validarCiudades(IdCiudad)
			if(consultCiudad.length == 0) return {status: 200, msg: 'La ciudad no existe' }

			consult= await this.servicesDAO.validarSede(NombreSede,IdCiudad)
			if(consult.length > 0) return {status: 200, msg: 'recurso ya existente' }

			res = await this.servicesDAO.registrarSede(NombreSede,IdCiudad)
			if(res.length > 0)
				return { 'status' :201, 'msg' : 'dato guardado' }
			return { 'status' :200, 'msg' : 'no se guardado' }
		}catch(error){
			res = { 'status' :500, 'msg' : 'error'}
			return res
		}

	}


	async consultarUsuarios():Promise<any> {
		let res:any
		try{	
			res = await this.servicesDAO.consultarUsuarios()
			return { 'status' :200, 'rows' : res }
		}catch(error){
			res = { 'status' :500, 'msg' : 'error'}
			return res
		}
	}

}