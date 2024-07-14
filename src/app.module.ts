import { Module } from '@nestjs/common';
import DatabaseConfig from '@common/infra/typeorm/index';
import { UserModule } from '@controller/user/UserModule';

@Module({
  imports: [DatabaseConfig, UserModule],
})
export class AppModule {}
