export class RestaurantRepositoryMock {
  public createMock = {
    id: '938ad486-2a4e-4485-bd5a-4e31b27c5099',
    name: 'Clebinho foods',
    photo: null,
    city: 'Tatuí',
    address: 'Av. Prof Zilah',
    number: '1400',
    state: 'Sao Paulo',
    country: 'Brazil',
    postal_code: '123123',
    created_at: new Date(),
    updated_at: new Date(),
  };

  public findOneMock = {
    id: '938ad486-2a4e-4485-bd5a-4e31b27c5099',
    name: 'Clebinho foods',
    photo: null,
    city: 'Tatuí',
    address: 'Av. Prof Zilah',
    number: '1400',
    state: 'Sao Paulo',
    country: 'Brazil',
    postal_code: '123123',
    created_at: new Date(),
    updated_at: new Date(),
  };

  public findAllMock = [this.createMock];
}

export default new RestaurantRepositoryMock();
