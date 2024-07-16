import { Test, TestingModule } from '@nestjs/testing';

import InvestmentController from '@controller/investment/InvestmentController';

import {
  ICreateInvestmentResponse,
  IGetInvestmentResponse,
  IListInvestmentResponse,
  IWithdrawnInvestmentResponse,
} from '@views/investment/responses';

import {
  CreateInvestmentService,
  GetInvestmentService,
  ListInvestmentService,
  WithdrawnInvestmentService,
  PaymentInvestmentService,
} from '@controller/investment/useCases';

const createInvestmentExecuteMock = jest.fn();
const getInvestmentExecuteMock = jest.fn();
const listInvestmentExecuteMock = jest.fn();
const withdrawnInvestmentExecuteMock = jest.fn();
const paymentInvestmentExecuteMock = jest.fn();

describe('InvestmentController', () => {
  let controller: InvestmentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InvestmentController],
      providers: [
        {
          provide: CreateInvestmentService,
          useValue: {
            execute: createInvestmentExecuteMock.mockResolvedValue(
              ICreateInvestmentResponse,
            ),
          },
        },
        {
          provide: GetInvestmentService,
          useValue: {
            execute: getInvestmentExecuteMock.mockResolvedValue(
              IGetInvestmentResponse,
            ),
          },
        },
        {
          provide: ListInvestmentService,
          useValue: {
            execute: listInvestmentExecuteMock.mockResolvedValue(
              IListInvestmentResponse,
            ),
          },
        },
        {
          provide: WithdrawnInvestmentService,
          useValue: {
            execute: withdrawnInvestmentExecuteMock.mockResolvedValue(
              IWithdrawnInvestmentResponse,
            ),
          },
        },
        {
          provide: PaymentInvestmentService,
          useValue: {
            execute: paymentInvestmentExecuteMock.mockResolvedValue(
              IWithdrawnInvestmentResponse,
            ),
          },
        },
      ],
    }).compile();

    controller = module.get<InvestmentController>(InvestmentController);
  });

  it('should be create investment', async () => {
    await controller.create({
      user: 1,
      name: 'investment',
      initialValue: 1000,
      initialDate: '2021-10-10',
    });

    expect(createInvestmentExecuteMock).toHaveBeenCalled();
  });

  it('should be get investment', async () => {
    await controller.get(1);

    expect(getInvestmentExecuteMock).toHaveBeenCalled();
  });

  it('should be list investment', async () => {
    await controller.list({
      limit: '50',
      offset: '0',
      user: '1',
      status: 'active',
    });

    expect(listInvestmentExecuteMock).toHaveBeenCalled();
  });

  it('should be withdrawn investment', async () => {
    await controller.withdrawn(1, {
      value: 400,
    });

    expect(withdrawnInvestmentExecuteMock).toHaveBeenCalled();
  });
});
