import { container } from 'tsyringe';

import { RestaurantsRepository } from '@repositories/restaurant.repository';
import { RestaurantsRepository as RestaurantsRepositoryInterface } from '@interfaces/restaurant.interface';

import { OpeningHoursRepository } from '@repositories/openingHours.repository';
import { OpeningHoursRepository as OpeningHoursRepositoryInterface } from '@interfaces/openingHours.interface';

import { StorageProvider } from './providers/StorageProvider';
import { StorageProvider as StorageProviderInterface } from '@interfaces/storageProvider.interface';

import { ProductsRepository } from '@repositories/product.repository';
import { ProductsRepository as ProductsRepositoryInterface } from '@interfaces/product.interface';

container.registerSingleton<StorageProviderInterface>(
  'StorageProvider',
  StorageProvider,
);

container.registerSingleton<RestaurantsRepositoryInterface>(
  'RestaurantsRepository',
  RestaurantsRepository,
);

container.registerSingleton<OpeningHoursRepositoryInterface>(
  'OpeningHoursRepository',
  OpeningHoursRepository,
);

container.registerSingleton<ProductsRepositoryInterface>(
  'ProductsRepository',
  ProductsRepository,
);
