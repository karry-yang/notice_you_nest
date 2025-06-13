// mail.service.ts
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailService {
  private readonly transporter: nodemailer.Transporter;

  constructor(private readonly configService: ConfigService) {
    // this.transporter = nodemailer.createTransport({
    //   service: 'gmail',
    //   auth: {
    //     user: this.configService.get('MAIL_USER'),
    //     pass: this.configService.get('MAIL_PASS'),
    //   },
    // });
    this.transporter = nodemailer.createTransport({
      host: 'smtp.qq.com', // QQ邮箱SMTP服务器
      port: 465, // SSL加密端口
      secure: true, // 必须为true，否则报错
      auth: {
        user: this.configService.get('MAIL_USER'), // 你的QQ邮箱
        pass: this.configService.get('MAIL_PASS'), // SMTP授权码
      },
    });
  }

  // async sendVerificationCode(to: string, code: string) {
  //   console.log("邮箱服务发送中")
  //   await this.transporter.sendMail({
  //     from: '"系统通知" <noreply@example.com>',
  //     to,
  //     subject: '您的验证码',
  //     text: `验证码：${code}，5分钟内有效`,
  //   });
  // }
  async sendVerificationCode(to: string, code: string): Promise<void> {
    // 0. 检查transporter是否初始化
    if (!this.transporter) {
      throw new Error('邮件服务未初始化');
    }
  
    try {
      console.log(`尝试发送验证码至 ${to}，代码: ${code}`);
      
      // 1. 发送邮件
      const info = await this.transporter.sendMail({
        from: '"系统通知" <884902073@qq.com>',
        to,
        subject: '您的验证码',
        text: `验证码：${code}，5分钟内有效`,
      });
  
      // 2. 打印SMTP服务器响应
      console.log('SMTP服务器响应:', info.response);
      console.log('邮件ID:', info.messageId);
  
    } catch (error) {
      // 3. 详细错误日志
      console.error('邮件发送失败详情:');
      console.error('错误类型:', (error as any).name);
      if (error instanceof Error) {
        console.error('错误消息:', error.message);
      } else {
        console.error('错误消息: 未知错误');
      }
      console.error('SMTP错误代码:', (error as any).responseCode);
      if (typeof error === 'object' && error !== null && 'command' in error) {
        console.error('原始命令:', (error as any).command);
      } else {
        console.error('原始命令: 未知');
      }
  
      throw new Error(`邮件发送失败: ${error instanceof Error ? error.message : '未知错误'}`);
    }
  }
}