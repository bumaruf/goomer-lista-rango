import 'reflect-metadata';

import { ListMenuService } from '@services/listMenu.service';

import { RestaurantsRepository } from '@interfaces/restaurant.interface';
import { ProductsRepository } from '@interfaces/product.interface';

import RestaurantRepositoryMock from '../__mocks__/RestaurantRepositoryMock';
import ProductRepositoryMock from '../__mocks__/ProductRepositoryMock';

import { AppError } from '@core/errors/AppError';

let listMenuService: ListMenuService;

let restaurantRepository: RestaurantsRepository;
let productRepository: ProductsRepository;

describe('List restaurant menu', () => {
  beforeAll(() => {
    restaurantRepository = {
      async findOne() {
        return RestaurantRepositoryMock.findOneMock;
      },
    } as unknown as RestaurantsRepository;

    productRepository = {
      async findByRestaurantId() {
        return ProductRepositoryMock.findAllMock;
      },
    } as unknown as ProductsRepository;

    listMenuService = new ListMenuService(
      restaurantRepository,
      productRepository,
    );
  });

  it('should be able to list restaurant menu organized by categories', async () => {
    const menu = await listMenuService.execute(
      '938ad486-2a4e-4485-bd5a-4e31b27c5099',
    );

    expect(menu).toHaveProperty('restaurant_id');
    expect(menu).toHaveProperty('restaurant_name');
    expect(menu).toHaveProperty('categories');
    expect(Array.isArray(menu.categories)).toBe(true);
  });

  it('should organize products by category', async () => {
    const menu = await listMenuService.execute(
      '938ad486-2a4e-4485-bd5a-4e31b27c5099',
    );

    expect(menu.categories.length).toBe(3); // Bebidas, Pratos Principais, Sobremesas

    const categoriesNames = menu.categories.map((cat) => cat.category);
    expect(categoriesNames).toContain('Bebidas');
    expect(categoriesNames).toContain('Pratos Principais');
    expect(categoriesNames).toContain('Sobremesas');
  });

  it('should sort categories alphabetically', async () => {
    const menu = await listMenuService.execute(
      '938ad486-2a4e-4485-bd5a-4e31b27c5099',
    );

    const categoriesNames = menu.categories.map((cat) => cat.category);
    expect(categoriesNames).toEqual(['Bebidas', 'Pratos Principais', 'Sobremesas']);
  });

  it('should include restaurant information', async () => {
    const menu = await listMenuService.execute(
      '938ad486-2a4e-4485-bd5a-4e31b27c5099',
    );

    expect(menu.restaurant_id).toBe('938ad486-2a4e-4485-bd5a-4e31b27c5099');
    expect(menu.restaurant_name).toBe('Clebinho foods');
  });

  it('should have products in correct categories', async () => {
    const menu = await listMenuService.execute(
      '938ad486-2a4e-4485-bd5a-4e31b27c5099',
    );

    const bebidasCategory = menu.categories.find(
      (cat) => cat.category === 'Bebidas',
    );
    expect(bebidasCategory?.products.length).toBe(2);

    const pratosCategory = menu.categories.find(
      (cat) => cat.category === 'Pratos Principais',
    );
    expect(pratosCategory?.products.length).toBe(2);

    const sobremesasCategory = menu.categories.find(
      (cat) => cat.category === 'Sobremesas',
    );
    expect(sobremesasCategory?.products.length).toBe(1);
  });

  it('should throw error if restaurant does not exist', async () => {
    const restaurantRepositoryWithoutRestaurant = {
      async findOne() {
        return null;
      },
    } as unknown as RestaurantsRepository;

    const listMenuServiceWithError = new ListMenuService(
      restaurantRepositoryWithoutRestaurant,
      productRepository,
    );

    await expect(
      listMenuServiceWithError.execute('invalid-id'),
    ).rejects.toBeInstanceOf(AppError);
  });
});
