import { Customer } from '../../entities/Customer'
import { GetCustomerByIdDTO } from './GetCustomerByIdDTO'

export interface IGetCustomerByIdUseCase {
  get: (params: GetCustomerByIdDTO) => Promise<Customer>
}