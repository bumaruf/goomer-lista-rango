import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';

import RestaurantController from '@controllers/restaurant.controller';

import swagger from '../swagger.json';

const router = Router();

// Restaurant routes
router.post('/restaurants', RestaurantController.create);

// Swagger docs
router.use('/docs', swaggerUi.serve, swaggerUi.setup(swagger));

export { router };
