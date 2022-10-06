import { container } from 'tsyringe';

import { RestaurantsRepository } from '@repositories/restaurant.repository';
import { RestaurantsRepository as RestaurantsRepositoryInterface } from '@interfaces/restaurant.interface';

import { OpeningHoursRepository } from '@repositories/openingHours.repository';
import { OpeningHoursRepository as OpeningHoursRepositoryInterface } from '@interfaces/openingHours.interface';

container.registerSingleton<RestaurantsRepositoryInterface>(
  'RestaurantsRepository',
  RestaurantsRepository,
);

container.registerSingleton<OpeningHoursRepositoryInterface>(
  'OpeningHoursRepository',
  OpeningHoursRepository,
);
