/* eslint-disable camelcase */
import { createConnection } from '@core/database/connection';

import {
  CreateRestaurantRepository,
  RestaurantsRepository as RestaurantsRepositoryInterface,
} from '@interfaces/restaurant.interface';

import { RestaurantEntity } from '@entities/restaurant.entity';

export class RestaurantsRepository implements RestaurantsRepositoryInterface {
  public async create({
    id,
    name,
    city,
    state,
    number,
    country,
    address,
    postal_code,
  }: CreateRestaurantRepository): Promise<RestaurantEntity> {
    const client = await createConnection();

    const { rows } = await client.query(
      `INSERT INTO RESTAURANTS(ID, NAME, CITY, ADDRESS, NUMBER, STATE, COUNTRY, POSTAL_CODE)
      VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [id, name, city, address, number, state, country, postal_code],
    );

    return rows[0];
  }

  public async findAll(): Promise<RestaurantEntity[]> {
    const client = await createConnection();

    const { rows } = await client.query(
      `SELECT RES.*,
        jsonb_agg(
          jsonb_build_object(
            'weekday', OPE.WEEKDAY,
            'start_at', TO_CHAR(OPE.START_AT, 'HH24:MI'),
            'finish_at', TO_CHAR(OPE.FINISH_AT, 'HH24:MI')
          )
        ) as opening_hours
        FROM RESTAURANTS RES INNER JOIN OPENING_HOURS OPE ON RES.ID = OPE.RESTAURANT_ID GROUP BY RES.ID;`,
    );

    return rows;
  }
}
