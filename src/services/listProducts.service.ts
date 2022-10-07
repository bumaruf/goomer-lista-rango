import { inject, injectable } from 'tsyringe';

import { RestaurantsRepository } from '@interfaces/restaurant.interface';
import { ProductsRepository } from '@interfaces/product.interface';

import { ProductEntity } from '@entities/product.entity';

import { AppError } from '@core/errors/AppError';

@injectable()
export class ListProductsService {
  constructor(
    @inject('RestaurantsRepository')
    private restaurantsRepository: RestaurantsRepository,

    @inject('ProductsRepository')
    private productsRepository: ProductsRepository,
  ) {}

  public async execute(restaurant_id: string): Promise<ProductEntity[]> {
    const foundedRestaurant = await this.restaurantsRepository.findOne(
      restaurant_id,
    );
    if (!foundedRestaurant) throw new AppError('Restaurant not found');

    const products = await this.productsRepository.findByRestaurantId(
      restaurant_id,
    );

    return products;
  }
}
