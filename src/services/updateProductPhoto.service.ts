import { inject, injectable } from 'tsyringe';
import { validate as validateUUID } from 'uuid';

import { ProductsRepository } from '@interfaces/product.interface';
import { StorageProvider } from '@interfaces/storageProvider.interface';

import { ProductEntity } from '@entities/product.entity';

import { AppError } from '@core/errors/AppError';

@injectable()
export class UpdateProductPhotoService {
  constructor(
    @inject('ProductsRepository')
    private productRepository: ProductsRepository,

    @inject('StorageProvider')
    private storageProvider: StorageProvider,
  ) {}

  public async execute({
    id,
    filename,
  }: {
    id: string;
    filename: string;
  }): Promise<ProductEntity> {
    if (!validateUUID(id)) throw new AppError('Id must be of type uuid', 400);

    const foundedProduct = await this.productRepository.findOne(id);

    console.log(foundedProduct);

    if (!foundedProduct) throw new AppError('Product not founded', 404);

    if (foundedProduct.photo)
      await this.storageProvider.deleteFile(foundedProduct.photo);

    const storagePhotoFilename = await this.storageProvider.saveFile(filename);

    const updatedRestaurantPhoto = await this.productRepository.updatePhotoById(
      {
        id,
        filename: storagePhotoFilename,
      },
    );

    return updatedRestaurantPhoto;
  }
}
