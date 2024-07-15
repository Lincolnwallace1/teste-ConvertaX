import {
  Body,
  Controller,
  Get,
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

import {
  ICreateInvestmentDTO,
  IUpdateInvestmentDTO,
} from '@model/investment/dtos';
import {
  CreateInvestmentSchema,
  UpdateInvestmentSchema,
} from '@views/investment/schemas';

import {
  ICreateInvestmentResponse,
  IGetInvestmentResponse,
  IWithdrawnInvestmentResponse,
} from '@views/investment/responses';

import {
  CreateInvestmentService,
  GetInvestmentService,
  WithdrawInvestmentService,
} from './useCases';

@ApiTags('Investment')
@Controller('investments')
class InvestmentController {
  constructor(
    private readonly createInvestmentService: CreateInvestmentService,
    private readonly getInvestmentService: GetInvestmentService,
    private readonly withdrawInvestmentService: WithdrawInvestmentService,
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
  @ApiResponse({
    description: 'Unauthorized',
    status: HttpStatus.UNAUTHORIZED,
  })
  @ApiResponse({
    description: 'User not found',
    status: HttpStatus.NOT_FOUND,
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
    description: 'Unauthorized',
    status: HttpStatus.UNAUTHORIZED,
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

  @Patch('/:id')
  @ApiOperation({ summary: 'Withdrawn a investment' })
  @ApiResponse({
    description: 'Investment withdrawn',
    type: IWithdrawnInvestmentResponse,
    status: HttpStatus.OK,
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
    description: 'Investment not found',
    status: HttpStatus.NOT_FOUND,
  })
  async withdrawnInvestment(
    @Param('id') id: number,
    @Body() data: IUpdateInvestmentDTO,
  ): Promise<IWithdrawnInvestmentResponse> {
    const dataParsed = await UpdateInvestmentSchema.parseAsync(data).catch(
      (error) => {
        throw new ValidationError(error);
      },
    );

    const investment = await this.withdrawInvestmentService.execute({
      id,
      data: dataParsed,
    });

    return investment;
  }
}

export default InvestmentController;
