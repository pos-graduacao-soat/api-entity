import { inject, injectable } from 'tsyringe'
import { IController } from '../interfaces/IController'
import { IHttpRequest } from '../interfaces/IHttpRequest'
import { ok } from '../adapters/HttpResponseAdapter'
import { IHttpResponse } from '../interfaces/IHttpResponse'
import { IGetProductByIdUseCase } from '../../domain/usecases/GetProductById/IGetProduct'

@injectable()
export class GetProductByIdController implements IController {
  constructor(
    @inject('IGetProductByIdUseCase')
    readonly getProductByIdUseCase: IGetProductByIdUseCase
  ) { }
  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const { productId } = httpRequest.params

    const result = await this.getProductByIdUseCase.get({ productId })

    return ok(result)
  }
} 