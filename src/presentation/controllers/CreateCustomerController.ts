import { inject, injectable } from 'tsyringe'
import { IController } from '../interfaces/IController'
import { IHttpRequest } from '../interfaces/IHttpRequest'
import { created } from '../adapters/HttpResponseAdapter'
import { ICreateCustomerUseCase } from '../../domain/usecases/CreateCustomer/ICreateCustomer'
import { IHttpResponse } from '../interfaces/IHttpResponse'

@injectable()
export class CreateCustomerController implements IController {
  constructor(
    @inject('ICreateCustomerUseCase')
    readonly createCustomerUseCase: ICreateCustomerUseCase
  ) { }
  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const { name, email, documentNumber } = httpRequest.body

    const result = await this.createCustomerUseCase.create({ name, email, documentNumber })

    return created(result, 'Customer created')
  }
} 