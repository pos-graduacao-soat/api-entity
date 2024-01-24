import 'reflect-metadata'
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { MongoClient } from 'mongodb'
import { MongoMemoryServer } from 'mongodb-memory-server'
import { ProductRepository } from '../../../src/infra/repositories/Product'
import { MongoDbClient } from '../../../src/infra/database/mongo'
import { Category, Product } from '../../../src/domain/entities/Product'

describe('Product Repository Integration Tests', () => {
  let mongoServer: MongoMemoryServer
  let client: MongoClient
  let mongoDbClient: MongoDbClient

  beforeAll(async () => {
    mongoServer = new MongoMemoryServer()
    await mongoServer.start()

    const mongoUri = mongoServer.getUri()
    client = new MongoClient(mongoUri, {})

    await client.connect()

    mongoDbClient = new MongoDbClient(client)
  })

  afterAll(async () => {
    await client.close()
    await mongoServer.stop()
  })

  beforeEach(async () => {
    await client.db().collection('products').deleteMany({})
  })

  function insertProduct(product: Product) {
    return client.db().collection('products').insertOne(product)
  }

  describe('create', () => {
    it('should create a new product', async () => {
      const productData = {
        name: 'soda',
        category: Category.Beverages,
        price: 12,
        description: 'description'
      }

      const mockedProduct = new Product(productData)

      const productRepository = new ProductRepository(mongoDbClient)
      const created = await productRepository.create(mockedProduct)

      expect(created).toBe(true)
    })
  })

  describe('getById', () => {
    it('should get a product by ID', async () => {
      const productData = {
        name: 'soda',
        category: Category.Beverages,
        price: 12,
        description: 'description'
      }

      const mockedProduct = new Product(productData)

      const productRepository = new ProductRepository(mongoDbClient)

      await insertProduct(mockedProduct)

      const product = await productRepository.getById(mockedProduct.id)

      expect(product).toBeDefined()
      expect(product?.name).toBe(productData.name)
      expect(product?.category).toBe(productData.category)
      expect(product?.price).toBe(productData.price)
      expect(product?.description).toBe(productData.description)
    })

    it('should return null if product is not found', async () => {
      const productRepository = new ProductRepository(mongoDbClient)

      const product = await productRepository.getById('12345')

      expect(product).toBeNull()
    })
  })

  describe('getByIds', () => {
    it('should get products by IDs', async () => {
      const productData = {
        name: 'soda',
        category: Category.Beverages,
        price: 12,
        description: 'description'
      }

      const mockedProduct = new Product(productData)

      const productRepository = new ProductRepository(mongoDbClient)

      await insertProduct(mockedProduct)

      const products = await productRepository.getByIds([mockedProduct.id])

      expect(products.length).toBe(1)
      expect(products[0].name).toBe(productData.name)
      expect(products[0].category).toBe(productData.category)
      expect(products[0].price).toBe(productData.price)
      expect(products[0].description).toBe(productData.description)
    })

    it('should return empty array if products are not found', async () => {
      const productRepository = new ProductRepository(mongoDbClient)

      const products = await productRepository.getByIds(['12345'])

      expect(products.length).toBe(0)
    })
  })

  describe('list', () => {
    it('should list products correctly', async () => {
      const productData = {
        name: 'soda',
        category: Category.Beverages,
        price: 12,
        description: 'description'
      }

      await insertProduct(new Product(productData))
      await insertProduct(new Product({ ...productData, name: 'water' }))
      await insertProduct(new Product({ ...productData, name: 'diet soda' }))

      const productRepository = new ProductRepository(mongoDbClient)

      const products = await productRepository.list({})

      expect(products.length).toBe(3)
    })

    it('should filter correctly from the list', async () => {
      const productData = {
        name: 'soda',
        category: Category.Beverages,
        price: 12,
        description: 'description'
      }

      await insertProduct(new Product(productData))
      await insertProduct(new Product({ ...productData, name: 'water' }))
      await insertProduct(new Product({ ...productData, name: 'diet soda' }))

      const productRepository = new ProductRepository(mongoDbClient)

      const products = await productRepository.list({ name: productData.name })

      expect(products.length).toBe(1)
      expect(products[0].name).toBe(productData.name)
      expect(products[0].category).toBe(productData.category)
      expect(products[0].price).toBe(productData.price)
      expect(products[0].description).toBe(productData.description)
    })

    it('should return empty array if products are not found', async () => {
      const productRepository = new ProductRepository(mongoDbClient)

      const products = await productRepository.list({})

      expect(products.length).toBe(0)
    })
  })

  describe('update', () => {
    it('should update a product correctly', async () => {
      const productData = {
        name: 'soda',
        category: Category.Beverages,
        price: 12,
        description: 'description'
      }

      const mockedProduct = new Product(productData)

      const productRepository = new ProductRepository(mongoDbClient)

      await insertProduct(mockedProduct)

      const updatedData = {
        name: 'diet soda',
        category: Category.Beverages,
        price: 10,
        description: 'diet soda ugh'
      }

      const updatedProduct = new Product({ ...updatedData, id: mockedProduct.id })

      const product = await productRepository.update(updatedProduct)

      expect(product).toBeTruthy()

      const updatedProductFromDb = await client.db().collection('products').findOne({ id: updatedProduct.id })

      expect(updatedProductFromDb?.name).toBe(updatedProduct.name)
      expect(updatedProductFromDb?.category).toBe(updatedProduct.category)
      expect(updatedProductFromDb?.price).toBe(updatedProduct.price)
      expect(updatedProductFromDb?.description).toBe(updatedProduct.description)
    })

    it('should return false if product is not updated', async () => {
      const productData = {
        name: 'soda',
        category: Category.Beverages,
        price: 12,
        description: 'description'
      }

      const mockedProduct = new Product(productData)

      const productRepository = new ProductRepository(mongoDbClient)

      const product = await productRepository.update(mockedProduct)

      expect(product).toBeFalsy()
    })
  })
})
