import format from 'pg-format';
import { createConnection } from '@core/database/connection';

import {
  CreateOpeningHourRepository,
  OpeningHoursRepository as OpeningHoursRepositoryInterface,
} from '@interfaces/openingHours.interface';

import { OpeningHoursEntity } from '@entities/openingHours.entity';

export class OpeningHoursRepository implements OpeningHoursRepositoryInterface {
  async create(
    openingHours: CreateOpeningHourRepository[],
  ): Promise<OpeningHoursEntity[]> {
    const client = await createConnection();

    const formattedHours = openingHours.map(openingHour => [
      openingHour.id,
      openingHour.weekday,
      openingHour.start_at,
      openingHour.finish_at,
      openingHour.restaurant_id,
    ]);

    const { rows } = await client.query(
      format(
        `INSERT INTO OPENING_HOURS(ID, WEEKDAY, START_AT, FINISH_AT, RESTAURANT_ID)
        VALUES %L RETURNING WEEKDAY, TO_CHAR(START_AT, 'HH24:MI') AS START_AT, TO_CHAR(FINISH_AT, 'HH24:MI') AS FINISH_AT`,
        formattedHours,
      ),
    );

    return rows;
  }

  findByRestaurantId({
    restaurantId,
  }: {
    restaurantId: string;
  }): Promise<OpeningHoursEntity[]> {
    throw new Error('Method not implemented.');
  }

  deleteByRestaurantId({
    restaurantId,
  }: {
    restaurantId: string;
  }): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
