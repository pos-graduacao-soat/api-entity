import 'reflect-metadata'
import { IListProductsUseCase } from '../../../src/domain/usecases'
import { ListProductsController } from '../../../src/presentation/controllers/ListProductsController'
import { IHttpRequest } from '../../../src/presentation/interfaces/IHttpRequest'


describe('ListProductsController', () => {
  let listProductsUseCase: IListProductsUseCase
  let listProductsController: ListProductsController

  beforeEach(() => {
    listProductsUseCase = {
      list: jest.fn().mockResolvedValue([{ id: '1', name: 'Product 1' }]),
    }
    listProductsController = new ListProductsController(listProductsUseCase)
  })

  it('should call IListProductsUseCase.list with correct values', async () => {
    const mockedHttpRequestParams: IHttpRequest = {
      body: {},
      params: {
        productIds: '123'
      },
      query: {
        name: 'Product 1',
        category: 'Category 1',
        description: 'Description 1',
        price: 100,
      },
      headers: {},
      method: 'GET',
      url: ''
    }

    await listProductsController.handle(mockedHttpRequestParams as IHttpRequest)

    expect(listProductsUseCase.list).toHaveBeenCalledWith(mockedHttpRequestParams.query)
  })

  it('should return the correct response', async () => {
    const mockedHttpRequestParams: IHttpRequest = {
      body: {},
      params: {
        productIds: '123'
      },
      query: {
        name: 'Product 1',
        category: 'Category 1',
        description: 'Description 1',
        price: 100,
      },
      headers: {},
      method: 'GET',
      url: ''
    }

    const httpResponse = await listProductsController.handle(mockedHttpRequestParams)

    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body).toEqual([{ id: '1', name: 'Product 1' }])
  })
})