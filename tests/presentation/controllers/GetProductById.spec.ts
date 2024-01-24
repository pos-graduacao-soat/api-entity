import 'reflect-metadata'
import { GetProductByIdController } from '../../../src/presentation/controllers/GetProductByIdController'
import { IHttpRequest } from '../../../src/presentation/interfaces/IHttpRequest'
import { IGetProductByIdUseCase } from '../../../src/domain/usecases/GetProductById/IGetProduct'
import { Product } from '../../../src/domain/entities/Product'

describe('GetProductByIdController', () => {
  let getProductByIdUseCaseMock: jest.Mocked<IGetProductByIdUseCase>
  let controller: GetProductByIdController

  beforeEach(() => {
    getProductByIdUseCaseMock = {
      get: jest.fn(),
    }

    controller = new GetProductByIdController(getProductByIdUseCaseMock)
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

  it('should return a product if it exists', async () => {
    const product = new Product({ id: '123', name: 'John Doe', description: 'fake description', price: 10 })

    getProductByIdUseCaseMock.get.mockResolvedValue(product)

    const result = await controller.handle(mockedHttpRequestParams)

    expect(result.statusCode).toBe(200)
    expect(result.body).toBe(product)
  })
})