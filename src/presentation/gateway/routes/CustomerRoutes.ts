import { Router } from 'express'
import { container } from 'tsyringe'
import { adaptRoute } from '../../adapters/ExpressRouteAdapter'
import { CreateCustomerController } from '../../controllers/CreateCustomerController'

const customerRoutes = Router()

customerRoutes.post('/customers', adaptRoute(container.resolve(CreateCustomerController)))

export { customerRoutes }