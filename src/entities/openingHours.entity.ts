import { v4 as uuidV4 } from 'uuid';

export class OpeningHoursEntity {
  public id!: string;
  public weekday!: string;
  public start_at!: string;
  public finish_at!: string;
  public restaurant_id?: string;

  public created_at!: Date;
  public updated_at!: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}
