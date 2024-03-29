import { inject, injectable } from 'tsyringe'
import { IController } from '../interfaces/IController'
import { IHttpRequest } from '../interfaces/IHttpRequest'
import { ok } from '../adapters/HttpResponseAdapter'
import { IHttpResponse } from '../interfaces/IHttpResponse'
import { IUpdateProductUseCase } from '../../domain/usecases'

@injectable()
export class UpdateProductController implements IController {
  constructor(
    @inject('IUpdateProductUseCase')
    readonly updateProductUseCase: IUpdateProductUseCase
  ) { }
  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const { name, category, price, description } = httpRequest.body
    const { productId } = httpRequest.params

    const result = await this.updateProductUseCase.update({ productId, name, category, price, description })

    return ok(result)
  }
} 