import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import cookieParser from 'cookie-parser';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import compression from 'compression';
import helmet from 'helmet';
import hpp from 'hpp';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Security Middleware
  setupSecurityMiddleware(app);

  // Application Middleware
  setupApplicationMiddleware(app);

  // Port and Configuration
  const configService = app.get(ConfigService);
  const port = configService.getOrThrow<number>('GATEWAY_SERVICE_PORT');

  // CORS Configuration
  setupCors(app, configService);

  // Start the application
  await app.listen(port);
}

function setupSecurityMiddleware(app: NestExpressApplication) {
  app.set('trust proxy', 1); // Trust proxy
  app.use(hpp()); // Prevent HTTP Parameter Pollution
  app.use(
    helmet({
      crossOriginEmbedderPolicy: false,
      contentSecurityPolicy: {
        directives: {
          defaultSrc: [`'self'`],
          styleSrc: [`'self'`, `'unsafe-inline'`],
          imgSrc: [`'self'`, 'data:', 'validator.swagger.io'],
          scriptSrc: [`'self'`, `https: 'unsafe-inline'`],
          manifestSrc: [`'self'`],
          frameSrc: [`'self'`],
        },
      },
    }),
  ); // Set security-related HTTP headers
}

function setupApplicationMiddleware(app: NestExpressApplication) {
  // Enable request compression
  app.use(compression());

  // Use cookie parser
  app.use(cookieParser());

  // Global prefix for APIs
  app.setGlobalPrefix('api/v1');

  // Validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages: false,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
}

function setupCors(app: NestExpressApplication, configService: ConfigService) {
  app.enableCors({
    origin: [configService.getOrThrow<string>('CLIENT_URL', { infer: true })], // Frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'], // Allowed HTTP methods
    credentials: true, // Include credentials in cross-origin requests
  });
}

bootstrap();
