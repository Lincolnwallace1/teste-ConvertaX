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

import { ICreateUserDTO, IUpdateUserDTO } from '@model/user/dtos';
import { CreateUserSchema, UpdateUserSchema } from '@views/user/schemas';

import { ICreateUserResponse, IGetUserResponse } from '@views/user/responses';

import {
  CreateUserService,
  GetUserService,
  UpdateUserService,
} from '@controller/user/useCases';

@Controller('users')
class UserController {
  constructor(
    private readonly createUserService: CreateUserService,
    private readonly getUserService: GetUserService,
    private readonly updateUserService: UpdateUserService,
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

  @Patch(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async update(
    @Param('id') id: string,
    @Body() data: IUpdateUserDTO,
  ): Promise<void> {
    const dataParsed = await UpdateUserSchema.parseAsync(data).catch(
      (error) => {
        throw new ValidationError(error);
      },
    );

    await this.updateUserService.execute({
      id: Number(id),
      data: dataParsed,
    });
  }
}

export default UserController;
