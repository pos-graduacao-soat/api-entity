import { inject, injectable } from 'tsyringe'
import { IController } from '../interfaces/IController'
import { IHttpRequest } from '../interfaces/IHttpRequest'
import { ok } from '../adapters/HttpResponseAdapter'
import { ICreateCustomerUseCase } from '../../domain/usecases/CreateCustomer/ICreateCustomer'
import { ICreateProductUseCase } from '../../domain/usecases/CreateProduct/ICreateProduct'

@injectable()
export class CreateProductController implements IController {
  constructor(
    @inject('ICreateProductUseCase')
    readonly createProductUseCase: ICreateProductUseCase
  ) { }
  async handle(httpRequest: IHttpRequest): Promise<any> {
    const { name, category, description, price } = httpRequest.body

    const result = await this.createProductUseCase.create({ name, category, description, price })

    return ok(result, 'Product created')
  }
} 