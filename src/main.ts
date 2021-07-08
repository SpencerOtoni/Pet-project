import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

/**
 * Definição do Método bootstrap
 *
 * Método inicializa a aplicação e carrega o módulo
 * principal da aplciação.
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
