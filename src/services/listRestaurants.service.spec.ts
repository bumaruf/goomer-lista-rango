import 'reflect-metadata';

import { ListRestaurantsService } from '@services/listRestaurants.service';

import { RestaurantsRepository } from '@interfaces/restaurant.interface';

import RestaurantRepositoryMock from '../__mocks__/RestaurantRepositoryMock';

let listRestaurantsService: ListRestaurantsService;

let restaurantRepository: RestaurantsRepository;

describe('List all restaurants', () => {
  beforeAll(() => {
    restaurantRepository = {
      async findAll() {
        return RestaurantRepositoryMock.findAllMock;
      },
    } as unknown as RestaurantsRepository;

    listRestaurantsService = new ListRestaurantsService(restaurantRepository);
  });

  it('should be able to list all restaurants', async () => {
    const restaurants = await listRestaurantsService.execute();

    expect(Array.isArray(restaurants)).toBe(true);
  });
});
