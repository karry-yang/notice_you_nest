// mail.module.ts
import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { BullModule } from '@nestjs/bull';
import { MailService } from './mail.service';
import { SMTPServerService } from './transport/smtp-server.service';
import { MailParserService } from './processing/mail-parser.service';
import { MailQueueService } from './processing/mail-queue.service';
import { VerificationHandler } from './handlers/verification.handler';

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    BullModule.registerQueue({ name: 'mail' }),
  ],
  providers: [
    MailService,
    SMTPServerService,
    MailParserService,
    MailQueueService,
    VerificationHandler,
  ],
  exports: [MailService],
})
export class MailModule {}