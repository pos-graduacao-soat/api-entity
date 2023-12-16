import { Router } from 'express'
import { container } from 'tsyringe'
import { adaptRoute } from '../../adapters/ExpressRouteAdapter'
import { CreateCustomerController } from '../../controllers/CreateCustomerController'

function registerCustomerRoutes(router: Router) {
  router.post('/customers', adaptRoute(container.resolve(CreateCustomerController)))

  return router
}

export { registerCustomerRoutes }