import { inject, injectable } from 'tsyringe'
import { IController } from '../interfaces/IController'
import { IHttpRequest } from '../interfaces/IHttpRequest'
import { ok } from '../adapters/HttpResponseAdapter'
import { IHttpResponse } from '../interfaces/IHttpResponse'
import { IInactivateCustomerUseCase } from '../../domain/usecases/InactivateCustomer/IInactivateCustomer'

@injectable()
export class InactivateCustomerController implements IController {
  constructor(
    @inject('IInactivateCustomerUseCase')
    readonly inactivateCustomerUseCase: IInactivateCustomerUseCase
  ) { }
  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const { email, documentNumber } = httpRequest.query

    await this.inactivateCustomerUseCase.inactivate({ email, documentNumber })

    return ok()
  }
} 