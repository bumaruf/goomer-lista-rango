import 'reflect-metadata';

import { ShowRestaurantsService } from '@services/showRestaurant.service';
import { RestaurantsRepository } from '@interfaces/restaurant.interface';

import RestaurantRepositoryMock from '../__mocks__/RestaurantRepositoryMock';

import { AppError } from '@core/errors/AppError';

let showRestaurantService: ShowRestaurantsService;

let restaurantRepository: RestaurantsRepository;

describe('List one restaurant', () => {
  beforeAll(() => {
    restaurantRepository = {
      async findOne() {
        return RestaurantRepositoryMock.findOneMock;
      },
    } as unknown as RestaurantsRepository;

    showRestaurantService = new ShowRestaurantsService(restaurantRepository);
  });

  it('should be able to show one restaurant', async () => {
    const restaurant = await showRestaurantService.execute(
      '938ad486-2a4e-4485-bd5a-4e31b27c5099',
    );

    expect(restaurant).toHaveProperty('id');
  });

  it('should not be able to show a restaurant if id is invalid', async () => {
    const promise = showRestaurantService.execute('invalid-uuid');

    await expect(promise).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to show a restaurant if not founded', async () => {
    jest
      .spyOn(restaurantRepository, 'findOne')
      .mockReturnValueOnce(Promise.resolve(null));

    const promise = showRestaurantService.execute(
      '938ad486-2a4e-4485-bd5a-4e31b27c5099',
    );

    await expect(promise).rejects.toBeInstanceOf(AppError);
  });
});
