import { inject, injectable } from "tsyringe";
import { UpdateProductDTO } from "./UpdateProductDTO";
import { MissingNecessaryDataError } from "../../errors/MissingNecessaryData";
import { Category, Product } from "../../entities/Product";
import { InvalidParamError } from "../../errors/InvalidParam";
import { IProductRepository } from "../../ports/repositories/Product";
import { IUpdateProductUseCase } from "./IUpdateProduct";
import { NotFoundError } from "../../errors/NotFoundError";

@injectable()
export class UpdateProductUseCase implements IUpdateProductUseCase {
  constructor(
    @inject('IProductRepository')
    private readonly productRepository: IProductRepository
  ) { }

  async update(params: UpdateProductDTO): Promise<Product> {
    this.validateParams(params)

    const { name, category, description, price, productId } = params

    const isUpdated = await this.productRepository.update({ id: productId, name, category: category as Category, description, price });

    if (!isUpdated) throw new NotFoundError('Product not found')

    const updatedProduct = await this.productRepository.getById(productId)

    return updatedProduct!;
  }

  private validateParams(params: UpdateProductDTO) {
    if (params.category) {

      const isValidCategory = Object.values(Category).includes(params.category as Category)

      if (!isValidCategory) throw new InvalidParamError('Invalid param: category')
    }
  }
}