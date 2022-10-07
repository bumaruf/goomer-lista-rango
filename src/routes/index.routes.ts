import { Router } from 'express';
import multer from 'multer';
import swaggerUi from 'swagger-ui-express';

import RestaurantController from '@controllers/restaurant.controller';

import swagger from '../swagger.json';

import { upload } from '@configs/upload';

const router = Router();
const photoUpload = multer(upload.multer);

// Restaurant routes
router.post('/restaurants', RestaurantController.create);
router.get('/restaurants', RestaurantController.index);
router.get('/restaurants/:id', RestaurantController.show);
router.put('/restaurants/:id', RestaurantController.update);
router.delete('/restaurants/:id', RestaurantController.delete);
router.patch(
  '/restaurants/:id/photo',
  photoUpload.single('photo'),
  RestaurantController.updatePhoto,
);

// Swagger docs
router.use('/docs', swaggerUi.serve, swaggerUi.setup(swagger));

export { router };
