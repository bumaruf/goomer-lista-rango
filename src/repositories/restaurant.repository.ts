import { createConnection } from '@core/database/connection';

import {
  CreateRestaurantRepository,
  UpdateRestaurantRepository,
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

  public async findOne(id: string): Promise<RestaurantEntity> {
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
        FROM RESTAURANTS RES INNER JOIN OPENING_HOURS OPE ON RES.ID = OPE.RESTAURANT_ID WHERE RES.ID = $1 GROUP BY RES.ID;`,
      [id],
    );

    return rows[0];
  }

  public async updateById({
    id,
    name,
    city,
    state,
    number,
    address,
    country,
    postal_code,
  }: UpdateRestaurantRepository): Promise<RestaurantEntity | undefined> {
    const client = await createConnection();

    // eslint-disable-next-line prefer-const
    let optionalParameters = [];

    if (name) optionalParameters.push(`NAME = '${name}'`);
    if (city) optionalParameters.push(`CITY = '${city}'`);
    if (state) optionalParameters.push(`STATE = '${state}'`);
    if (number) optionalParameters.push(`NUMBER = '${number}'`);
    if (address) optionalParameters.push(`ADDRESS = '${address}'`);
    if (country) optionalParameters.push(`COUNTRY = '${country}'`);
    if (postal_code) optionalParameters.push(`POSTAL_CODE = '${postal_code}'`);

    if (optionalParameters.length === 0) return;

    const updatedParams = optionalParameters.join(', ');

    const { rows } = await client.query(
      `UPDATE RESTAURANTS SET ${updatedParams} WHERE ID = '${id}' RETURNING *`,
    );

    return rows[0];
  }

  public async updatePhotoById({
    id,
    filename,
  }: {
    id: string;
    filename: string;
  }): Promise<RestaurantEntity> {
    const client = await createConnection();

    const { rows } = await client.query(
      `UPDATE RESTAURANTS SET PHOTO = '${filename}' WHERE ID = '${id}' RETURNING *`,
    );

    return rows[0];
  }

  public async delete(id: string): Promise<void> {
    const client = await createConnection();

    await client.query(`DELETE FROM RESTAURANTS WHERE ID = '${id}'`);
  }
}
