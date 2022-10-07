export class OpeningHoursMock {
  public createMock = [
    {
      id: '938ad486-2a4e-4485-bd5a-4e31b27c5099',
      weekday: 'sunday',
      start_at: '11:00',
      finish_at: '12:00',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: '938ad486-2a4e-4485-bd5a-4e31b27c5093',
      weekday: 'monday',
      start_at: '11:00',
      finish_at: '12:00',
      created_at: new Date(),
      updated_at: new Date(),
    },
  ];

  public findByRestaurantId = [
    {
      id: '938ad486-2a4e-4485-bd5a-4e31b27c5099',
      weekday: 'sunday',
      start_at: '11:00',
      finish_at: '12:00',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: '938ad486-2a4e-4485-bd5a-4e31b27c5093',
      weekday: 'monday',
      start_at: '11:00',
      finish_at: '12:00',
      created_at: new Date(),
      updated_at: new Date(),
    },
  ];
}

export default new OpeningHoursMock();
