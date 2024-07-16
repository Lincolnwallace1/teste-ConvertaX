import { Test, TestingModule } from '@nestjs/testing';

import UserRepository from '@model/user/repositorie/UserRepositorie';
import InvestmentRepository from '@model/investment/repositorie/InvestmentRepositorie';

import { CreateInvestmentService } from '@controller/investment/useCases';

describe('CreateInvestmentService', () => {
  let service: CreateInvestmentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateInvestmentService,
        {
          provide: InvestmentRepository,
          useValue: {
            get: jest.fn(),
            create: jest.fn().mockResolvedValueOnce({
              id: 1,
              user: 1,
              title: 'Investment',
              initialValue: 1000,
              initialDate: new Date(),
            }),
          },
        },
        {
          provide: UserRepository,
          useValue: {
            get: jest.fn().mockResolvedValue({
              id: 1,
              fullname: 'John Doe',
              email: 'johndoe@gmail.com',
              password: 'password',
            }),
          },
        },
      ],
    }).compile();

    service = module.get<CreateInvestmentService>(CreateInvestmentService);
  });

  it('should call execute method', async () => {
    await service.execute({
      data: {
        user: 1,
        name: 'Investment',
        initialValue: 1000,
        initialDate: new Date().toString(),
      },
    });

    expect(service).toBeDefined();
  });
});
