import { inject, injectable } from 'tsyringe';

import { RestaurantEntity } from '@entities/restaurant.entity';
import { RestaurantsRepository } from '../interfaces/restaurant.interface';

@injectable()
export class ListRestaurantsService {
  constructor(
    @inject('RestaurantsRepository')
    private restaurantsRepository: RestaurantsRepository,
  ) {}

  public async execute(): Promise<RestaurantEntity[]> {
    const foundedRestaurants = await this.restaurantsRepository.findAll();

    return foundedRestaurants;
  }
}
