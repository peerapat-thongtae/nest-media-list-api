import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  console.log(process.env.DATABASE_USERNAME);

  const app = await NestFactory.create(AppModule, { cors: true });
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
