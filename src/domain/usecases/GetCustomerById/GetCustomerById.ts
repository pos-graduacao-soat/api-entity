import { inject, injectable } from 'tsyringe'
import { GetCustomerByIdDTO } from './GetCustomerByIdDTO'
import { IGetCustomerByIdUseCase } from './IGetCustomer'
import { Customer } from '../../entities/Customer'
import { ICustomerRepository } from '../../ports/repositories/Customer'
import { NotFoundError } from '../../errors/NotFoundError'

@injectable()
export class GetCustomerByIdUseCase implements IGetCustomerByIdUseCase {
  constructor(
    @inject('ICustomerRepository')
    private readonly customerRepository: ICustomerRepository
  ) { }

  async get(params: GetCustomerByIdDTO): Promise<Customer> {
    const customer = await this.customerRepository.getById(params.customerId)

    if (!customer) {
      throw new NotFoundError('Customer not found')
    }

    return customer
  }
}