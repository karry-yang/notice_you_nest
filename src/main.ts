import * as dotenv from 'dotenv';
dotenv.config();
import * as fs from 'fs';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { ValidationPipe } from '@nestjs/common';
// import 'module-alias/register';
async function bootstrap() {
  // const httpsOptions = {
  //   key: fs.readFileSync(
  //     process.env.SSL_KEY_PATH ??
  //       (() => {
  //         throw new Error('SSL_KEY_PATH is not defined');
  //       })()
  //   ),
  //   cert: fs.readFileSync(
  //     process.env.SSL_CERT_PATH ??
  //       (() => {
  //         throw new Error('SSL_CERT_PATH is not defined');
  //       })()
  //   ),
  // };

  const app = await NestFactory.create(AppModule, 
   // {  httpsOptions,  }
);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // ✅ 自动将 plain object 转换为 DTO 类实例
      whitelist: true, // ✅ 自动剔除多余字段
      forbidNonWhitelisted: true, // ❌ 多余字段会抛错（可选）
    }),
  );
  // 启用 CORS 以允许前端访问
  app.enableCors({
    origin: 'http://localhost:3000', // 允许的前端 URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // 如果需要支持 cookies 或 authorization headers，可以设置为 true
  })
  app.useGlobalFilters(new HttpExceptionFilter());

  
  app.useGlobalInterceptors(new TransformInterceptor() )
  // Swagger 配置
  const config = new DocumentBuilder()
    .setTitle('NestJS Three Layer API')
    .setDescription('API description')
    .setVersion('1.0')
    .addTag('users')
    .addBearerAuth() // 添加 JWT 验证按钮
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  console.log('✅ HTTPS 服务运行成功 https://localhost:5000');
  await app.listen(5000, '0.0.0.0'); // 接收所有地址请求
}
bootstrap();
