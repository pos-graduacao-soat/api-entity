import { inject, injectable } from 'tsyringe'
import { IProductRepository } from '../../domain/ports/repositories/Product'
import { Product } from '../../domain/entities/Product'
import { Collection } from 'mongodb'
import { MongoDbClient } from '../database/mongo'

@injectable()
export class ProductRepository implements IProductRepository {
  private readonly collection: Collection

  constructor(
    @inject('MongoDbClient') protected readonly mongoDbClient: MongoDbClient
  ) {
    this.collection = this.mongoDbClient.getCollection('products')
  }
  async create(product: Product): Promise<boolean> {
    const createdProduct = await this.collection.insertOne({
      id: product.id,
      name: product.name,
      category: product.category,
      price: product.price,
      description: product.description
    })

    return createdProduct.acknowledged
  }

  async getById(id: string): Promise<Product | null> {
    const product = await this.collection.findOne({ id })

    if (!product) return null

    return new Product({
      createdAt: product.created_at,
      updatedAt: product.updated_at,
      id: product.id,
      name: product.name,
      category: product.category,
      price: product.price,
      description: product.description,
    })
  }

  async getByIds(ids: string[]): Promise<Product[]> {
    const products = await this.collection.find({ id: { $in: ids } }).toArray()

    return products.map(product => new Product({
      createdAt: product.created_at,
      updatedAt: product.updated_at,
      id: product.id,
      name: product.name,
      category: product.category,
      price: product.price,
      description: product.description,
    }))
  }

  async list(filters: Partial<Product>): Promise<Product[]> {
    const parsedFilters = this.buildFilters(filters)

    const products = await this.collection.find(parsedFilters).toArray()

    return products.map(product => new Product({
      createdAt: product.created_at,
      updatedAt: product.updated_at,
      id: product.id,
      name: product.name,
      category: product.category,
      price: product.price,
      description: product.description,
    }))
  }

  async update(product: Partial<Product>): Promise<boolean> {
    const parsedFilters = this.buildFilters(product)

    const isUpdated = await this.collection.findOneAndUpdate({ id: product.id }, { $set: { ...parsedFilters, updated_at: new Date() } })

    return isUpdated?._id ? true : false
  }

  private buildFilters(filters: Partial<Product>) {
    const filtersArray = Object.entries(filters)

    const filtersObject: any = {}

    filtersArray.forEach(([key, value]) => {
      if (value) filtersObject[key] = value
    })

    return filtersObject
  }
}