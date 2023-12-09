import { Product } from "../../entities/Product";
import { UpdateProductDTO } from "./UpdateProductDTO";

export interface IUpdateProductUseCase {
  update: (params: UpdateProductDTO) => Promise<Product>
}