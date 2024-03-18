import { InactivateCustomerDTO } from './InactivateCustomerDTO'

export interface IInactivateCustomerUseCase {
  inactivate: (params: InactivateCustomerDTO) => Promise<void>
}