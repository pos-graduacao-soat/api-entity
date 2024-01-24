import 'reflect-metadata'
import { IProductRepository } from '../../../src/domain/ports/repositories/Product'
import { ListProductsDTO, ListProductsUseCase } from '../../../src/domain/usecases/'
import { Category, Product } from '../../../src/domain/entities/Product'
import { InvalidParamError } from '../../../src/domain/errors/InvalidParam'

describe('ListProductsUseCase', () => {
  let productRepositoryMock: jest.Mocked<IProductRepository>
  let listProductsUseCase: ListProductsUseCase

  beforeEach(() => {
    productRepositoryMock = {
      create: jest.fn(),
      list: jest.fn(),
      getById: jest.fn(),
      update: jest.fn(),
      getByIds: jest.fn(),
    }

    listProductsUseCase = new ListProductsUseCase(productRepositoryMock)
  })

  it('should throw InvalidParamError if category is invalid', async () => {
    const params: ListProductsDTO = { category: 'InvalidCategory' }

    await expect(listProductsUseCase.list(params)).rejects.toThrow(InvalidParamError)
  })

  it('should list products if valid data is provided', async () => {
    const params: ListProductsDTO = { category: Category.Beverages }

    const products: Product[] = [
      new Product({ name: 'Product 1', category: Category.Beverages, description: 'Description', price: 100 }),
      new Product({ name: 'Product 2', category: Category.Beverages, description: 'Description', price: 200 }),
    ]

    productRepositoryMock.list.mockResolvedValueOnce(products)

    const result = await listProductsUseCase.list(params)

    expect(result).toEqual(products)
    expect(productRepositoryMock.list).toHaveBeenCalledWith(params)
  })
})