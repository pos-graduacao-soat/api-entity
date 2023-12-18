import { inject, injectable } from 'tsyringe'
import { ICustomerRepository } from '../../domain/ports/repositories/Customer'
import { Customer } from '../../domain/entities/Customer'
import { MongoDbClient } from '../database/mongo'
import { Collection } from 'mongodb'

@injectable()
export class CustomerRepository implements ICustomerRepository {
  private readonly collection: Collection

  constructor(
    @inject('MongoDbClient') protected readonly mongoDbClient: MongoDbClient
  ) {
    this.collection = this.mongoDbClient.getCollection('customers')
  }
  async create(customer: Customer): Promise<boolean> {
    const createdCustomer = await this.collection.insertOne({
      id: customer.id,
      name: customer.name,
      email: customer.email,
      documentNumber: customer.documentNumber
    })

    return createdCustomer.acknowledged
  }

  async getById(id: string): Promise<Customer | null> {
    const customer = await this.collection.findOne({ id })

    if (!customer) return null

    return new Customer({
      createdAt: customer.createdAt,
      updatedAt: customer.updatedAt,
      id: customer.id,
      name: customer.name,
      email: customer.email,
      documentNumber: customer.documentNumber
    })
  }

  async getByEmail(email: string): Promise<Customer | null> {
    const customer = await this.collection.findOne({ email })

    if (!customer) return null

    return new Customer({
      createdAt: customer.createdAt,
      updatedAt: customer.updatedAt,
      id: customer.id,
      name: customer.name,
      email: customer.email,
      documentNumber: customer.documentNumber
    })
  }

  async getByDocumentNumber(documentNumber: string): Promise<Customer | null> {
    const customer = await this.collection.findOne({ documentNumber })

    if (!customer) return null

    return new Customer({
      createdAt: customer.createdAt,
      updatedAt: customer.updatedAt,
      id: customer.id,
      name: customer.name,
      email: customer.email,
      documentNumber: customer.documentNumber
    })
  }
}