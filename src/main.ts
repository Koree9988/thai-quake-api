import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { EnvironmentConfigService } from './core/config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'debug', 'log', 'verbose'],
    cors: true,
  });

  const configEnv = app.get(EnvironmentConfigService);

  app.setGlobalPrefix('/api');

  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Thai Quake APIs')
    .setDescription('The Thai QuakeAPIs service')
    .setVersion('1.0')
    .addApiKey(
      {
        type: 'apiKey', // this should be apiKey
        name: 'authorization', // this is the name of the key you expect in header
        in: 'header',
      },
      'APIKeys',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/swagger', app, document, {
    useGlobalPrefix: true,
  });

  const HOST = '0.0.0.0';
  const PORT = configEnv.config.port || 3000;
  app.listen(PORT, HOST);
}

bootstrap();
