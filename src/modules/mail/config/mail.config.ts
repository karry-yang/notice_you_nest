// config/mail.config.ts
// @todo  展示没有使用
export default () => ({
    smtp: {
      port: parseInt(process.env.SMTP_PORT ?? '25', 10),
      hostName: process.env.SMTP_HOSTNAME ?? 'localhost',
      requireAuth: process.env.SMTP_REQUIRE_AUTH === 'true',
      maxConcurrency:process.env.SMTP_MAX_CONCURRENCY==='10'
    },
    mailer: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
        from: process.env.MAIL_FROM,
      },
  });
  