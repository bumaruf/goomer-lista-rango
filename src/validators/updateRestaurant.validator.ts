import * as yup from 'yup';
import { ValidationError, AnySchema } from 'yup';

import { UpdateRestaurantDTO } from '@interfaces/restaurant.interface';
import { AppError } from '@core/errors/AppError';

const regexValidateTime = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;

const weekdays: string[] = [
  'sunday',
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
];

export class UpdateRestaurantValidator {
  private yupSchema!: AnySchema;

  public data: UpdateRestaurantDTO;

  constructor(data: UpdateRestaurantDTO) {
    this.data = data;
    this.generateSchema();
  }

  private generateSchema() {
    this.yupSchema = yup.object().shape({
      name: yup.string().strict(),
      address: yup.string().strict(),
      number: yup.string().strict(),
      city: yup.string().strict(),
      state: yup.string().strict(),
      country: yup.string().strict(),
      postal_code: yup.string().strict().required(),
      opening_hours: yup
        .array()
        .of(
          yup.object().shape({
            weekday: yup.string().strict().oneOf(weekdays).required(),
            start_at: yup
              .string()
              .strict()
              .trim()
              .matches(regexValidateTime)
              .required(),
            finish_at: yup
              .string()
              .strict()
              .trim()
              .matches(regexValidateTime)
              .required(),
          }),
        )
        .min(1),
    });
  }

  public async validate() {
    await this.yupSchema.validate(this.data).catch((err: ValidationError) => {
      throw new AppError(err.errors, 400);
    });
  }
}
