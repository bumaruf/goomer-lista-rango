import { inject, injectable } from 'tsyringe';

import { RestaurantsRepository } from '@interfaces/restaurant.interface';
import { ProductsRepository } from '@interfaces/product.interface';

import { ProductEntity } from '@entities/product.entity';

import { AppError } from '@core/errors/AppError';

interface MenuCategory {
  category: string;
  products: ProductEntity[];
}

interface MenuResponse {
  restaurant_id: string;
  restaurant_name: string;
  categories: MenuCategory[];
}

@injectable()
export class ListMenuService {
  constructor(
    @inject('RestaurantsRepository')
    private restaurantsRepository: RestaurantsRepository,

    @inject('ProductsRepository')
    private productsRepository: ProductsRepository,
  ) {}

  public async execute(restaurant_id: string): Promise<MenuResponse> {
    const foundedRestaurant = await this.restaurantsRepository.findOne(
      restaurant_id,
    );
    if (!foundedRestaurant) throw new AppError('Restaurant not found');

    const products = await this.productsRepository.findByRestaurantId(
      restaurant_id,
    );

    // Organizar produtos por categoria
    const categoriesMap = new Map<string, ProductEntity[]>();

    products.forEach((product) => {
      const category = product.category || 'Outros';
      if (!categoriesMap.has(category)) {
        categoriesMap.set(category, []);
      }
      categoriesMap.get(category)!.push(product);
    });

    // Converter Map para array de categorias
    const categories: MenuCategory[] = Array.from(categoriesMap.entries()).map(
      ([category, products]) => ({
        category,
        products,
      }),
    );

    // Ordenar categorias alfabeticamente
    categories.sort((a, b) => a.category.localeCompare(b.category));

    return {
      restaurant_id: foundedRestaurant.id,
      restaurant_name: foundedRestaurant.name,
      categories,
    };
  }
}
