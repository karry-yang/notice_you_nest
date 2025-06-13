// transport/smtp-server.service.ts
import { Injectable, OnModuleInit } from '@nestjs/common';
import { SMTPServer } from 'smtp-server';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SMTPServerService implements OnModuleInit {
  private server: SMTPServer | null = null; // ✅ 明确初始化

  constructor(
    private readonly eventEmitter: EventEmitter2,
    private readonly configService: ConfigService
  ) {}

  onModuleInit() {
    this.server = new SMTPServer({
      authOptional: true,
      secure: false,
      onData: (stream, _session, callback) => {
        this.eventEmitter.emit('mail.raw', stream);
        callback();
      },
    });

    this.server.listen(this.configService.get('SMTP_PORT'));
  }

  onApplicationShutdown() {
    this.server?.close(); // ✅ 安全调用（因为可能为 null）
  }
}
