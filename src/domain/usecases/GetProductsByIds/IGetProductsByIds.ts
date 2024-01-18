import { Product } from '../../entities/Product'
import { GetProductsByIdsDTO } from './GetProductsByIdsDTO'

export interface IGetProductsByIdsUseCase {
  get: (params: GetProductsByIdsDTO) => Promise<Product[]>
}