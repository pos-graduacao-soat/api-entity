import { Router } from 'express'
import { container } from 'tsyringe'
import { adaptRoute } from '../../adapters/ExpressRouteAdapter'
import { CreateProductController } from '../../controllers/CreateProductController'
import { ListProductsController } from '../../controllers/ListProductsController'
import { UpdateProductController } from '../../controllers/UpdateProductController'
import { GetProductByIdController } from '../../controllers/GetProductByIdController'
import { GetProductsByIdsController } from '../../controllers/GetProductsByIdsController'


function registerProductRoutes(router: Router) {
  router.post('/products', adaptRoute(container.resolve(CreateProductController)))
  router.get('/products', adaptRoute(container.resolve(ListProductsController)))
  router.patch('/products/:productId', adaptRoute(container.resolve(UpdateProductController)))
  router.get('/products/ids/', adaptRoute(container.resolve(GetProductsByIdsController)))
  router.get('/products/:productId', adaptRoute(container.resolve(GetProductByIdController)))

  return router
}

export { registerProductRoutes }