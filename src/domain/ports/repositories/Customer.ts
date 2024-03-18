import { Customer } from '../../entities/Customer'

export interface ICustomerRepository {
  create: (customer: Customer) => Promise<boolean>
  getById: (id: string) => Promise<Customer | null>
  getByDocumentNumber: (documentNumber: string) => Promise<Customer | null>
  getByEmail: (email: string) => Promise<Customer | null>
  getByName: (name: string) => Promise<Customer | null>
  inactivate: (id: string) => Promise<boolean>
}