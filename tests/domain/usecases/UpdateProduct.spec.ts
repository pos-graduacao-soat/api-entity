import 'reflect-metadata'
import { Category, Product } from '../../../src/domain/entities/Product'
import { InvalidParamError } from '../../../src/domain/errors/InvalidParam'
import { NotFoundError } from '../../../src/domain/errors/NotFoundError'
import { IProductRepository } from '../../../src/domain/ports/repositories/Product'
import { UpdateProductUseCase, UpdateProductDTO } from '../../../src/domain/usecases'

describe('UpdateProductUseCase', () => {
  let productRepository: jest.Mocked<IProductRepository>
  let updateProductUseCase: UpdateProductUseCase

  beforeEach(() => {
    productRepository = {
      create: jest.fn(),
      list: jest.fn(),
      getById: jest.fn(),
      update: jest.fn(),
      getByIds: jest.fn(),
    }

    updateProductUseCase = new UpdateProductUseCase(productRepository)
  })

  it('should throw InvalidParamError if category is invalid', async () => {
    const params: UpdateProductDTO = { productId: '1', category: 'InvalidCategory' }

    await expect(updateProductUseCase.update(params)).rejects.toThrow(InvalidParamError)
  })

  it('should throw NotFoundError if product is not found', async () => {
    const params: UpdateProductDTO = { productId: '1', category: Category.Beverages }

    productRepository.update.mockResolvedValueOnce(false)

    await expect(updateProductUseCase.update(params)).rejects.toThrow(NotFoundError)
  })

  it('should update product if valid data is provided', async () => {
    const params: UpdateProductDTO = { productId: '1', name: 'Product 1', category: Category.Beverages, description: 'Description', price: 100 }

    const updatedProduct: Product = new Product({ id: '1', name: 'Product 1', category: Category.Beverages, description: 'Description', price: 100 })

    productRepository.update.mockResolvedValueOnce(true)
    productRepository.getById.mockResolvedValueOnce(updatedProduct)

    const result = await updateProductUseCase.update(params)

    const { productId, ...updateParams } = params

    expect(result).toEqual(updatedProduct)
    expect(productRepository.update).toHaveBeenCalledWith({ id: productId, ...updateParams })
    expect(productRepository.getById).toHaveBeenCalledWith(params.productId)
  })
})