import { v4 as uuidV4 } from 'uuid';

export class RestaurantEntity {
  public id!: string;
  public name!: string;
  public photo!: string;

  public city!: string;
  public address!: string;
  public number!: string;
  public state!: string;
  public country!: string;
  public postal_code!: string;

  public created_at!: Date;
  public updated_at!: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}
