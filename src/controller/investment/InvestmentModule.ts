import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from '@controller/user/UserModule';
import { HistoryModule } from '@controller/history/HistoryModule';

import Investment from '@entities/Investment';

import InvestmentRepositorie from '@model/investment/repositorie/InvestmentRepositorie';
import InvestmentController from '@controller/investment/InvestmentController';

import {
  CreateInvestmentService,
  GetInvestmentService,
  WithdrawnInvestmentService,
  ListInvestmentService,
  PaymentInvestmentService,
} from './useCases';

@Module({
  imports: [TypeOrmModule.forFeature([Investment]), UserModule, HistoryModule],
  controllers: [InvestmentController],
  providers: [
    CreateInvestmentService,
    GetInvestmentService,
    WithdrawnInvestmentService,
    ListInvestmentService,
    InvestmentRepositorie,
    PaymentInvestmentService,
  ],
})
export class InvestmentModule {}
