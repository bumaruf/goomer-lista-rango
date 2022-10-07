import { Request, Response, NextFunction } from 'express';
import { container } from 'tsyringe';

import { CreateRestaurantValidator } from '@validators/createRestaurant.validator';
import { CreateRestaurantService } from '@services/createRestaurant.service';

import { ListRestaurantsService } from '@services/listRestaurants.service';
import { ShowRestaurantsService } from '@services/showRestaurant.service';

import { UpdateRestaurantValidator } from '@validators/updateRestaurant.validator';
import { UpdateRestaurantService } from '@services/updateRestaurant.service';

import { DeleteRestaurantsService } from '@services/deleteRestaurant.service';
import { UpdateRestaurantPhotoService } from '@services/updateRestaurantPhoto.service';

import { AppError } from '@core/errors/AppError';

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

  public async index(request: Request, response: Response, next: NextFunction) {
    try {
      const restaurantService = container.resolve(ListRestaurantsService);
      const restaurant = await restaurantService.execute();

      return response.json(restaurant);
    } catch (error) {
      next(error);
    }
  }

  public async show(request: Request, response: Response, next: NextFunction) {
    try {
      const { restaurantId } = request.params;

      const restaurantService = container.resolve(ShowRestaurantsService);
      const restaurant = await restaurantService.execute(restaurantId);

      return response.json(restaurant);
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
      const { restaurantId } = request.params;

      const validatedBodyParams = new UpdateRestaurantValidator(request.body);
      await validatedBodyParams.validate();

      const restaurantService = container.resolve(UpdateRestaurantService);
      const restaurant = await restaurantService.execute({
        ...validatedBodyParams.data,
        id: restaurantId,
      });

      return response.json(restaurant);
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
      const { restaurantId } = request.params;
      const filename = request.file?.filename;

      if (!filename) throw new AppError('Filename error');

      const restaurantService = container.resolve(UpdateRestaurantPhotoService);
      const updatedRestaurantPhoto = await restaurantService.execute({
        id: restaurantId,
        filename,
      });

      return response.json(updatedRestaurantPhoto);
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
      const { restaurantId } = request.params;

      const restaurantService = container.resolve(DeleteRestaurantsService);
      await restaurantService.execute(restaurantId);

      return response.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

export default new RestaurantController();
