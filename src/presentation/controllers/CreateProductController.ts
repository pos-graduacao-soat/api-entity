import { inject, injectable } from 'tsyringe'
import { IController } from '../interfaces/IController'
import { IHttpRequest } from '../interfaces/IHttpRequest'
import { created } from '../adapters/HttpResponseAdapter'
import { ICreateProductUseCase } from '../../domain/usecases/CreateProduct/ICreateProduct'
import { IHttpResponse } from '../interfaces/IHttpResponse'

@injectable()
export class CreateProductController implements IController {
  constructor(
    @inject('ICreateProductUseCase')
    readonly createProductUseCase: ICreateProductUseCase
  ) { }
  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const { name, category, description, price, image } = httpRequest.body

    const result = await this.createProductUseCase.create({ name, category, description, price, image })

    return created(result, 'Product created')
  }
} 