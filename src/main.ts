import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // --- CONFIGURACIÓN DE SWAGGER (Esto es lo que te falta) ---
  const config = new DocumentBuilder()
    .setTitle('UCAB Tasks API')
    .setDescription('Documentación de la API de Notas')
    .setVersion('1.0')
    .addTag('notes')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);
  // ----------------------------------------------------------

  await app.listen(3000);
}
bootstrap();
