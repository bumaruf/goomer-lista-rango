import { inject, injectable } from 'tsyringe';
import { validate as validateUUID } from 'uuid';

import { RestaurantsRepository } from '@interfaces/restaurant.interface';
import {
  ProductsRepository,
  UpdateProductDTO,
} from '@interfaces/product.interface';

import { ProductEntity } from '@entities/product.entity';

import { AppError } from '@core/errors/AppError';

@injectable()
export class UpdateProductService {
  constructor(
    @inject('RestaurantsRepository')
    private restaurantsRepository: RestaurantsRepository,

    @inject('ProductsRepository')
    private productsRepository: ProductsRepository,
  ) {}

  public async execute({
    id,
    name,
    category,
    price,
  }: UpdateProductDTO): Promise<ProductEntity | null> {
    if (!validateUUID(id)) throw new AppError('id must be of type uuid', 400);

    const foundedProduct = await this.productsRepository.findOne(id);
    if (!foundedProduct) throw new AppError('Product not found', 404);

    const updatedProduct = await this.productsRepository.updateById({
      id,
      name,
      category,
      price,
    });

    if (!updatedProduct)
      throw new AppError(
        'To update product its necessary send at least one field',
        400,
      );

    return updatedProduct;
  }
}
