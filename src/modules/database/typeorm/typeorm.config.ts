import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';

export const getTypeOrmConfig = async (
  configService: ConfigService,
): Promise<TypeOrmModuleOptions> => ({
  type: 'mysql',
  host: configService.get('DB_HOST'),
  port: configService.get('DB_PORT'),
  username: configService.get('DB_USERNAME'),
  password: configService.get('DB_PASSWORD'),
  database: configService.get('DB_DATABASE'),
  
  // 动态加载所有模块的实体文件
  entities: [join(__dirname, '../../../modules/**/entities/*.entity{.ts,.js}')],
  
  synchronize: configService.get('DB_SYNCHRONIZE', true),
  logging: configService.get('DB_LOGGING', false),
  migrations: ['dist/database/migrations/*.js'],
  migrationsRun: true,
});