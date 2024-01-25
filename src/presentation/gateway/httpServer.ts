import express, { Request, Response, NextFunction, Router } from 'express'
import { Server } from 'http'
import { container } from 'tsyringe'
import { adaptErrorHandler } from '../adapters/ExpressErrorHandlerAdapter'
import { HttpErrorHandler } from './middlewares/ErrorHandler'
import { registerCustomerRoutes } from './routes/CustomerRoutes'
import { registerProductRoutes } from './routes/ProductRoutes'
import { utilRoutes } from './routes/UtilsRoutes'

function startHttpServer(): Server {
  const errorHandler = container.resolve(HttpErrorHandler)

  const expressServer = express()
  const router = Router()

  expressServer.use(express.json())
  expressServer.use(express.urlencoded({ extended: true }))
  expressServer.use(registerCustomerRoutes(router))
  expressServer.use(registerProductRoutes(router))
  expressServer.use(utilRoutes)

  expressServer.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    const response = errorHandler.handle(err)
    const errorHandlerAdapter = adaptErrorHandler(response)
    return errorHandlerAdapter(req, res, next)
  })

  const httpServer = expressServer.listen(process.env.PORT || 3000, () => {
    console.log(`Http server running at port ${process.env.PORT}`)
  })

  return httpServer
}

export { startHttpServer }