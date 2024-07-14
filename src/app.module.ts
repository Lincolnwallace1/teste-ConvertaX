import { Module } from '@nestjs/common';
import DatabaseConfig from '@common/infra/typeorm/index';
import { UserModule } from '@controller/user/UserModule';
import { AuthModule } from './controller/auth/AuthModule';

@Module({
  imports: [DatabaseConfig, UserModule, AuthModule],
})
export class AppModule {}
