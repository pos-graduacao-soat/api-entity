import { Router } from 'express'
import { container } from 'tsyringe'
import { adaptRoute } from '../../adapters/ExpressRouteAdapter'
import { CreateCustomerController } from '../../controllers/CreateCustomerController'
import { GetCustomerByIdController } from '../../controllers/GetCustomerByIdController'

function registerCustomerRoutes(router: Router) {
  router.post('/customers', adaptRoute(container.resolve(CreateCustomerController)))
  router.get('/customers/:customerId', adaptRoute(container.resolve(GetCustomerByIdController)))

  return router
}

export { registerCustomerRoutes }