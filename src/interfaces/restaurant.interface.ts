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
  'photo' | 'created_at' | 'updated_at'
>;

export type UpdateRestaurantDTO = Partial<CreateRestaurantDTO> & { id: string };

export type UpdateRestaurantRepository = Partial<
  Omit<RestaurantEntity, 'photo' | 'created_at' | 'updated_at'>
> & { id: string };

export interface RestaurantsRepository {
  create({
    id,
    name,
    city,
    state,
    number,
    address,
    country,
    postal_code,
  }: CreateRestaurantRepository): Promise<RestaurantEntity>;

  findAll(): Promise<RestaurantEntity[]>;

  findOne(id: string): Promise<RestaurantEntity | null>;

  updateById({
    id,
    name,
    city,
    state,
    number,
    address,
    country,
    postal_code,
  }: UpdateRestaurantRepository): Promise<RestaurantEntity | null>;

  updatePhotoById({
    id,
    filename,
  }: {
    id: string;
    filename: string;
  }): Promise<RestaurantEntity>;

  delete(id: string): Promise<void>;
}
