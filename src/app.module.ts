import { Module } from '@nestjs/common';
import DatabaseConfig from '@common/infra/typeorm/index';
import { UserModule } from '@controller/user/UserModule';
import { AuthModule } from '@controller/auth/AuthModule';
import { InvestmentModule } from '@controller/investment/InvestmentModule';

@Module({
  imports: [DatabaseConfig, AuthModule, UserModule, InvestmentModule],
})
export class AppModule {}
