import { inject, injectable } from 'tsyringe';
import { validate as validateUUID } from 'uuid';

import { RestaurantEntity } from '@entities/restaurant.entity';
import { RestaurantsRepository } from '@interfaces/restaurant.interface';

import { AppError } from '@core/errors/AppError';

@injectable()
export class ShowRestaurantsService {
  constructor(
    @inject('RestaurantsRepository')
    private restaurantsRepository: RestaurantsRepository,
  ) {}

  public async execute(id: string): Promise<RestaurantEntity> {
    if (!validateUUID(id)) throw new AppError('Id must be of type uuid', 400);

    const foundedRestaurant = await this.restaurantsRepository.findOne(id);

    if (!foundedRestaurant) throw new AppError('Restaurant not founded', 400);

    return foundedRestaurant;
  }
}
