import { inject, injectable } from 'tsyringe'
import { IController } from '../interfaces/IController'
import { IHttpRequest } from '../interfaces/IHttpRequest'
import { ok } from '../adapters/HttpResponseAdapter'
import { IListProductsUseCase } from '../../domain/usecases/ListProducts/IListProducts'
import { IHttpResponse } from '../interfaces/IHttpResponse'

@injectable()
export class ListProductsController implements IController {
  constructor(
    @inject('IListProductsUseCase')
    readonly listProductsUseCase: IListProductsUseCase
  ) { }
  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const { name, category, description, price } = httpRequest.query

    const result = await this.listProductsUseCase.list({ name, category, description, price })

    return ok(result)
  }
} 