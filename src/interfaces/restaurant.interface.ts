import { RestaurantEntity } from '@entities/restaurant.entity';
import { OpeningHoursEntity } from '@entities/openingHours.entity';

export type CreateRestaurantDTO = Omit<
  RestaurantEntity,
  'id' | 'photo' | 'created_at' | 'updated_at'
> & {
  opening_hours: Pick<
    OpeningHoursEntity,
    'weekday' | 'start_at' | 'finish_at'
  >[];
};

export type CreateRestaurantRepository = Omit<
  RestaurantEntity,
  'photo' | 'createdAt' | 'updatedAt'
>;

export interface RestaurantsRepository {
  create({
    name,
    city,
    state,
    number,
    address,
    country,
    postal_code,
  }: CreateRestaurantRepository): Promise<RestaurantEntity>;

  findAll(): Promise<RestaurantEntity[]>;
}
