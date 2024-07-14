import { Module } from '@nestjs/common';
import UserController from '@controller/user/UserController';
import { CreateUserService } from './useCases';
import { TypeOrmModule } from '@nestjs/typeorm';
import User from '@model/user/User';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [CreateUserService],
})
export class UserModule {}
