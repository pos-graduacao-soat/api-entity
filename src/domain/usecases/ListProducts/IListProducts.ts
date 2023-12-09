import { Product } from "../../entities/Product";
import { ListProductsDTO } from "./ListProductsDTO";

export interface IListProductsUseCase {
  list: (params: ListProductsDTO) => Promise<Product[]>
}