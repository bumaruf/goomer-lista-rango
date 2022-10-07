import { inject, injectable } from 'tsyringe';
import { validate as validateUUID } from 'uuid';

import { ProductsRepository } from '@interfaces/product.interface';

import { AppError } from '@core/errors/AppError';

@injectable()
export class DeleteProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: ProductsRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    if (!validateUUID(id)) throw new AppError('Id must be of type uuid', 400);

    const foundedProduct = await this.productsRepository.findOne(id);
    if (!foundedProduct) throw new AppError('Product not founded', 400);

    await this.productsRepository.delete(id);
  }
}
