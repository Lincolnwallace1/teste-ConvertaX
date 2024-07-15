import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Patch,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';

import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import ValidationError from '@common/erros/ZodError';

import { instanceToInstance } from 'class-transformer';

import { ICreateUserDTO, IUpdateUserDTO } from '@model/user/dtos';
import { CreateUserSchema, UpdateUserSchema } from '@views/user/schemas';

import { ICreateUserResponse, IGetUserResponse } from '@views/user/responses';

import {
  CreateUserService,
  GetUserService,
  UpdateUserService,
  DeleteUserService,
} from '@controller/user/useCases';
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth('Bearer')
@ApiTags('User')
@Controller('users')
class UserController {
  constructor(
    private readonly createUserService: CreateUserService,
    private readonly getUserService: GetUserService,
    private readonly updateUserService: UpdateUserService,
    private readonly deleteUserService: DeleteUserService,
  ) {}

  @Post('/')
  @ApiOperation({ summary: 'Create a user' })
  @ApiResponse({
    description: 'User created',
    type: ICreateUserResponse,
    status: HttpStatus.CREATED,
  })
  @ApiResponse({
    description: 'Validation error',
    status: HttpStatus.BAD_REQUEST,
  })
  @ApiResponse({
    description: 'Unauthorized',
    status: HttpStatus.UNAUTHORIZED,
  })
  @ApiResponse({
    description: 'User already exists',
    status: HttpStatus.CONFLICT,
  })
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
  @ApiOperation({ summary: 'Get a user' })
  @ApiResponse({
    description: 'User',
    type: IGetUserResponse,
    status: HttpStatus.OK,
  })
  @ApiResponse({
    description: 'Unauthorized',
    status: HttpStatus.UNAUTHORIZED,
  })
  @ApiResponse({
    description: 'User not found',
    status: HttpStatus.NOT_FOUND,
  })
  public async get(@Param('id') id: string): Promise<IGetUserResponse> {
    const user = await this.getUserService.execute({ id: Number(id) });

    return instanceToInstance(user);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a user' })
  @ApiResponse({
    description: 'User updated',
    status: HttpStatus.NO_CONTENT,
  })
  @ApiResponse({
    description: 'Validation error',
    status: HttpStatus.BAD_REQUEST,
  })
  @ApiResponse({
    description: 'Unauthorized',
    status: HttpStatus.UNAUTHORIZED,
  })
  @ApiResponse({
    description: 'User not found',
    status: HttpStatus.NOT_FOUND,
  })
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

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user' })
  @ApiResponse({
    description: 'User deleted',
    status: HttpStatus.NO_CONTENT,
  })
  @ApiResponse({
    description: 'Unauthorized',
    status: HttpStatus.UNAUTHORIZED,
  })
  @ApiResponse({
    description: 'User not found',
    status: HttpStatus.NOT_FOUND,
  })
  public async delete(@Param('id') id: string): Promise<void> {
    await this.deleteUserService.execute({ id: Number(id) });
  }
}

export default UserController;
