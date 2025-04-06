export default () => ({
  database: {
    mysql: {
      host: process.env.MYSQL_HOST ?? '127.0.0.1',
      port: parseInt(process.env.MYSQL_PORT ?? '3306', 10),
      username: process.env.MYSQL_USERNAME ?? 'root',
      password: process.env.MYSQL_PASSWORD ?? 'root',
      database: process.env.MYSQL_DATABASE ?? 'noticeyou',
    },
    mongodb: {
      uri: process.env.MONGODB_URI ?? 'mongodb://127.0.0.1:27017/noticeyou',
    },
    redis: {
      host: process.env.REDIS_HOST ?? '127.0.0.1',
      port: parseInt(process.env.REDIS_PORT ?? '6379', 10),
      password: process.env.REDIS_PASSWORD ?? '',
    },
  },
  jwt: {
    secret: process.env.JWT_SECRET ?? 'noticeyou',
    expiresIn: process.env.JWT_EXPIRES_IN ?? '3600s',
  },
});
