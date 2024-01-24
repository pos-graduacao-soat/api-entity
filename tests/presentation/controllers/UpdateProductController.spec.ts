import 'reflect-metadata'
import { UpdateProductController } from '../../../src/presentation/controllers/UpdateProductController'
import { IHttpRequest } from '../../../src/presentation/interfaces/IHttpRequest'
import { IUpdateProductUseCase } from '../../../src/domain/usecases'
import { Product } from '../../../src/domain/entities/Product'

describe('UpdateProductController', () => {
  let updateProductUseCase: jest.Mocked<IUpdateProductUseCase>
  let controller: UpdateProductController

  beforeEach(() => {
    updateProductUseCase = {
      update: jest.fn(),
    }

    controller = new UpdateProductController(updateProductUseCase)
  })

  const mockedHttpRequestParams: IHttpRequest = {
    body: {},
    params: {
      productId: '123'
    },
    query: {},
    headers: {},
    method: 'GET',
    url: ''
  }

  it('should update if it exists', async () => {
    const product = new Product({ id: '123', name: 'John Doe', description: 'fake description', price: 10 })

    updateProductUseCase.update.mockResolvedValue(product)

    const result = await controller.handle(mockedHttpRequestParams)

    expect(result.statusCode).toBe(200)
    expect(result.body).toEqual(product)
  })
})