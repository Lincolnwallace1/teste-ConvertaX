import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from '@controller/user/UserModule';

import Investment from '@entities/Investment';

import InvestmentRepositorie from '@model/investment/repositorie/InvestmentRepositorie';
import InvestmentController from '@controller/investment/InvestmentController';

import { CreateInvestmentService, GetInvestmentService } from './useCases';

@Module({
  imports: [TypeOrmModule.forFeature([Investment]), UserModule],
  controllers: [InvestmentController],
  providers: [
    CreateInvestmentService,
    GetInvestmentService,
    InvestmentRepositorie,
  ],
})
export class InvestmentModule {}
