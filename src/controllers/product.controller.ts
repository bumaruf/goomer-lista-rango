import { Request, Response, NextFunction } from 'express';
import { container } from 'tsyringe';

import { CreateProductValidator } from '@validators/createProduct.validator';
import { CreateProductService } from '@services/createProduct.service';

import { UpdateProductValidator } from '@validators/updateProducts.validator';
import { ListProductsService } from '@services/listProducts.service';

import { UpdateProductService } from '@services/updateProduct.service';
import { DeleteProductService } from '@services/deleteProduct.service';
import { UpdateProductPhotoService } from '@services/updateProductPhoto.service';

import { AppError } from '@core/errors/AppError';

class ProductController {
  public async create(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    try {
      const { restaurantId } = request.params;

      const validatedBodyParams = new CreateProductValidator(request.body);
      await validatedBodyParams.validate();

      const productService = container.resolve(CreateProductService);
      const product = await productService.execute({
        ...validatedBodyParams.data,
        restaurant_id: restaurantId,
      });

      return response.json(product);
    } catch (error) {
      next(error);
    }
  }

  public async index(request: Request, response: Response, next: NextFunction) {
    try {
      const { restaurantId } = request.params;

      const productService = container.resolve(ListProductsService);
      const products = await productService.execute(restaurantId);

      return response.json(products);
    } catch (error) {
      next(error);
    }
  }

  public async update(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    try {
      const { productId } = request.params;

      const validatedBodyParams = new UpdateProductValidator(request.body);
      await validatedBodyParams.validate();

      const productService = container.resolve(UpdateProductService);
      const updatedProduct = await productService.execute({
        ...validatedBodyParams.data,
        id: productId,
      });

      return response.json(updatedProduct);
    } catch (error) {
      next(error);
    }
  }

  public async updatePhoto(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    try {
      const { productId } = request.params;
      const filename = request.file?.filename;

      if (!filename) throw new AppError('Filename error');

      const productService = container.resolve(UpdateProductPhotoService);
      const updatedProductPhoto = await productService.execute({
        id: productId,
        filename,
      });

      return response.json(updatedProductPhoto);
    } catch (error) {
      next(error);
    }
  }

  public async delete(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    try {
      const { productId } = request.params;

      const productService = container.resolve(DeleteProductService);
      await productService.execute(productId);

      return response.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

export default new ProductController();
