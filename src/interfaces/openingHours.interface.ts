import { OpeningHoursEntity } from '@entities/openingHours.entity';

export type CreateOpeningHoursDTO = Omit<
  OpeningHoursEntity,
  'id' | 'created_at' | 'updated_at'
>;

export type CreateOpeningHourRepository = Omit<
  OpeningHoursEntity,
  'created_at' | 'updated_at'
>;

export interface OpeningHoursRepository {
  create(
    opening_hours: CreateOpeningHourRepository[],
  ): Promise<OpeningHoursEntity[]>;

  findByRestaurantId({
    restaurantId,
  }: {
    restaurantId: string;
  }): Promise<OpeningHoursEntity[]>;

  deleteByRestaurantId({
    restaurantId,
  }: {
    restaurantId: string;
  }): Promise<void>;
}
