import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { LoggingInterceptor } from './modules/logging/logging.interceptor';
import { LOGGER_SERVICE } from './modules/logging/constants/logging.constants';
import 'module-alias/register';

async function bootstrap() {
  // 检查实际加载的环境变量
  console.log('所有环境变量:', process.env);
  const app = await NestFactory.create(AppModule);
  // 全局日志拦截器
  app.useGlobalInterceptors(app.get(LoggingInterceptor));
  // Swagger配置
  const config = new DocumentBuilder()
    .setTitle('NestJS Three Layer API')
    .setDescription('API description')
    .setVersion('1.0')
    .addTag('users')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
