import { Test, TestingModule } from '@nestjs/testing';

import UserRepository from '@model/user/repositorie/UserRepositorie';

import { DeleteUserService } from '@controller/user/useCases';

describe('DeleteUserService', () => {
  let service: DeleteUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeleteUserService,
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

    service = module.get<DeleteUserService>(DeleteUserService);
  });

  it('should call execute method', async () => {
    await service.execute({
      id: 1,
    });

    expect(service).toBeDefined();
  });
});
