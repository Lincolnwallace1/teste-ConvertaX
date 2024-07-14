import {
  Body,
  Controller,
  Post,
  HttpStatus,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import ValidationError from '@/common/erros/ZodError';
import { AuthGuard } from '@nestjs/passport';

import { ILoginDTO } from '@model/auth/dtos';
import { LoginSchema } from '@views/auth/schemas';
import { ILoginResponse } from '@views/auth/responses';

import { LoginService } from '@controller/auth/useCases';

@Controller('auth')
@ApiTags('Auth')
class AuthController {
  constructor(private readonly loginService: LoginService) {}

  @UseGuards(AuthGuard('local'))
  @Post()
  @ApiOperation({ summary: 'Login' })
  @ApiResponse({
    description: 'User logged',
    status: HttpStatus.OK,
    type: ILoginResponse,
  })
  @ApiResponse({
    description: 'Validation error',
    status: HttpStatus.BAD_REQUEST,
  })
  @ApiResponse({
    description: 'Invalid credentials',
    status: HttpStatus.UNAUTHORIZED,
  })
  @HttpCode(HttpStatus.OK)
  public async login(@Body() data: ILoginDTO): Promise<ILoginResponse> {
    const dataParsed = await LoginSchema.parseAsync(data).catch((error) => {
      throw new ValidationError(error);
    });

    return await this.loginService.execute({ data: dataParsed });
  }
}

export default AuthController;
