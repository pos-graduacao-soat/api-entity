import { container } from 'tsyringe'
import { CreateCustomerUseCase, CreateProductUseCase, ICreateCustomerUseCase, ICreateProductUseCase, IListProductsUseCase, IUpdateProductUseCase, ListProductsUseCase, UpdateProductUseCase } from '../domain/usecases'
import { MongoDbClient } from '../infra/database/mongo'
import { CustomerRepository, ProductRepository } from '../infra/repositories'
import { GetCustomerByIdUseCase } from '../domain/usecases/GetCustomerById/GetCustomerById'
import { GetProductByIdUseCase } from '../domain/usecases/GetProductById/GetProductById'
import { IGetProductByIdUseCase } from '../domain/usecases/GetProductById/IGetProduct'

export async function initializeContainer() {
  const mongoDbClientInstance = await MongoDbClient.connect()

  container.registerInstance('MongoDbClient', mongoDbClientInstance)

  container.registerSingleton('ICustomerRepository', CustomerRepository)
  container.registerSingleton('IProductRepository', ProductRepository)

  container.register<ICreateCustomerUseCase>('ICreateCustomerUseCase', CreateCustomerUseCase)
  container.register<GetCustomerByIdUseCase>('IGetCustomerByIdUseCase', GetCustomerByIdUseCase)
  container.register<ICreateProductUseCase>('ICreateProductUseCase', CreateProductUseCase)
  container.register<IListProductsUseCase>('IListProductsUseCase', ListProductsUseCase)
  container.register<IUpdateProductUseCase>('IUpdateProductUseCase', UpdateProductUseCase)
  container.register<IGetProductByIdUseCase>('IGetProductByIdUseCase', GetProductByIdUseCase)
}