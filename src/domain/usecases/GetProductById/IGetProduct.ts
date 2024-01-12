import { Product } from '../../entities/Product'
import { GetProductByIdDTO } from './GetProductByIdDTO'

export interface IGetProductByIdUseCase {
  get: (params: GetProductByIdDTO) => Promise<Product>
}