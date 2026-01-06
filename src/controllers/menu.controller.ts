import { Request, Response, NextFunction } from 'express';
import { container } from 'tsyringe';

import { ListMenuService } from '@services/listMenu.service';

class MenuController {
  public async index(request: Request, response: Response, next: NextFunction) {
    try {
      const { restaurantId } = request.params;

      const menuService = container.resolve(ListMenuService);
      const menu = await menuService.execute(restaurantId);

      return response.json(menu);
    } catch (error) {
      next(error);
    }
  }
}

export default new MenuController();
