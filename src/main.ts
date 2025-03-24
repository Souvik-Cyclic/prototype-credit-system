import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //Swagger Config
  const config = new DocumentBuilder()
    .setTitle('Prototype Credit System API')
    .setDescription('API Documentation for Prototype Credit System')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(process.env.PORT ?? 3000);
  console.log("Server is running on http://localhost:3000");
  console.log("API Documentation is available at http://localhost:3000/api/docs");
}
bootstrap();
