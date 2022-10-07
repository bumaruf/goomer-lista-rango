import 'reflect-metadata';

import { UpdateRestaurantService } from '@services/updateRestaurant.service';

import {
  RestaurantsRepository,
  UpdateRestaurantRepository,
} from '@interfaces/restaurant.interface';
import { OpeningHoursRepository } from '@interfaces/openingHours.interface';

import RestaurantRepositoryMock from '../__mocks__/RestaurantRepositoryMock';
import OpeningHoursMock from '../__mocks__/OpeningHoursMock';

import { AppError } from '@core/errors/AppError';

let updateRestaurantService: UpdateRestaurantService;

let restaurantRepository: RestaurantsRepository;
let openingHoursRepository: OpeningHoursRepository;

describe('Create restaurant service', () => {
  beforeAll(() => {
    restaurantRepository = {
      async findOne() {
        return RestaurantRepositoryMock.findOneMock;
      },
      async updateById(data: UpdateRestaurantRepository) {
        return data;
      },
    } as unknown as RestaurantsRepository;

    openingHoursRepository = {
      async create() {
        return OpeningHoursMock.createMock;
      },
      async findByRestaurantId() {
        return OpeningHoursMock.findByRestaurantId;
      },
      deleteByRestaurantId: jest.fn,
    } as unknown as OpeningHoursRepository;

    updateRestaurantService = new UpdateRestaurantService(
      restaurantRepository,
      openingHoursRepository,
    );
  });

  it('should be able to update a restaurant', async () => {
    const restaurant = await updateRestaurantService.execute({
      id: '938ad486-2a4e-4485-bd5a-4e31b27c5099',
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

  it('should not be able to update a restaurant if id is invalid', async () => {
    const promise = updateRestaurantService.execute({
      id: 'invalid-uuid',
      name: 'Clebinho foods',
      city: 'Tatuí',
      address: 'Av. Prof Zilah',
      number: '1400',
      state: 'Sao Paulo',
      country: 'Brazil',
      postal_code: '123123',
      opening_hours: OpeningHoursMock.createMock,
    });

    await expect(promise).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update a restaurant if not founded', async () => {
    jest
      .spyOn(restaurantRepository, 'findOne')
      .mockReturnValueOnce(Promise.resolve(null));

    const promise = updateRestaurantService.execute({
      id: '938ad486-2a4e-4485-bd5a-4e31b27c5099',
      name: 'Clebinho foods',
      city: 'Tatuí',
      address: 'Av. Prof Zilah',
      number: '1400',
      state: 'Sao Paulo',
      country: 'Brazil',
      postal_code: '123123',
      opening_hours: OpeningHoursMock.createMock,
    });

    await expect(promise).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update a restaurant without opening_hours field', async () => {
    const restaurant = await updateRestaurantService.execute({
      id: '938ad486-2a4e-4485-bd5a-4e31b27c5099',
      name: 'Clebinho foods',
      city: 'Tatuí',
      address: 'Av. Prof Zilah',
      number: '1400',
      state: 'Sao Paulo',
      country: 'Brazil',
      postal_code: '123123',
    });

    expect(restaurant).toHaveProperty('id');
  });

  it('should be able to update a restaurant just with opening_hours field', async () => {
    const restaurant = await updateRestaurantService.execute({
      id: '938ad486-2a4e-4485-bd5a-4e31b27c5099',
      opening_hours: OpeningHoursMock.createMock,
    });

    expect(restaurant).toHaveProperty('id');
  });

  it('should not be able to update a restaurant if start_at is greater then finish_at', async () => {
    const promise = updateRestaurantService.execute({
      id: '938ad486-2a4e-4485-bd5a-4e31b27c5099',
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
    const promise = updateRestaurantService.execute({
      id: '938ad486-2a4e-4485-bd5a-4e31b27c5099',
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
