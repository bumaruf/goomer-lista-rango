import { inject, injectable } from 'tsyringe';
import { validate as validateUUID } from 'uuid';

import { RestaurantEntity } from '@entities/restaurant.entity';

import { RestaurantsRepository } from '@interfaces/restaurant.interface';
import { OpeningHoursRepository } from '@interfaces/openingHours.interface';
import { StorageProvider } from '@interfaces/storageProvider.interface';

import { AppError } from '@core/errors/AppError';

@injectable()
export class UpdateRestaurantPhotoService {
  constructor(
    @inject('RestaurantsRepository')
    private restaurantsRepository: RestaurantsRepository,

    @inject('OpeningHoursRepository')
    private openingHoursRepository: OpeningHoursRepository,

    @inject('StorageProvider')
    private storageProvider: StorageProvider,
  ) {}

  public async execute({
    id,
    filename,
  }: {
    id: string;
    filename: string;
  }): Promise<RestaurantEntity> {
    if (!validateUUID(id)) throw new AppError('Id must be of type uuid', 400);

    const foundedRestaurant = await this.restaurantsRepository.findOne(id);
    if (!foundedRestaurant) throw new AppError('Restaurant not founded', 404);

    if (foundedRestaurant.photo)
      await this.storageProvider.deleteFile(foundedRestaurant.photo);

    const storagePhotoFilename = await this.storageProvider.saveFile(filename);

    const updatedRestaurantPhoto =
      await this.restaurantsRepository.updatePhotoById({
        id,
        filename: storagePhotoFilename,
      });

    const restaurantOpeningHours =
      await this.openingHoursRepository.findByRestaurantId(id);

    const updatedRestaurantWithOpeningHours = {
      ...updatedRestaurantPhoto,
      opening_hours: restaurantOpeningHours,
    };

    return updatedRestaurantWithOpeningHours;
  }
}
