import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Credit } from 'src/credit/schemas/credit.schema';

export type UserDocument = User & mongoose.Document;

@Schema()
export class User {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  middleName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ default: null })
  img: string;

  @Prop({ default: null })
  mailConfirmationCode: string;

  @Prop({ default: null })
  passwordResetCode: string;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Credit' }],
    default: [],
  })
  credits: Credit[];
}

export const UserSchema = SchemaFactory.createForClass(User);
