import 'reflect-metadata';

import { DeleteRestaurantsService } from '@services/deleteRestaurant.service';

import { RestaurantsRepository } from '@interfaces/restaurant.interface';

import { AppError } from '@core/errors/AppError';

let deleteRestaurantService: DeleteRestaurantsService;

let restaurantRepository: RestaurantsRepository;

describe('Delete a restaurant', () => {
  beforeAll(() => {
    restaurantRepository = {
      async findOne(id: string) {
        return { id };
      },
      delete: jest.fn,
    } as unknown as RestaurantsRepository;

    deleteRestaurantService = new DeleteRestaurantsService(
      restaurantRepository,
    );
  });

  it('should be able to delete a restaurant', async () => {
    const promise = deleteRestaurantService.execute(
      '938ad486-2a4e-4485-bd5a-4e31b27c5099',
    );

    await expect(promise).resolves.not.toThrow();
  });

  it('should not be able to delete a restaurant if id is invalid', async () => {
    const promise = deleteRestaurantService.execute('invalid-uuid');

    await expect(promise).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to delete a restaurant if not founded', async () => {
    jest
      .spyOn(restaurantRepository, 'findOne')
      .mockReturnValueOnce(Promise.resolve(null));

    const promise = deleteRestaurantService.execute(
      '938ad486-2a4e-4485-bd5a-4e31b27c5099',
    );

    await expect(promise).rejects.toBeInstanceOf(AppError);
  });
});
