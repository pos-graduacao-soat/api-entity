import 'reflect-metadata'
import { GetProductsByIdsController } from '../../../src/presentation/controllers/GetProductsByIdsController'
import { IHttpRequest } from '../../../src/presentation/interfaces/IHttpRequest'
import { IGetProductsByIdsUseCase } from '../../../src/domain/usecases/'
import { Product } from '../../../src/domain/entities/Product'

describe('GetProductByIdController', () => {
  let getProductsByIdsUseCaseMock: jest.Mocked<IGetProductsByIdsUseCase>
  let controller: GetProductsByIdsController

  beforeEach(() => {
    getProductsByIdsUseCaseMock = {
      get: jest.fn(),
    }

    controller = new GetProductsByIdsController(getProductsByIdsUseCaseMock)
  })

  const mockedHttpRequestParams: IHttpRequest = {
    body: {},
    params: {
      productIds: '123'
    },
    query: {},
    headers: {},
    method: 'GET',
    url: ''
  }

  it('should return products if it exists', async () => {
    const product = new Product({ id: '123', name: 'John Doe', description: 'fake description', price: 10 })

    getProductsByIdsUseCaseMock.get.mockResolvedValue([product])

    const result = await controller.handle(mockedHttpRequestParams)

    expect(result.statusCode).toBe(200)
    expect(result.body).toEqual([product])
  })
})