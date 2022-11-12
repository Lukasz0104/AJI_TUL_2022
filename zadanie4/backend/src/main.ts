import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(
        new ValidationPipe({
            transform: true
        })
    );

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

    await app.listen(3000);
}
bootstrap();
