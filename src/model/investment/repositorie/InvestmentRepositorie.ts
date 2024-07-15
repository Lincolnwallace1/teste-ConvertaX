import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import Investment from '@entities/Investment';

import {
  ICreateInvestmentDTO,
  IUpdateInvestmentDTO,
} from '@model/investment/dtos';

@Injectable()
class InvestmentRepositorie {
  constructor(
    @InjectRepository(Investment)
    private readonly investmentRepository: Repository<Investment>,
  ) {}

  public async create(data: ICreateInvestmentDTO): Promise<Investment> {
    return await this.investmentRepository.save(data);
  }

  public async update(id: number, data: IUpdateInvestmentDTO): Promise<void> {
    await this.investmentRepository.update(id, {
      ...data,
    });
  }

  public async get(
    where: object | object[],
    relations?: string[],
  ): Promise<Investment> {
    return await this.investmentRepository.findOne({
      where,
      relations,
    });
  }

  public async list(
    where?: object | object[],
    relations?: string[],
    take?: number,
    skip?: number,
  ): Promise<[Investment[], number]> {
    return this.investmentRepository.findAndCount({
      where,
      relations,
      take,
      skip,
    });
  }
}

export default InvestmentRepositorie;
