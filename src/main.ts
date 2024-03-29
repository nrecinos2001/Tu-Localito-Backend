import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const port = process.env.PORT;
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Tu Localito SV API')
    .setDescription(
      'Esta API tiene como fin mostrar los distintos endpoints que estan disponibles para poder compartir informacion de nuestra empresa a los servicios tanto móviles como web que lo necesiten.',
    )
    .setVersion('1.0')
    .addTag('Tu Localito SV')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/v1', app, document);

  await app.listen(port);
  console.log(`listening server on port ${port}`);
}
bootstrap();
