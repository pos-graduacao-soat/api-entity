import 'reflect-metadata'
import { IProductRepository } from '../../../src/domain/ports/repositories/Product'
import { GetProductsByIdsUseCase } from '../../../src/domain/usecases/'
import { Category, Product } from '../../../src/domain/entities/Product'
import { MissingNecessaryDataError } from '../../../src/domain/errors/MissingNecessaryData'

describe('GetProductsByIdsUseCase', () => {
  let productRepositoryMock: jest.Mocked<IProductRepository>
  let useCase: GetProductsByIdsUseCase

  beforeEach(() => {
    productRepositoryMock = {
      create: jest.fn(),
      list: jest.fn(),
      getById: jest.fn(),
      update: jest.fn(),
      getByIds: jest.fn(),
    }

    useCase = new GetProductsByIdsUseCase(productRepositoryMock)
  })

  it('should return a list of products', async () => {
    const customers = [
      new Product({ id: '1000', name: 'drink', category: Category.Beverages, price: 10, description: 'test' }),
      new Product({ id: '2000', name: 'burguer', category: Category.MainCourses, price: 10, description: 'test' })
    ]

    productRepositoryMock.getByIds.mockResolvedValue(customers)

    const result = await useCase.get({ productIds: '1000,2000' })

    expect(result).toBe(customers)
    expect(productRepositoryMock.getByIds).toHaveBeenCalledWith(['1000', '2000'])
  })

  it('should throw a MissingNecessaryDataError if productIds param is missing or empty', async () => {
    await expect(useCase.get({ productIds: '' })).rejects.toThrow(MissingNecessaryDataError)
  })
})