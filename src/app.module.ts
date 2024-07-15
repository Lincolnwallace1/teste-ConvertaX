import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';

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
    ThrottlerModule.forRoot([
      {
        ttl: 60,
        limit: 10,
      },
    ]),
    AuthModule,
    UserModule,
    InvestmentModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
