import { Request, Response, NextFunction } from 'express';
import { container } from 'tsyringe';

import { CreateRestaurantService } from '@services/createRestaurant.service';
import { CreateRestaurantValidator } from '@validators/createRestaurant.validator';

class RestaurantController {
  public async create(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    try {
      const validatedBodyParams = new CreateRestaurantValidator(request.body);
      await validatedBodyParams.validate();

      const restaurantService = container.resolve(CreateRestaurantService);
      const restaurant = await restaurantService.execute(
        validatedBodyParams.data,
      );

      return response.json(restaurant);
    } catch (error) {
      next(error);
    }
  }

}

export default new RestaurantController();
