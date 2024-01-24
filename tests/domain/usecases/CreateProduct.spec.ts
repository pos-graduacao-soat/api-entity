import 'reflect-metadata'
import { MissingNecessaryDataError } from '../../../src/domain/errors/MissingNecessaryData'
import { CreateProductDTO, CreateProductUseCase } from '../../../src/domain/usecases'
import { IProductRepository } from '../../../src/domain/ports/repositories/Product'
import { InvalidParamError } from '../../../src/domain/errors/InvalidParam'
import { Category, Product } from '../../../src/domain/entities/Product'

describe('CreateProductUseCase', () => {
  let productRepository: jest.Mocked<IProductRepository>
  let createProductUseCase: CreateProductUseCase

  beforeEach(() => {
    productRepository = {
      create: jest.fn(),
      getById: jest.fn(),
      getByIds: jest.fn(),
      update: jest.fn(),
      list: jest.fn(),
    }

    createProductUseCase = new CreateProductUseCase(productRepository)
  })

  it('should throw MissingNecessaryDataError if any of the required fields are missing', async () => {
    const params: Partial<CreateProductDTO> = { name: 'Product 1', price: 100, category: undefined, description: undefined, imageLink: undefined }

    await expect(createProductUseCase.create(params as CreateProductDTO)).rejects.toThrow(MissingNecessaryDataError)
  })

  it('should throw InvalidParamError if category is invalid', async () => {
    const params: CreateProductDTO = { imageLink: 'image', name: 'Product 1', category: 'InvalidCategory', description: 'Description', price: 100 }

    await expect(createProductUseCase.create(params)).rejects.toThrow(InvalidParamError)
  })

  it('should throw a generic error if for some reason customer repository returns false when creating new customer', async () => {
    const params: CreateProductDTO = { imageLink: 'image', name: 'Product 1', category: Category.Beverages, description: 'Description', price: 100 }

    productRepository.create.mockResolvedValueOnce(false)

    await expect(createProductUseCase.create(params)).rejects.toThrow(Error)
  })

  it('should create a new product if valid data is provided', async () => {
    const params: CreateProductDTO = { imageLink: 'image', name: 'Product 1', category: Category.Beverages, description: 'Description', price: 100 }

    const newProduct = new Product({ ...params, category: params.category as Category })

    productRepository.create.mockResolvedValueOnce(true)
    productRepository.getById.mockResolvedValueOnce(newProduct)

    const result = await createProductUseCase.create(params)

    expect(result.name).toEqual(params.name)
    expect(result.category).toEqual(params.category)
    expect(result.description).toEqual(params.description)
    expect(result.price).toEqual(params.price)
    expect(productRepository.create).toHaveBeenCalledWith(expect.objectContaining(params))
    expect(productRepository.getById).toHaveBeenCalledTimes(1)
  })
})