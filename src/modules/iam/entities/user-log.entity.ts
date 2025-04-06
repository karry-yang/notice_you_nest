import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class UserLog extends Document {
  @Prop({ required: true })
  userId !: number;

  @Prop({ required: true })
  action !: string;

  @Prop()
  details !: string;
}

export const UserLogSchema = SchemaFactory.createForClass(UserLog);
