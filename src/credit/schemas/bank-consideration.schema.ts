import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type BankConsiderationDocument = BankConsideration & mongoose.Document;

@Schema()
export class BankConsideration {}

export const BankConsiderationSchema =
  SchemaFactory.createForClass(BankConsideration);
