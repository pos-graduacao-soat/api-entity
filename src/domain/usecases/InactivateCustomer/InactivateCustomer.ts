import { inject, injectable } from 'tsyringe'
import { MissingNecessaryDataError } from '../../errors/MissingNecessaryData'
import { InactivateCustomerDTO } from './InactivateCustomerDTO'
import { IInactivateCustomerUseCase } from './IInactivateCustomer'
import { ICustomerRepository } from '../../ports/repositories/Customer'
import { NotFoundError } from '../../errors/NotFoundError'

@injectable()
export class InactivateCustomerUseCase implements IInactivateCustomerUseCase {
  constructor(
    @inject('ICustomerRepository')
    private readonly customerRepository: ICustomerRepository
  ) { }

  async inactivate(params: InactivateCustomerDTO): Promise<void> {
    this.validateParams(params)

    const customer = await this.getCustomer(params)

    if (!customer) {
      throw new NotFoundError('Customer not found')
    }

    const inactivatedCustomer = await this.customerRepository.inactivate(customer.id)

    if (!inactivatedCustomer) {
      throw new Error('Error inactivating customer')
    }
  }

  private validateParams(params: InactivateCustomerDTO): void {
    const { email, name, documentNumber } = params

    if (!email && !name && !documentNumber) {
      throw new MissingNecessaryDataError('At least one of the following params are necessary: email, name, documentNumber')
    }

    if ((email && email.trim() === '') || (name && name.trim() === '') || (documentNumber && documentNumber.trim() === '')) {
      throw new MissingNecessaryDataError('At least one of the following params are necessary: email, name, documentNumber')
    }
  }

  private async getCustomer(params: InactivateCustomerDTO) {
    const { email, name, documentNumber } = params

    if (email) {
      return this.customerRepository.getByEmail(email)
    }

    if (name) {
      return this.customerRepository.getByName(name)
    }

    if (documentNumber) {
      return this.customerRepository.getByDocumentNumber(documentNumber)
    }
  }
}