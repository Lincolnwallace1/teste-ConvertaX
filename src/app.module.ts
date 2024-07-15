import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';

import DatabaseConfig from '@common/infra/typeorm/index';

import { UserModule } from '@controller/user/UserModule';
import { AuthModule } from '@controller/auth/AuthModule';
import { InvestmentModule } from '@controller/investment/InvestmentModule';
@Module({
  imports: [
    DatabaseConfig,
    ScheduleModule.forRoot(),
    CacheModule.register({
      isGlobal: true,
    }),
    AuthModule,
    UserModule,
    InvestmentModule,
  ],
  providers: [
    {
      provide: 'APP_INTERCEPTOR',
      useClass: CacheInterceptor,
    },
  ],
})
export class AppModule {}
