import { ProductEntity } from '@entities/product.entity';

export type CreateProductDTO = Omit<
  ProductEntity,
  'id' | 'photo' | 'created_at' | 'updated_at'
>;

export type CreateProductRepository = Omit<
  ProductEntity,
  'photo' | 'created_at' | 'updated_at'
>;

export type UpdateProductDTO = Partial<
  Omit<CreateProductDTO, 'restaurant_id'>
> & { id: string };

export type UpdateProductRepository = Partial<
  Omit<ProductEntity, 'restaurant_id' | 'photo' | 'created_at' | 'updated_at'>
> & { id: string };

export interface ProductsRepository {
  create({
    id,
    name,
    category,
    price,
  }: CreateProductRepository): Promise<ProductEntity>;

  findOne(id: string): Promise<ProductEntity | null>;

  findByRestaurantId(restaurantId: string): Promise<ProductEntity[]>;

  updateById({
    id,
    category,
    name,
    price,
  }: UpdateProductRepository): Promise<ProductEntity | null>;

  updatePhotoById({
    id,
    filename,
  }: {
    id: string;
    filename: string;
  }): Promise<ProductEntity>;

  delete(id: string): Promise<void>;
}
