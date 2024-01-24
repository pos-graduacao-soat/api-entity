import 'reflect-metadata'
import { NotFoundError } from '../../../src/domain/errors/NotFoundError'
import { IProductRepository } from '../../../src/domain/ports/repositories/Product'
import { GetProductByIdUseCase } from '../../../src/domain/usecases/'
import { Category, Product } from '../../../src/domain/entities/Product'

describe('GetProductByIdUseCase', () => {
  let productRepositoryMock: jest.Mocked<IProductRepository>
  let useCase: GetProductByIdUseCase

  beforeEach(() => {
    productRepositoryMock = {
      create: jest.fn(),
      list: jest.fn(),
      getById: jest.fn(),
      update: jest.fn(),
      getByIds: jest.fn(),
    }

    useCase = new GetProductByIdUseCase(productRepositoryMock)
  })

  it('should return a product if it exists', async () => {
    const customer = new Product({ id: '123', name: 'John Doe', category: Category.Beverages, price: 10, description: 'test' })

    productRepositoryMock.getById.mockResolvedValue(customer)

    const result = await useCase.get({ productId: '123' })

    expect(result).toBe(customer)
    expect(productRepositoryMock.getById).toHaveBeenCalledWith('123')
  })

  it('should throw a NotFoundError if the customer does not exist', async () => {
    productRepositoryMock.getById.mockResolvedValue(null)

    await expect(useCase.get({ productId: '123' })).rejects.toThrow(NotFoundError)
    expect(productRepositoryMock.getById).toHaveBeenCalledWith('123')
  })
})