import { Product } from '../../entities/Product'

export interface IProductRepository {
  create: (product: Product) => Promise<boolean>
  list: (filters: Partial<Product>) => Promise<Product[]>
  getById: (id: string) => Promise<Product | null>
  getByIds: (ids: string[]) => Promise<Product[]>
  update: (product: Partial<Product>) => Promise<boolean>
}