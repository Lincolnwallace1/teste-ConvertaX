import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import UserController from '@controller/user/UserController';

import { CreateUserService, GetUserService } from './useCases';

import User from '@model/user/User';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [CreateUserService, GetUserService],
})
export class UserModule {}
