import * as yup from 'yup';
import { ValidationError, AnySchema } from 'yup';

import { UpdateProductDTO } from '@interfaces/product.interface';
import { AppError } from '@core/errors/AppError';

export class UpdateProductValidator {
  private yupSchema!: AnySchema;

  public data: UpdateProductDTO;

  constructor(data: UpdateProductDTO) {
    this.data = data;
    this.generateSchema();
  }

  private generateSchema() {
    this.yupSchema = yup.object().shape({
      name: yup.string().strict(),
      price: yup.number(),
      category: yup.string().strict(),
    });
  }

  public async validate() {
    await this.yupSchema.validate(this.data).catch((err: ValidationError) => {
      throw new AppError(err.errors, 400);
    });
  }
}
