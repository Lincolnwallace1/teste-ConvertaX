import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Patch,
  HttpStatus,
} from '@nestjs/common';

import ValidationError from '@common/erros/ZodError';

import { instanceToInstance } from 'class-transformer';

import ICreateUserDTO from '@model/user/dtos/ICreateUserDTO';
import CreateUserSchema from '@views/user/schemas/CreateUserSchema';

import { ICreateUserResponse, IGetUserResponse } from '@views/user/responses';

import { CreateUserService, GetUserService } from '@controller/user/useCases';

@Controller('users')
class UserController {
  constructor(
    private readonly createUserService: CreateUserService,
    private readonly getUserService: GetUserService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  public async create(
    @Body() data: ICreateUserDTO,
  ): Promise<ICreateUserResponse> {
    const dataParsed = await CreateUserSchema.parseAsync(data).catch(
      (error) => {
        throw new ValidationError(error);
      },
    );

    const user = await this.createUserService.execute({ data: dataParsed });

    return { id: user.id };
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  public async get(@Param('id') id: string): Promise<IGetUserResponse> {
    const user = await this.getUserService.execute({ id: Number(id) });

    return instanceToInstance(user);
  }
}

export default UserController;
