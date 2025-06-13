// processing/mail-queue.service.ts
import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class MailQueueService {
  constructor(
    @InjectQueue('mail') private readonly queue: Queue,
    private readonly eventEmitter: EventEmitter2
  ) {
    this.listenEvents();
  }

  private listenEvents() {
    this.eventEmitter.on('mail.parsed', (parsed) => {
      this.queue.add('process_mail', parsed); // 将解析后的邮件加入队列
    });
  }
}
