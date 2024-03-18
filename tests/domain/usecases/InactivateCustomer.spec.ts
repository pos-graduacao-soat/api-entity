import 'reflect-metadata'
import { Customer } from '../../../src/domain/entities/Customer'
import { MissingNecessaryDataError } from '../../../src/domain/errors/MissingNecessaryData'
import { NotFoundError } from '../../../src/domain/errors/NotFoundError'
import { ICustomerRepository } from '../../../src/domain/ports/repositories/Customer'
import { InactivateCustomerUseCase } from '../../../src/domain/usecases/InactivateCustomer/InactivateCustomer'
import { InactivateCustomerDTO } from '../../../src/domain/usecases/InactivateCustomer/InactivateCustomerDTO'

describe('InactivateCustomerUseCase', () => {
  let useCase: InactivateCustomerUseCase
  let mockRepo: ICustomerRepository

  beforeEach(() => {
    mockRepo = {
      inactivate: jest.fn(),
      getByEmail: jest.fn(),
      getByName: jest.fn(),
      getByDocumentNumber: jest.fn()
    } as any

    useCase = new InactivateCustomerUseCase(mockRepo)
  })

  it('should throw MissingNecessaryDataError if no params are provided', async () => {
    await expect(useCase.inactivate({} as InactivateCustomerDTO)).rejects.toThrow(MissingNecessaryDataError)
  })

  it('should throw MissingNecessaryDataError if params are empty', async () => {
    const params: InactivateCustomerDTO = {
      email: '',
      name: '',
      documentNumber: ''
    }

    await expect(useCase.inactivate(params)).rejects.toThrow(MissingNecessaryDataError)
  })

  it('should throw NotFoundError if customer is not found', async () => {
    const params: InactivateCustomerDTO = {
      email: 'test@test.com'
    }

    jest.spyOn(mockRepo, 'getByEmail').mockResolvedValueOnce(null)

    await expect(useCase.inactivate(params)).rejects.toThrow(NotFoundError)
  })

  it('should inactivate customer by email if found', async () => {
    const params: InactivateCustomerDTO = {
      email: 'test@test.com'
    }

    const customer = new Customer({ id: '1', email: '', name: 'Inactive User', documentNumber: '' })

    jest.spyOn(mockRepo, 'getByEmail').mockResolvedValueOnce(customer)
    jest.spyOn(mockRepo, 'inactivate').mockResolvedValueOnce(true)

    await expect(useCase.inactivate(params)).resolves.toBeUndefined()
    expect(mockRepo.inactivate).toHaveBeenCalledWith(customer.id)
  })

  it('should inactivate customer by name if found', async () => {
    const params: InactivateCustomerDTO = {
      name: 'name'
    }

    const customer = new Customer({ id: '1', email: '', name: 'name', documentNumber: '' })

    jest.spyOn(mockRepo, 'getByName').mockResolvedValueOnce(customer)
    jest.spyOn(mockRepo, 'inactivate').mockResolvedValueOnce(true)

    await expect(useCase.inactivate(params)).resolves.toBeUndefined()
    expect(mockRepo.inactivate).toHaveBeenCalledWith(customer.id)
  })

  it('should inactivate customer by document number if found', async () => {
    const params: InactivateCustomerDTO = {
      documentNumber: '123'
    }

    const customer = new Customer({ id: '1', email: '', name: 'Inactive User', documentNumber: '123' })

    jest.spyOn(mockRepo, 'getByDocumentNumber').mockResolvedValueOnce(customer)
    jest.spyOn(mockRepo, 'inactivate').mockResolvedValueOnce(true)

    await expect(useCase.inactivate(params)).resolves.toBeUndefined()
    expect(mockRepo.inactivate).toHaveBeenCalledWith(customer.id)
  })
})