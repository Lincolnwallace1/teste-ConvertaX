import { Test, TestingModule } from '@nestjs/testing';

import UserController from '@controller/user/UserController';

import { ICreateUserResponse, IGetUserResponse } from '@views/user/responses';
import {
  CreateUserService,
  GetUserService,
  UpdateUserService,
  DeleteUserService,
} from '@controller/user/useCases';

const createUserExecuteMock = jest.fn();
const getUserExecuteMock = jest.fn();
const updateUserExecuteMock = jest.fn();
const deleteUserExecuteMock = jest.fn();

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: CreateUserService,
          useValue: {
            execute:
              createUserExecuteMock.mockResolvedValue(ICreateUserResponse),
          },
        },
        {
          provide: GetUserService,
          useValue: {
            execute: getUserExecuteMock.mockResolvedValue(IGetUserResponse),
          },
        },
        {
          provide: UpdateUserService,
          useValue: {
            execute: updateUserExecuteMock.mockResolvedValue({}),
          },
        },
        {
          provide: DeleteUserService,
          useValue: {
            execute: deleteUserExecuteMock.mockResolvedValue({}),
          },
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be create user', async () => {
    await controller.create({
      fullname: 'user',
      email: 'user@gmail.com',
      password: 'senha123',
    });

    expect(createUserExecuteMock).toHaveBeenCalled();
  });

  it('should be get user', async () => {
    await controller.get('1');

    expect(getUserExecuteMock).toHaveBeenCalled();
  });

  it('should be update user', async () => {
    await controller.update('1', {
      fullname: 'new user',
    });

    expect(updateUserExecuteMock).toHaveBeenCalled();
  });

  it('should be delete user', async () => {
    await controller.delete('1');

    expect(deleteUserExecuteMock).toHaveBeenCalled();
  });
});
