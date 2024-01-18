import { inject, injectable } from 'tsyringe'
import { IController } from '../interfaces/IController'
import { IHttpRequest } from '../interfaces/IHttpRequest'
import { ok } from '../adapters/HttpResponseAdapter'
import { IHttpResponse } from '../interfaces/IHttpResponse'
import { IGetProductsByIdsUseCase } from '../../domain/usecases/GetProductsByIds/IGetProductsByIds'

@injectable()
export class GetProductsByIdsController implements IController {
  constructor(
    @inject('IGetProductsByIdsUseCase')
    readonly getProductsByIdsUseCase: IGetProductsByIdsUseCase
  ) { }
  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const productIds = httpRequest.query.ids

    const result = await this.getProductsByIdsUseCase.get({ productIds })

    return ok(result)
  }
} 