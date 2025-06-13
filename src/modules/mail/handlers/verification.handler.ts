// handlers/verification.handler.ts
import { Injectable } from '@nestjs/common';
import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
import { MailService } from '@mail/mail.service';

// @todo  这里不需监测邮箱服务  需要的而是监测smpt对用户发送给服务器的邮件信息
@Injectable()
@Processor('mail')
export class VerificationHandler {
  constructor(private readonly mailService: MailService) {}

  @Process('process_mail')
  async handleIncomingMail(job: Job<{ text: string }>) {
    
    const code = this.extractVerificationCode(job.data.text);
    if (code) {
      await this.mailService.sendVerificationCode('admin@example.com', code);
    }
  }

  private extractVerificationCode(text: string): string | null {
    const match = text.match(/验证码[:：]\s*(\d{6})/);
    return match ? match[1] : null;
  }
}