import { inject, injectable } from 'tsyringe';

import {
  CreateRestaurantDTO,
  RestaurantsRepository,
} from '@interfaces/restaurant.interface';
import { OpeningHoursRepository } from '@interfaces/openingHours.interface';

import { OpeningHoursEntity } from '@entities/openingHours.entity';
import { RestaurantEntity } from '@entities/restaurant.entity';

import { AppError } from '@core/errors/AppError';

@injectable()
export class CreateRestaurantService {
  constructor(
    @inject('RestaurantsRepository')
    private restaurantsRepository: RestaurantsRepository,

    @inject('OpeningHoursRepository')
    private openingHoursRepository: OpeningHoursRepository,
  ) {}

  public async execute({
    name,
    address,
    number,
    city,
    state,
    country,
    postal_code,
    opening_hours,
  }: CreateRestaurantDTO): Promise<RestaurantEntity> {
    const restaurant = {
      ...new RestaurantEntity(),
      name,
      city,
      state,
      country,
      address,
      number,
      postal_code,
    };

    const createdRestaurant = await this.restaurantsRepository.create(
      restaurant,
    );

    this.checkOpeningHours({ opening_hours });

    const formattedOpeningHours = opening_hours.map(openingHour => {
      return {
        ...new OpeningHoursEntity(),
        weekday: openingHour.weekday,
        start_at: openingHour.start_at,
        finish_at: openingHour.finish_at,
        restaurant_id: createdRestaurant.id,
      };
    });

    const createdOpeningHours = await this.openingHoursRepository.create(
      formattedOpeningHours,
    );

    const createdRestaurantWithOpeningHours = {
      ...createdRestaurant,
      opening_hours: createdOpeningHours,
    };

    return createdRestaurantWithOpeningHours;
  }

  private checkOpeningHours({
    opening_hours,
  }: Pick<CreateRestaurantDTO, 'opening_hours'>) {
    opening_hours.forEach(openingHour => {
      const startAt = openingHour.start_at.split(':');
      const finisAt = openingHour.finish_at.split(':');

      const currentDate = new Date();
      const currentYear = Number(currentDate.getFullYear());
      const currentMonth = Number(currentDate.getMonth());
      const currentDay = Number(currentDate.getDate());

      const startDate = new Date(
        currentYear,
        currentMonth,
        currentDay,
        Number(startAt[0]),
        Number(startAt[1]),
      );

      const finishDate = new Date(
        currentYear,
        currentMonth,
        currentDay,
        Number(finisAt[0]),
        Number(finisAt[1]),
      );

      if (finishDate < startDate)
        throw new AppError(
          "field 'finish_at' cannot be greater than 'start_at'",
        );

      const diffTime = Math.abs(startDate.getTime() - finishDate.getTime());
      const minutes = Math.round(diffTime / 60000);

      if (minutes < 15)
        throw new AppError(
          "field 'start_at' and 'finish_at' must have a 15 minutes interval",
        );
    });
  }
}
