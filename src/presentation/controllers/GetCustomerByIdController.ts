import { inject, injectable } from 'tsyringe'
import { IController } from '../interfaces/IController'
import { IHttpRequest } from '../interfaces/IHttpRequest'
import { ok } from '../adapters/HttpResponseAdapter'
import { IHttpResponse } from '../interfaces/IHttpResponse'
import { IGetCustomerByIdUseCase } from '../../domain/usecases/GetCustomerById/IGetCustomer'

@injectable()
export class GetCustomerByIdController implements IController {
  constructor(
    @inject('IGetCustomerByIdUseCase')
    readonly getCustomerByIdUseCase: IGetCustomerByIdUseCase
  ) { }
  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const { customerId } = httpRequest.params

    const result = await this.getCustomerByIdUseCase.get({ customerId })

    return ok(result)
  }
} 