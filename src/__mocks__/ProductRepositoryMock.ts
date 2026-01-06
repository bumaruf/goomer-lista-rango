export class ProductRepositoryMock {
  public productMock1 = {
    id: '123e4567-e89b-12d3-a456-426614174001',
    name: 'Coca Cola',
    photo: 'coca-cola.jpg',
    price: 5.5,
    category: 'Bebidas',
    restaurant_id: '938ad486-2a4e-4485-bd5a-4e31b27c5099',
    created_at: new Date(),
    updated_at: new Date(),
  };

  public productMock2 = {
    id: '123e4567-e89b-12d3-a456-426614174002',
    name: 'Guaraná Antarctica',
    photo: 'guarana.jpg',
    price: 5.0,
    category: 'Bebidas',
    restaurant_id: '938ad486-2a4e-4485-bd5a-4e31b27c5099',
    created_at: new Date(),
    updated_at: new Date(),
  };

  public productMock3 = {
    id: '123e4567-e89b-12d3-a456-426614174003',
    name: 'Feijoada Completa',
    photo: 'feijoada.jpg',
    price: 35.9,
    category: 'Pratos Principais',
    restaurant_id: '938ad486-2a4e-4485-bd5a-4e31b27c5099',
    created_at: new Date(),
    updated_at: new Date(),
  };

  public productMock4 = {
    id: '123e4567-e89b-12d3-a456-426614174004',
    name: 'Picanha na Chapa',
    photo: 'picanha.jpg',
    price: 42.5,
    category: 'Pratos Principais',
    restaurant_id: '938ad486-2a4e-4485-bd5a-4e31b27c5099',
    created_at: new Date(),
    updated_at: new Date(),
  };

  public productMock5 = {
    id: '123e4567-e89b-12d3-a456-426614174005',
    name: 'Pudim de Leite',
    photo: 'pudim.jpg',
    price: 12.0,
    category: 'Sobremesas',
    restaurant_id: '938ad486-2a4e-4485-bd5a-4e31b27c5099',
    created_at: new Date(),
    updated_at: new Date(),
  };

  public findAllMock = [
    this.productMock1,
    this.productMock2,
    this.productMock3,
    this.productMock4,
    this.productMock5,
  ];
}

export default new ProductRepositoryMock();
