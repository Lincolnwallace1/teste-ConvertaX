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
  UseGuards,
} from '@nestjs/common';

// import { AuthGuard } from '@nestjs/passport';

import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import ValidationError from '@common/erros/ZodError';

// import { instanceToInstance } from 'class-transformer';

import { ICreateInvestmentDTO } from '@model/investment/dtos';
import { CreateInvestmentSchema } from '@views/investment/schemas';

import {
  ICreateInvestmentResponse,
  IGetInvestmentResponse,
} from '@views/investment/responses';

import { CreateInvestmentService, GetInvestmentService } from './useCases';

@ApiTags('Investment')
@Controller('investments')
class InvestmentController {
  constructor(
    private readonly createInvestmentService: CreateInvestmentService,
    private readonly getInvestmentService: GetInvestmentService,
  ) {}

  @Post('/')
  @ApiOperation({ summary: 'Create a investment' })
  @ApiResponse({
    description: 'Investment created',
    type: ICreateInvestmentResponse,
    status: HttpStatus.CREATED,
  })
  @ApiResponse({
    description: 'Validation error',
    status: HttpStatus.BAD_REQUEST,
  })
  async createInvestment(
    @Body() data: ICreateInvestmentDTO,
  ): Promise<ICreateInvestmentResponse> {
    const dataParsed = await CreateInvestmentSchema.parseAsync(data).catch(
      (error) => {
        throw new ValidationError(error);
      },
    );

    const investment = await this.createInvestmentService.execute({
      data: dataParsed,
    });

    return { id: investment.id };
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get a investment' })
  @ApiResponse({
    description: 'Investment found',
    type: IGetInvestmentResponse,
    status: HttpStatus.OK,
  })
  @ApiResponse({
    description: 'Investment not found',
    status: HttpStatus.NOT_FOUND,
  })
  async getInvestment(
    @Param('id') id: number,
  ): Promise<IGetInvestmentResponse> {
    const investment = await this.getInvestmentService.execute({ id });

    return investment;
  }
}

export default InvestmentController;
