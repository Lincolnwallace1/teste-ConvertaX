import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '@/app.module';

const userIdMock = jest.fn();
const userTokenMock = jest.fn();

describe('User (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    const token = await request(app.getHttpServer()).post('/auth').send({
      email: 'lincolnwallace10@gmail.com',
      password: 'senha12',
    });

    userTokenMock.mockReturnValue(token.body.accessToken);
  });

  it('/user (POST)', async () => {
    const response = await request(app.getHttpServer())
      .post('/users')
      .set('Authorization', `Bearer ${userTokenMock()}`)
      .send({
        fullname: 'user 1',
        email: 'user1@gmail.com',
        password: 'password',
      });

    userIdMock.mockReturnValue(response.body.id);

    expect(response.status).toBe(201);
  });

  it('/user (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get(`/users/${userIdMock()}`)
      .set('Authorization', `Bearer ${userTokenMock()}`)
      .send();

    expect(response.status).toBe(200);
  });

  it('/user (PATCH)', async () => {
    const response = await request(app.getHttpServer())
      .patch(`/users/${userIdMock()}`)
      .set('Authorization', `Bearer ${userTokenMock()}`)
      .send({
        fullname: 'new User',
      });

    expect(response.status).toBe(204);
  });

  it('/user (DELETE)', async () => {
    const response = await request(app.getHttpServer())
      .delete(`/users/${userIdMock()}`)
      .set('Authorization', `Bearer ${userTokenMock()}`)
      .send();

    expect(response.status).toBe(204);
  });
});
