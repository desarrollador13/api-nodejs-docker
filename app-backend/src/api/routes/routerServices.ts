import { Request, Response, NextFunction, Router } from 'express'
import ServicesController from '../../controllers/servicesController'
import { Container } from "typescript-ioc";
const multipart = require('connect-multiparty')
const fs = require('fs');
const { readdirSync, statSync } = require('fs')
const { join } = require('path')
import { verifyToken, isAdmin } from '../../Middlewares/authJwt'

export default class routerServices {
  public app:Router
  multipartMiddleware:any
  constructor(router: Router) {
    this.app = router
    this.multipartMiddleware = multipart() 
  }

  router(): void {

    this.app.get(
      '/services/prueba',
      async (req: any, res: Response, next: NextFunction) => {
        setTimeout(() => {
          let appRes:any = {
            status: 200,
            msg: 'ok'
          } 
          res.status(200).json(appRes)
        },400)
      }
    )

    this.app.post(
      '/services/usuario',
      async (req: any, res: Response, next: NextFunction) => {
        const servicesController:ServicesController = Container.get(ServicesController)
        let responseModel = await servicesController.validarCredencialesToken(req)
        res.status(200).json(responseModel)
      }
    )

    this.app.post(
      '/services/ciudad', [verifyToken,isAdmin],
      async (req: any, res: Response, next: NextFunction) => {
        const servicesController:ServicesController = Container.get(ServicesController)
        let responseModel = await servicesController.registrarCiudad(req)
        res.status(200).json(responseModel)
      }
    )

    this.app.post(
      '/services/sede', [verifyToken,isAdmin],
      async (req: any, res: Response, next: NextFunction) => {
        const servicesController:ServicesController = Container.get(ServicesController)
        let responseModel = await servicesController.registrarSede(req)
        res.status(200).json(responseModel)
      }
    )

    this.app.get(
      '/services/usuarios', verifyToken,
      async (req: any, res: Response, next: NextFunction) => {
        const servicesController:ServicesController = Container.get(ServicesController)
        let responseModel = await servicesController.consultarUsuarios()
        res.status(200).json(responseModel)
      }
    )
  }
}