import { Test, TestingModule } from '@nestjs/testing';

import InvestmentRepository from '@model/investment/repositorie/InvestmentRepositorie';
import HistoryRepository from '@/model/history/repositorie/HistoryRepositorie';

import { WithdrawnInvestmentService } from '@controller/investment/useCases';

describe('WithdrawnInvestmentService', () => {
  let service: WithdrawnInvestmentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WithdrawnInvestmentService,
        {
          provide: InvestmentRepository,
          useValue: {
            get: jest.fn().mockResolvedValueOnce({
              id: 1,
              expectedValue: 100,
              initialDate: new Date(),
            }),
            update: jest.fn(),
          },
        },
        {
          provide: HistoryRepository,
          useValue: {
            create: jest.fn().mockResolvedValueOnce({
              id: 1,
              investment: 1,
              date: new Date(),
              valueWithdrawn: 100,
              realValueWithdrawn: 100,
              tax: 0,
            }),
          },
        },
      ],
    }).compile();

    service = module.get<WithdrawnInvestmentService>(
      WithdrawnInvestmentService,
    );
  });

  it('should call execute method', async () => {
    await service.execute({
      id: 1,
      data: {
        value: 100,
      },
    });

    expect(service).toBeDefined();
  });
});
