import { inject, injectable } from 'tsyringe'
import { IController } from '../interfaces/IController'
import { IHttpRequest } from '../interfaces/IHttpRequest'
import { ok } from '../adapters/HttpResponseAdapter'
import { ICreateCustomerUseCase } from '../../domain/usecases/CreateCustomer/ICreateCustomer'

@injectable()
export class CreateCustomerController implements IController {
  constructor(
    @inject('ICreateCustomerUseCase')
    readonly createCustomerUseCase: ICreateCustomerUseCase
  ) { }
  async handle(httpRequest: IHttpRequest): Promise<any> {
    const { name, email, documentNumber } = httpRequest.body

    const result = await this.createCustomerUseCase.create({ name, email, documentNumber })

    return ok(result, 'Customer created')
  }
} 