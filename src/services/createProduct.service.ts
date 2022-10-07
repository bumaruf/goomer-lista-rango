import { inject, injectable } from 'tsyringe';

import { RestaurantsRepository } from '@interfaces/restaurant.interface';
import {
  ProductsRepository,
  CreateProductDTO,
} from '@interfaces/product.interface';

import { ProductEntity } from '@entities/product.entity';

import { AppError } from '@core/errors/AppError';

@injectable()
export class CreateProductService {
  constructor(
    @inject('RestaurantsRepository')
    private restaurantsRepository: RestaurantsRepository,

    @inject('ProductsRepository')
    private productsRepository: ProductsRepository,
  ) {}

  public async execute({
    restaurant_id,
    name,
    category,
    price,
  }: CreateProductDTO): Promise<ProductEntity> {
    const foundedRestaurant = await this.restaurantsRepository.findOne(
      restaurant_id,
    );

    if (!foundedRestaurant) throw new AppError('Restaurant not found', 404);

    const product = {
      ...new ProductEntity(),
      restaurant_id,
      name,
      price,
      category,
    };

    const createdProduct = await this.productsRepository.create(product);

    return createdProduct;
  }
}
