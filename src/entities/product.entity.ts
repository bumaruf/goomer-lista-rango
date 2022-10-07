import { v4 as uuidV4 } from 'uuid';

export class ProductEntity {
  public restaurant_id!: string;

  public id!: string;
  public name!: string;
  public photo!: string;

  public price!: number;
  public category!: string;

  public created_at!: Date;
  public updated_at!: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}
