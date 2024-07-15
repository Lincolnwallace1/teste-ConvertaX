import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import InvestmentController from '@controller/investment/InvestmentController';

import { CreateInvestmentService } from './useCases';

import Investment from '@entities/Investment';

import InvestmentRepositorie from '@model/investment/repositorie/InvestmentRepositorie';

import { UserModule } from '@controller/user/UserModule';

@Module({
  imports: [TypeOrmModule.forFeature([Investment]), UserModule],
  controllers: [InvestmentController],
  providers: [CreateInvestmentService, InvestmentRepositorie],
})
export class InvestmentModule {}
