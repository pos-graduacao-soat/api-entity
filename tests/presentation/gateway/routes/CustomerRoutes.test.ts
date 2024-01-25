import 'reflect-metadata'
import request from 'supertest'
import { MongoMemoryServer } from 'mongodb-memory-server'
import { MongoClient } from 'mongodb'
import { Server } from 'http'

import { startHttpServer } from '../../../../src/presentation/gateway/httpServer'
import { initializeContainer } from '../../../../src/main/factories'
import { Customer } from '../../../../src/domain/entities/Customer'

let mongoServer: MongoMemoryServer
let client: MongoClient

describe('Customer Routes', () => {
  let server: Server

  beforeAll(async () => {
    mongoServer = new MongoMemoryServer({
      instance: { port: 27017, dbName: 'jest' }
    })
    await mongoServer.start()

    const mongoUri = mongoServer.getUri()
    client = new MongoClient(mongoUri, {})

    await client.connect()

    await initializeContainer()
    server = startHttpServer()
  })

  afterAll((done) => {
    server.close(() => {
      client.close().then(() => {
        mongoServer.stop().then(() => done())
      })
    })
  })

  beforeEach(async () => {
    await client.db().collection('customers').deleteMany({})
  })

  async function createCustomer(params: Partial<Customer>) {
    const customer = new Customer({ ...params })

    await client.db().collection('customers').insertOne(customer)

    return customer
  }

  describe('POST /customers', () => {
    it('should respond with a 400 if customer data is missing', async () => {
      const response = await request(server).post('/customers')
      expect(response.status).toBe(400)
    })

    it('should respond with a 409 if customer is already found with email and name', async () => {
      const customer = await createCustomer({ name: 'John Doe', email: 'email@mail.com' })

      const response = await request(server).post('/customers').send({ name: customer.name, email: customer.email })
      expect(response.status).toBe(409)
    })

    it('should respond with a 409 if customer is already found with document number', async () => {
      const customer = await createCustomer({ documentNumber: '12345678900' })

      const response = await request(server).post('/customers').send({ documentNumber: customer.documentNumber })
      expect(response.status).toBe(409)
    })

    it('should respond with a 201 and the data if customer is created correctly with name and email', async () => {
      const customerData = { name: 'John Doe', email: 'email@mail.com' }

      const response = await request(server).post('/customers').send(customerData)

      expect(response.status).toBe(201)
      expect(response.body.data).toBeDefined()
      expect(response.body.data.id).toBeDefined()
      expect(response.body.data.name).toEqual(customerData.name)
      expect(response.body.data.email).toEqual(customerData.email)
    })

    it('should respond with a 201 and the data if customer is created correctly document number', async () => {
      const customerData = { documentNumber: '12345678900' }

      const response = await request(server).post('/customers').send(customerData)

      expect(response.status).toBe(201)
      expect(response.body.data).toBeDefined()
      expect(response.body.data.id).toBeDefined()
      expect(response.body.data.documentNumber).toEqual(customerData.documentNumber)
    })
  })

  describe('GET /customers/customerId', () => {
    it('should respond with a 404 if customer is not found', async () => {
      const customerId = '12345'

      const response = await request(server).get(`/customers/${customerId}`)
      expect(response.status).toBe(404)
    })

    it('should respond with a 200 and return customer data if found', async () => {
      const customer = await createCustomer({ name: 'John Doe', email: 'customer@email.com' })

      const response = await request(server).get(`/customers/${customer.id}`)

      expect(response.status).toBe(200)
      expect(response.body.data).toBeDefined()
      expect(response.body.data.id).toBeDefined()
      expect(response.body.data.name).toEqual(customer.name)
      expect(response.body.data.email).toEqual(customer.email)
    })
  })
})