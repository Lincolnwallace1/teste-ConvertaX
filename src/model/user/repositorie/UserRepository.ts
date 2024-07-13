import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import User from '@entities/User';

import ICreateUserDTO from '@model/user/dtos/ICreateUserDTO';
import IUpdateUserDTO from '@model/user/dtos/IUpdateUserDTO';

@Injectable()
class UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  public async create(data: ICreateUserDTO): Promise<User> {
    const user = this.userRepository.create(data);

    return this.userRepository.save(user);
  }

  public async update(user: number, data: IUpdateUserDTO): Promise<void> {
    await this.userRepository.update(user, data);
  }

  public async list(
    where?: object | object[],
    relations?: string[],
    take?: number,
    skip?: number,
  ): Promise<[User[], number]> {
    return this.userRepository.findAndCount({
      where,
      relations,
      take,
      skip,
    });
  }

  public async get(
    where: object | object[],
    relations?: string[],
  ): Promise<User> {
    return this.userRepository.findOne({ where, relations });
  }

  public async delete(id: number): Promise<void> {
    await this.userRepository.update(id, { enabled: false });
  }
}

export default UserRepository;
