import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Patch,
  HttpStatus,
  UseGuards,
  Query,
  HttpCode,
} from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

import { AuthGuard } from '@nestjs/passport';

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
  IListInvestmentDTO,
} from '@model/investment/dtos';
import {
  CreateInvestmentSchema,
  UpdateInvestmentSchema,
  ListInvestmentSchema,
} from '@views/investment/schemas';

import {
  ICreateInvestmentResponse,
  IGetInvestmentResponse,
  IWithdrawnInvestmentResponse,
  IListInvestmentResponse,
} from '@views/investment/responses';

import {
  CreateInvestmentService,
  GetInvestmentService,
  WithdrawnInvestmentService,
  ListInvestmentService,
  PaymentInvestmentService,
} from './useCases';

@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth('Bearer')
@ApiTags('Investment')
@Controller('investments')
class InvestmentController {
  constructor(
    private readonly createInvestmentService: CreateInvestmentService,
    private readonly getInvestmentService: GetInvestmentService,
    private readonly withdrawInvestmentService: WithdrawnInvestmentService,
    private readonly listInvestmentService: ListInvestmentService,
    private readonly paymentInvestmentService: PaymentInvestmentService,
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
  async create(
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
  async get(@Param('id') id: number): Promise<IGetInvestmentResponse> {
    const investment = await this.getInvestmentService.execute({ id });

    return investment;
  }

  @Patch('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
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
  async withdrawn(
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

  @Get('/')
  @ApiOperation({ summary: 'List investments' })
  @ApiResponse({
    description: 'Investments found',
    type: IListInvestmentResponse,
    status: HttpStatus.OK,
  })
  @ApiResponse({
    description: 'Unauthorized',
    status: HttpStatus.UNAUTHORIZED,
  })
  async list(
    @Query() data: IListInvestmentDTO,
  ): Promise<IListInvestmentResponse> {
    const dataParsed = await ListInvestmentSchema.parseAsync(data).catch(
      (error) => {
        throw new ValidationError(error);
      },
    );

    const investments = await this.listInvestmentService.execute({
      data: dataParsed,
    });

    return investments;
  }

  @Cron('0 0 */1 * * *')
  handleCron() {
    this.paymentInvestmentService.execute();
  }
}

export default InvestmentController;
