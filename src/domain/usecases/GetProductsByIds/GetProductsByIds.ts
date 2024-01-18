import { inject, injectable } from 'tsyringe'
import { IGetProductsByIdsUseCase } from './IGetProductsByIds'
import { Product } from '../../entities/Product'
import { IProductRepository } from '../../ports/repositories/Product'
import { GetProductsByIdsDTO } from './GetProductsByIdsDTO'
import { MissingNecessaryDataError } from '../../errors/MissingNecessaryData'

@injectable()
export class GetProductsByIdsUseCase implements IGetProductsByIdsUseCase {
  constructor(
    @inject('IProductRepository')
    private readonly productRepository: IProductRepository
  ) { }

  async get(params: GetProductsByIdsDTO): Promise<Product[]> {
    if (!params.productIds) throw new MissingNecessaryDataError('Missing params: ids')

    const productIds = params.productIds.split(',')

    const products = await this.productRepository.getByIds(productIds)

    return products
  }
}