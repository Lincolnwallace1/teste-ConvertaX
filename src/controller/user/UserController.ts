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

import ICreateUserDTO from '@model/user/dtos/ICreateUserDTO';
import CreateUserSchema from '@views/user/schemas/CreateUserSchema';

import ICreateUserResponse from '@views/user/responses/ICreateUserResponse';

import { CreateUserService } from '@controller/user/useCases';

@Controller('users')
class UserController {
  constructor(private readonly userService: CreateUserService) {}

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

    const user = await this.userService.execute({ data: dataParsed });

    return { id: user.id };
  }
}

export default UserController;
