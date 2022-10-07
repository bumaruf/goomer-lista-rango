import { createConnection } from '@core/database/connection';

import {
  CreateProductRepository,
  ProductsRepository as ProductsRepositoryInterface,
  UpdateProductRepository,
} from '@interfaces/product.interface';

import { ProductEntity } from '@entities/product.entity';

export class ProductsRepository implements ProductsRepositoryInterface {
  public async create({
    id,
    name,
    price,
    category,
    restaurant_id,
  }: CreateProductRepository): Promise<ProductEntity> {
    const client = await createConnection();

    const {
      rows: [product],
    } = await client.query(
      `INSERT INTO PRODUCTS(ID, NAME, PRICE, CATEGORY, RESTAURANT_ID) VALUES($1, $2, $3, $4, $5)
      RETURNING ID, NAME, PHOTO, PRICE::FLOAT, CATEGORY, CREATED_AT, UPDATED_AT`,
      [id, name, price, category, restaurant_id],
    );

    return product;
  }

  public async findByRestaurantId(id: string): Promise<ProductEntity[]> {
    const client = await createConnection();

    const { rows } = await client.query(
      `SELECT ID, NAME, PHOTO, PRICE, CATEGORY, CREATED_AT, UPDATED_AT FROM PRODUCTS WHERE RESTAURANT_ID = $1`,
      [id],
    );

    return rows;
  }

  public async findOne(id: string): Promise<ProductEntity | null> {
    const client = await createConnection();

    const {
      rows: [product],
    } = await client.query(`SELECT * FROM PRODUCTS WHERE ID = '${id}'`);

    return product;
  }

  public async updateById({
    id,
    name,
    category,
    price,
  }: UpdateProductRepository): Promise<ProductEntity | null> {
    const client = await createConnection();

    const optionalParameters = [];

    if (name) optionalParameters.push(`NAME = '${name}'`);
    if (category) optionalParameters.push(`CATEGORY = '${category}'`);
    if (price) optionalParameters.push(`PRICE = '${price}'`);

    if (optionalParameters.length === 0) {
      return null;
    }

    const updatedParams = optionalParameters.join(', ');

    const {
      rows: [updatedProduct],
    } = await client.query(
      `UPDATE PRODUCTS SET ${updatedParams} WHERE ID = '${id}' RETURNING *`,
    );

    return updatedProduct;
  }

  public async updatePhotoById({
    id,
    filename,
  }: {
    id: string;
    filename: string;
  }): Promise<ProductEntity> {
    const client = await createConnection();

    const {
      rows: [updatedProduct],
    } = await client.query(
      `UPDATE PRODUCTS SET PHOTO = '${filename}' WHERE ID = '${id}' RETURNING *`,
    );

    return updatedProduct;
  }

  public async delete(id: string): Promise<void> {
    const client = await createConnection();

    await client.query(`DELETE FROM PRODUCTS WHERE ID = '${id}'`);
  }
}
