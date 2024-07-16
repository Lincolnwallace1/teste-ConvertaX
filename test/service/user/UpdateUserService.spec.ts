import { Test, TestingModule } from '@nestjs/testing';

import UserRepository from '@model/user/repositorie/UserRepositorie';

import { UpdateUserService } from '@controller/user/useCases';

describe('UpdateUserService', () => {
  let service: UpdateUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateUserService,
        {
          provide: UserRepository,
          useValue: {
            get: jest.fn().mockResolvedValue({
              id: 1,
              fullname: 'John Doe',
              email: 'johndoe@gmail.com',
              password: 'password',
            }),
            update: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UpdateUserService>(UpdateUserService);
  });

  it('should call execute method', async () => {
    await service.execute({
      id: 1,
      data: {
        fullname: 'John Doe',
      },
    });

    expect(service).toBeDefined();
  });
});
