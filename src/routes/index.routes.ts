import { Router } from 'express';
import multer from 'multer';
import swaggerUi from 'swagger-ui-express';

import RestaurantController from '@controllers/restaurant.controller';
import ProductController from '@controllers/product.controller';

import swagger from '../swagger.json';

import { upload } from '@configs/upload';

const router = Router();
const photoUpload = multer(upload.multer);

// Product routes
router.post('/restaurants/:restaurantId/products', ProductController.create);
router.get('/restaurants/:restaurantId/products', ProductController.index);
router.put(
  '/restaurants/:restaurantId/products/:productId',
  ProductController.update,
);
router.delete(
  '/restaurants/:restaurantId/products/:productId',
  ProductController.delete,
);
router.patch(
  '/restaurants/:restaurantId/products/:productId/photo',
  photoUpload.single('photo'),
  ProductController.updatePhoto,
);

// Restaurant routes
router.post('/restaurants', RestaurantController.create);
router.get('/restaurants', RestaurantController.index);
router.get('/restaurants/:restaurantId', RestaurantController.show);
router.put('/restaurants/:restaurantId', RestaurantController.update);
router.delete('/restaurants/:restaurantId', RestaurantController.delete);
router.patch(
  '/restaurants/:restaurantId/photo',
  photoUpload.single('photo'),
  RestaurantController.updatePhoto,
);

// Swagger docs
router.use('/docs', swaggerUi.serve, swaggerUi.setup(swagger));

export { router };
