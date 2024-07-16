import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '@/app.module';

const userIdMock = jest.fn();
const userTokenMock = jest.fn();
const investmentIdMock = jest.fn();

describe('Investment (e2e)', () => {
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

  it('/investment (POST)', async () => {
    const user = await request(app.getHttpServer())
      .post('/users')
      .set('Authorization', `Bearer ${userTokenMock()}`)
      .send({
        fullname: 'user 2',
        email: 'user2@gmail.com',
        password: 'password',
      });

    userIdMock.mockReturnValue(user.body.id);

    const response = await request(app.getHttpServer())
      .post('/investments')
      .set('Authorization', `Bearer ${userTokenMock()}`)
      .send({
        user: userIdMock(),
        name: 'investment 1',
        initialValue: 1000,
        initialDate: '2021-10-10',
      });

    investmentIdMock.mockReturnValue(response.body.id);

    expect(response.status).toBe(201);
  });

  it('/investment (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get(`/investments/${investmentIdMock()}`)
      .set('Authorization', `Bearer ${userTokenMock()}`)
      .send();

    expect(response.status).toBe(200);
  });

  it('/ (LIST)', async () => {
    const response = await request(app.getHttpServer())
      .get('/investments')
      .set('Authorization', `Bearer ${userTokenMock()}`)
      .query({
        limit: 50,
        offset: 0,
        user: userIdMock(),
      });

    expect(response.status).toBe(200);
  });

  it('/investment (PATCH)', async () => {
    const response = await request(app.getHttpServer())
      .patch(`/investments/${investmentIdMock()}`)
      .set('Authorization', `Bearer ${userTokenMock()}`)
      .send({
        value: 400,
      });

    expect(response.status).toBe(204);
  });
});
