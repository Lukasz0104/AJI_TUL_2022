import { Logger, ValidationPipe } from '@nestjs/common';
import { NestApplication, NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
    const logger = new Logger(NestApplication.name);

    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(
        new ValidationPipe({
            transform: true
        })
    );

    app.setGlobalPrefix('api');

    const swaggerConfig = new DocumentBuilder()
        .setTitle('Products API')
        .addBearerAuth()
        .build();

    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('swagger', app, document, {
        swaggerOptions: {
            tagsSorter: 'alpha'
        }
    });

    const port = parseInt(process.env.PORT, 10) || 3000;
    await app.listen(port);

    logger.log(`Application is running on ${await app.getUrl()}`);
}
bootstrap();
