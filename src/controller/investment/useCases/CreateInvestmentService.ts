import { Injectable, HttpStatus } from '@nestjs/common';
import Z from 'zod';
import AppError from '@common/erros/AppError';

import UserRepositorie from '@model/user/repositorie/UserRepositorie';
import InvestmentRepository from '@model/investment/repositorie/InvestmentRepositorie';

import Investment from '@entities/Investment';

import { CreateInvestmentSchema } from '@views/investment/schemas';

interface IRequest {
  data: Z.infer<typeof CreateInvestmentSchema>;
}

@Injectable()
class CreateInvestmentService {
  constructor(
    private readonly investmentRepository: InvestmentRepository,
    private readonly userRepositorie: UserRepositorie,
  ) {}

  public async execute({ data }: IRequest): Promise<Investment> {
    const user = await this.userRepositorie.get({
      id: data.user,
      enabled: true,
    });

    if (!user) {
      throw new AppError({
        name: 'User Not Found',
        errorCode: 'user_not_found',
        statusCode: HttpStatus.NOT_FOUND,
      });
    }

    const investmentRecord = await this.investmentRepository.get({
      user: user.id,
      name: data.name,
    });

    if (investmentRecord) {
      throw new AppError({
        name: 'Investment Already Exists',
        errorCode: 'investment_already_exists',
        statusCode: HttpStatus.CONFLICT,
      });
    }

    if (data.initialValue <= 0) {
      throw new AppError({
        name: 'Value is not valid',
        errorCode: 'value_not_valid',
        statusCode: HttpStatus.BAD_REQUEST,
      });
    }

    if (new Date(data.initialDate) > new Date()) {
      throw new AppError({
        name: 'Date is not valid',
        errorCode: 'date_not_valid',
        statusCode: HttpStatus.BAD_REQUEST,
      });
    }

    const months = this.diferenceMonth(new Date(data.initialDate), new Date());
    const t = months / 12;
    const r = 0.0052;

    const expectedValue = this.calculateInterest(data.initialValue, r, t);

    const investment = await this.investmentRepository.create({
      user: user.id,
      name: data.name,
      initialDate: data.initialDate,
      initialValue: data.initialValue,
      expectedValue: expectedValue,
    });

    return {
      ...investment,
    };
  }

  private diferenceMonth = (initialDate: Date, finalDate: Date): number => {
    const years = finalDate.getFullYear() - initialDate.getFullYear();
    const months = finalDate.getMonth() - initialDate.getMonth();
    return years * 12 + months;
  };

  private calculateInterest = (P: number, r: number, t: number): number => {
    return P * Math.pow(1 + r, t);
  };
}

export default CreateInvestmentService;
