import { Router } from 'express'
import { container } from 'tsyringe'
import { adaptRoute } from '../../adapters/ExpressRouteAdapter'
import { CreateProductController } from '../../controllers/CreateProductController'
import { ListProductsController } from '../../controllers/ListProductsController'
import { UpdateProductController } from '../../controllers/UpdateProductController'

const productRoutes = Router()

productRoutes.post('/products', adaptRoute(container.resolve(CreateProductController)))
productRoutes.get('/products', adaptRoute(container.resolve(ListProductsController)))
productRoutes.patch('/products/:productId', adaptRoute(container.resolve(UpdateProductController)))

export { productRoutes }