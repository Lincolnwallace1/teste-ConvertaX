import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import UserController from '@controller/user/UserController';

import {
  CreateUserService,
  GetUserService,
  UpdateUserService,
} from './useCases';

import User from '@model/user/User';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [CreateUserService, GetUserService, UpdateUserService],
})
export class UserModule {}
