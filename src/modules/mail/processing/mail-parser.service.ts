// processing/mail-parser.service.ts
import { Injectable } from '@nestjs/common';
import { simpleParser } from 'mailparser';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Readable } from 'stream';

@Injectable()
export class MailParserService {
  constructor(private eventEmitter: EventEmitter2) {}

  async parse(stream: Readable) {
    const parsed = await simpleParser(stream);
    this.eventEmitter.emit('mail.parsed', parsed);
    return parsed;
  }
}