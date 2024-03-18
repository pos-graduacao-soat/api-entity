import 'reflect-metadata'
import { Customer } from '../../../src/domain/entities/Customer'
import { CustomerAlreadyExistsError } from '../../../src/domain/errors/CustomerAlreadyExists'
import { MissingEmailError } from '../../../src/domain/errors/MissingEmail'
import { MissingNameError } from '../../../src/domain/errors/MissingName'
import { MissingNecessaryDataError } from '../../../src/domain/errors/MissingNecessaryData'
import { ICustomerRepository } from '../../../src/domain/ports/repositories/Customer'
import { CreateCustomerDTO, CreateCustomerUseCase } from '../../../src/domain/usecases'

describe('CreateCustomerUseCase', () => {
  let customerRepository: jest.Mocked<ICustomerRepository>
  let createCustomerUseCase: CreateCustomerUseCase

  beforeEach(() => {
    customerRepository = {
      create: jest.fn(),
      getById: jest.fn(),
      getByEmail: jest.fn(),
      getByDocumentNumber: jest.fn(),
      getByName: jest.fn(),
      inactivate: jest.fn(),
    }

    createCustomerUseCase = new CreateCustomerUseCase(customerRepository)
  })

  it('should throw MissingEmailError if name is provided but email is not', async () => {
    const params: CreateCustomerDTO = { name: 'John Doe' }

    await expect(createCustomerUseCase.create(params)).rejects.toThrow(MissingEmailError)
  })

  it('should throw MissingNameError if email is provided but name is not', async () => {
    const params: CreateCustomerDTO = { email: 'john.doe@example.com' }

    await expect(createCustomerUseCase.create(params)).rejects.toThrow(MissingNameError)
  })

  it('should throw MissingNecessaryDataError if name, email and documentNumber are not provided', async () => {
    const params: CreateCustomerDTO = {}

    await expect(createCustomerUseCase.create(params)).rejects.toThrow(MissingNecessaryDataError)
  })

  it('should throw CustomerAlreadyExistsError if customer with same documentNumber already exists', async () => {
    const params: CreateCustomerDTO = { name: 'John Doe', email: 'john.doe@example.com', documentNumber: '123456789' }

    customerRepository.getByDocumentNumber.mockResolvedValueOnce(new Customer(params))

    await expect(createCustomerUseCase.create(params)).rejects.toThrow(CustomerAlreadyExistsError)
  })

  it('should throw CustomerAlreadyExistsError if customer with same email already exists', async () => {
    const params: CreateCustomerDTO = { name: 'John Doe', email: 'john.doe@example.com' }

    customerRepository.getByEmail.mockResolvedValueOnce(new Customer(params))

    await expect(createCustomerUseCase.create(params)).rejects.toThrow(CustomerAlreadyExistsError)
  })

  it('should throw a generic error if for some reason customer repository returns false when creating new customer', async () => {
    const params: CreateCustomerDTO = { name: 'John Doe', email: 'john.doe@example.com' }

    customerRepository.create.mockResolvedValueOnce(false)

    await expect(createCustomerUseCase.create(params)).rejects.toThrow(Error)
  })

  it('should create a new customer if valid data is provided and customer does not already exist', async () => {
    const params: CreateCustomerDTO = { name: 'John Doe', email: 'john.doe@example.com' }

    const newCustomer = new Customer(params)

    customerRepository.create.mockResolvedValueOnce(true)
    customerRepository.getById.mockResolvedValueOnce(newCustomer)

    const result = await createCustomerUseCase.create(params)

    expect(result.name).toEqual(params.name)
    expect(result.email).toEqual(params.email)
    expect(customerRepository.create).toHaveBeenCalledWith(expect.objectContaining(params))
  })
})