import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';
import { RedisModule, RedisModuleOptions } from '@nestjs-modules/ioredis';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      // useFactory: (configService: ConfigService) => ({
      //   type: 'mysql',
      //   host: configService.get('database.mysql.host'),
      //   port: configService.get('database.mysql.port'),
      //   username: configService.get('database.mysql.username'),
      //   password: configService.get('database.mysql.password'),
      //   database: configService.get('database.mysql.database'),
      //   entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      //   synchronize: true, // 生产环境应为false
      // }),
      useFactory: (config: ConfigService) => {
        // 调试输出：验证配置是否加载
        console.log('当前MySQL配置:', {
          host: config.get('MYSQL_HOST'),
          user: config.get('MYSQL_USERNAME'),
          pass: config.get('MYSQL_PASSWORD') ? '***' : '空'
        });
    
        return {
          type: 'mysql',
          host: config.get('MYSQL_HOST'),
          port: parseInt(config.get('MYSQL_PORT')??'3306', 10), // 明确转换为数字
          username: String(config.get('MYSQL_USERNAME')), // 强制转为字符串
          password: String(config.get('MYSQL_PASSWORD')), // 强制转为字符串
          database: config.get('MYSQL_DATABASE'),
          entities: [__dirname + '/../**/*.entity{.ts,.js}'],
          synchronize: true,
          extra: { 
            trustServerCertificate: true // 针对某些Windows环境
          }
        };
      },
    }),
    // MongooseModule.forRootAsync({
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    //   useFactory: (configService: ConfigService) => ({
    //     uri: configService.get('database.mongodb.uri'),
    //   }),
    // }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule], // 确保ConfigModule已导入
      inject: [ConfigService], // 显式注入
      useFactory: async (config: ConfigService) => {
        const uri = config.get<string>('MONGODB_URI');
        console.log('Mongoose连接URI:', uri); // 调试输出
        if (!uri) throw new Error('MONGODB_URI未定义');
        return { uri };
      },
    }),
    RedisModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService): Promise<RedisModuleOptions> => ({
        type: 'single', // 单节点模式
        options: {
          host: configService.get<string>('REDIS_HOST'),
          port: configService.get<number>('REDIS_PORT'),
          password: configService.get<string>('REDIS_PASSWORD'),
          db: configService.get<number>('REDIS_DB', 0),
        },
      }),
    }),
  ],
})
export class DatabaseModule {}
