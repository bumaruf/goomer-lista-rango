import { inject, injectable } from 'tsyringe';
import { validate as validateUUID } from 'uuid';

import {
  UpdateRestaurantDTO,
  RestaurantsRepository,
} from '@interfaces/restaurant.interface';
import { OpeningHoursRepository } from '@interfaces/openingHours.interface';

import { RestaurantEntity } from '../entities/restaurant.entity';
import { AppError } from '../core/errors/AppError';
import { OpeningHoursEntity } from '../entities/openingHours.entity';

@injectable()
export class UpdateRestaurantService {
  constructor(
    @inject('RestaurantsRepository')
    private restaurantsRepository: RestaurantsRepository,

    @inject('OpeningHoursRepository')
    private openingHoursRepository: OpeningHoursRepository,
  ) {}

  public async execute({
    id,
    name,
    address,
    number,
    city,
    state,
    country,
    postal_code,
    opening_hours,
  }: UpdateRestaurantDTO): Promise<RestaurantEntity> {
    const restaurant = {
      ...new RestaurantEntity(),
      id,
      name,
      city,
      state,
      country,
      address,
      number,
      postal_code,
    };

    if (!validateUUID(id)) throw new AppError('Id must be of type uuid', 400);

    const foundedRestaurant = await this.restaurantsRepository.findOne(id);
    if (!foundedRestaurant) throw new AppError('Restaurant not founded', 400);

    const updatedRestaurant = await this.restaurantsRepository.updateById(
      restaurant,
    );

    let updatedOpeningHours: OpeningHoursEntity[];

    if (opening_hours) {
      this.checkOpeningHours({ opening_hours });

      await this.openingHoursRepository.deleteByRestaurantId(id);

      const formattedOpeningHours = opening_hours.map(openingHour => {
        return {
          ...new OpeningHoursEntity(),
          weekday: openingHour.weekday,
          start_at: openingHour.start_at,
          finish_at: openingHour.finish_at,
          restaurant_id: id,
        };
      });

      updatedOpeningHours = await this.openingHoursRepository.create(
        formattedOpeningHours,
      );
    } else {
      updatedOpeningHours =
        await this.openingHoursRepository.findByRestaurantId(id);
    }

    const updatedRestaurantWithOpeningHours = {
      ...(updatedRestaurant || foundedRestaurant),
      opening_hours: updatedOpeningHours,
    };

    return updatedRestaurantWithOpeningHours;
  }

  private checkOpeningHours({
    opening_hours,
  }: Required<Pick<UpdateRestaurantDTO, 'opening_hours'>>) {
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
