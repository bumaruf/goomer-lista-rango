import * as yup from 'yup';
import { ValidationError } from 'yup';

import { CreateRestaurantDTO } from '@interfaces/restaurant.interface';
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

export class CreateRestaurantValidator {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private yupSchema: any;

  public data: CreateRestaurantDTO;

  constructor(data: CreateRestaurantDTO) {
    this.data = data;
    this.generateSchema();
  }

  private generateSchema() {
    this.yupSchema = yup.object().shape({
      name: yup.string().strict().required(),
      address: yup.string().strict().required(),
      number: yup.string().strict().required(),
      city: yup.string().strict().required(),
      state: yup.string().strict().required(),
      country: yup.string().strict().required(),
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
        .required()
        .min(1),
    });
  }

  public async validate() {
    await this.yupSchema.validate(this.data).catch((err: ValidationError) => {
      throw new AppError(err.errors, 400);
    });
  }
}
