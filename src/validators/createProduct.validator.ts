import * as yup from 'yup';
import { ValidationError } from 'yup';

import { CreateProductDTO } from '@interfaces/product.interface';
import { AppError } from '@core/errors/AppError';

export class CreateProductValidator {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private yupSchema: any;

  public data: CreateProductDTO;

  constructor(data: CreateProductDTO) {
    this.data = data;
    this.generateSchema();
  }

  private generateSchema() {
    this.yupSchema = yup.object().shape({
      name: yup.string().strict().required(),
      price: yup.number().required(),
      category: yup.string().strict().required(),
    });
  }

  public async validate() {
    await this.yupSchema.validate(this.data).catch((err: ValidationError) => {
      throw new AppError(err.errors, 400);
    });
  }
}
