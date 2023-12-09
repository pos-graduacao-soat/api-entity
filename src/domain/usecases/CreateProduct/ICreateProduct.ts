import { Product } from "../../entities/Product";
import { CreateProductDTO } from "./CreateProductDTO";

export interface ICreateProductUseCase {
  create: (params: CreateProductDTO) => Promise<Product>
}