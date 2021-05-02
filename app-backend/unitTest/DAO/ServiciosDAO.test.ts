import {Container, Scope} from 'typescript-ioc';
import  DatabaseConnection from '../../src/loaders/databaseLoader';
import DatabaseConnectionMock from '../mocks/database/DatabaseConnectionMock';
import { ServicesDAO }  from '../../src/DAO/ServicesDAO';
import { chargeJsonResponse } from '../mocks/chargeJson';


test('Test #1', async () => {
  let servicesDAO:ServicesDAO=Container.get(ServicesDAO);
  let Loguinusuario:string = 'jpinto';
  let Contrasena:string = '1234563';
  let dataResponse:any = await servicesDAO.validarUsuarioToken(Loguinusuario,Contrasena);
  console.log(dataResponse)
  expect(dataResponse.length == 0).toBe(true);
});


test('Test #2', async () => {
  
  let servicesDAO:ServicesDAO=Container.get(ServicesDAO);
  let NombreCiudad:string = 'Bucaramanga';
  let dataResponse:any = await servicesDAO.validarCiudad(NombreCiudad);
  console.log(dataResponse)
  expect(dataResponse.length == 0).toBe(true);
});


test('Test #3', async () => {
  let servicesDAO:ServicesDAO=Container.get(ServicesDAO);
  let NombreCiudad:string = 'Cali';
  let dataResponse:any = await servicesDAO.validarCiudad(NombreCiudad);
  console.log(dataResponse)
  expect(dataResponse.length == 1).toBe(true);
});


test('validar validarUsuarios no devuelve datos prueba1', async () => {
  let servicesDAO:ServicesDAO=Container.get(ServicesDAO);
  let Loguinusuario:string = 'jpinto';
  let Contrasena:string = '1234563';
  let dataResponse:any = await servicesDAO.validarUsuarioToken(Loguinusuario,Contrasena);
  console.log(dataResponse)
  expect(dataResponse.length == 0).toBe(true);
});