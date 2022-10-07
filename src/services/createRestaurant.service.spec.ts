import 'reflect-metadata';

import { CreateRestaurantService } from '@services/createRestaurant.service';

import { RestaurantsRepository } from '@interfaces/restaurant.interface';
import { OpeningHoursRepository } from '@interfaces/openingHours.interface';

import RestaurantRepositoryMock from '../__mocks__/RestaurantRepositoryMock';
import OpeningHoursMock from '../__mocks__/OpeningHoursMock';

import { AppError } from '@core/errors/AppError';

let createRestarantService: CreateRestaurantService;

let restaurantRepository: RestaurantsRepository;
let openingHoursRepository: OpeningHoursRepository;

describe('Create a restaurant', () => {
  beforeAll(() => {
    restaurantRepository = {
      async create() {
        return RestaurantRepositoryMock.createMock;
      },
    } as unknown as RestaurantsRepository;

    openingHoursRepository = {
      async create() {
        return OpeningHoursMock.createMock;
      },
    } as unknown as OpeningHoursRepository;

    createRestarantService = new CreateRestaurantService(
      restaurantRepository,
      openingHoursRepository,
    );
  });

  it('should be able to create a new restaurant', async () => {
    const restaurant = await createRestarantService.execute({
      name: 'Clebinho foods',
      city: 'Tatuí',
      address: 'Av. Prof Zilah',
      number: '1400',
      state: 'Sao Paulo',
      country: 'Brazil',
      postal_code: '123123',
      opening_hours: OpeningHoursMock.createMock,
    });

    expect(restaurant).toHaveProperty('id');
  });

  it('should not be able to update a restaurant if start_at is greater then finish_at', async () => {
    const promise = createRestarantService.execute({
      name: 'Clebinho foods',
      city: 'Tatuí',
      address: 'Av. Prof Zilah',
      number: '1400',
      state: 'Sao Paulo',
      country: 'Brazil',
      postal_code: '123123',
      opening_hours: [
        ...OpeningHoursMock.createMock,
        {
          ...OpeningHoursMock.createMock[0],
          start_at: '12:00',
          finish_at: '11:00',
        },
      ],
    });

    await expect(promise).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update a restaurant if times does not have a minimum interval of 15 minutes', async () => {
    const promise = createRestarantService.execute({
      name: 'Clebinho foods',
      city: 'Tatuí',
      address: 'Av. Prof Zilah',
      number: '1400',
      state: 'Sao Paulo',
      country: 'Brazil',
      postal_code: '123123',
      opening_hours: [
        ...OpeningHoursMock.createMock,
        {
          ...OpeningHoursMock.createMock[0],
          start_at: '11:00',
          finish_at: '11:13',
        },
      ],
    });

    await expect(promise).rejects.toBeInstanceOf(AppError);
  });
});
