import 'reflect-metadata';

import { UpdateRestaurantPhotoService } from '@services/updateRestaurantPhoto.service';

import { RestaurantsRepository } from '@interfaces/restaurant.interface';
import { OpeningHoursRepository } from '@interfaces/openingHours.interface';
import { StorageProvider } from '@interfaces/storageProvider.interface';

import RestaurantRepositoryMock from '../__mocks__/RestaurantRepositoryMock';
import OpeningHoursMock from '../__mocks__/OpeningHoursMock';

import { AppError } from '@core/errors/AppError';

let updateRestarantPhotoService: UpdateRestaurantPhotoService;

let restaurantRepository: RestaurantsRepository;
let openingHoursRepository: OpeningHoursRepository;
let storageProvider: StorageProvider;

describe('Update restaurant photo', () => {
  beforeAll(() => {
    restaurantRepository = {
      async findOne() {
        return RestaurantRepositoryMock.findOneMock;
      },
      updatePhotoById({ filename }: { filename: string }) {
        return {
          ...RestaurantRepositoryMock.findOneMock,
          photo: filename,
        };
      },
    } as unknown as RestaurantsRepository;

    openingHoursRepository = {
      async findByRestaurantId() {
        return OpeningHoursMock.findByRestaurantId;
      },
    } as unknown as OpeningHoursRepository;

    storageProvider = {
      deleteFile: jest.fn,
      saveFile: jest.fn,
    } as unknown as StorageProvider;

    updateRestarantPhotoService = new UpdateRestaurantPhotoService(
      restaurantRepository,
      openingHoursRepository,
      storageProvider,
    );
  });

  it('should be able to upload a restaurant photo', async () => {
    const restaurant = await updateRestarantPhotoService.execute({
      id: '938ad486-2a4e-4485-bd5a-4e31b27c5099',
      filename: 'photo.png',
    });

    expect(restaurant.photo).not.toBeNull();
  });

  it('should not be able to update a restaurant photo if id is invalid', async () => {
    const promise = updateRestarantPhotoService.execute({
      id: 'invalid-uuid',
      filename: 'photo.png',
    });

    await expect(promise).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update a restaurant photo if not founded', async () => {
    jest
      .spyOn(restaurantRepository, 'findOne')
      .mockReturnValueOnce(Promise.resolve(null));

    const promise = updateRestarantPhotoService.execute({
      id: '938ad486-2a4e-4485-bd5a-4e31b27c5099',
      filename: 'photo.png',
    });

    await expect(promise).rejects.toBeInstanceOf(AppError);
  });
});
