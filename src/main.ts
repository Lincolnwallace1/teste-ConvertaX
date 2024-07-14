import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import ExceptionMiddleware from '@common/infra/http/middlewares/ExceptionMiddleware';

class App {
  private port = Number(process.env.API_PORT) || 8080;

  constructor() {
    this.init();
  }

  private async init() {
    const app = await NestFactory.create(AppModule);

    app.useGlobalFilters(new ExceptionMiddleware());

    await app.listen(this.port).then(() => {
      console.log(`Server running on ${this.port}`);
    });
  }
}

export default new App();
