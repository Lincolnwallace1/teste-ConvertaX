import { Test, TestingModule } from '@nestjs/testing';

import UserRepository from '@model/user/repositorie/UserRepositorie';

import { GetUserService } from '@controller/user/useCases';

describe('GetUserService', () => {
  let service: GetUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetUserService,
        {
          provide: UserRepository,
          useValue: {
            get: jest.fn().mockResolvedValue({
              id: 1,
              fullname: 'John Doe',
              email: 'johndoe@gmail.com',
            }),
          },
        },
      ],
    }).compile();

    service = module.get<GetUserService>(GetUserService);
  });

  it('should call execute method', async () => {
    await service.execute({
      id: 1,
    });

    expect(service).toBeDefined();
  });
});
