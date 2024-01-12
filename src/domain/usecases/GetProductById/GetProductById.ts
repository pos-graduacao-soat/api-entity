import { inject, injectable } from 'tsyringe'
import { GetProductByIdDTO } from './GetProductByIdDTO'
import { IGetProductByIdUseCase } from './IGetProduct'
import { NotFoundError } from '../../errors/NotFoundError'
import { Product } from '../../entities/Product'
import { IProductRepository } from '../../ports/repositories/Product'

@injectable()
export class GetProductByIdUseCase implements IGetProductByIdUseCase {
  constructor(
    @inject('IProductRepository')
    private readonly productRepository: IProductRepository
  ) { }

  async get(params: GetProductByIdDTO): Promise<Product> {
    const product = await this.productRepository.getById(params.productId)

    if (!product) {
      throw new NotFoundError('Product not found')
    }

    return product
  }
}