import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type CreditParameterDocument = CreditParameter & mongoose.Document;

@Schema()
export class CreditParameter {}

export const CreditParameterSchema =
  SchemaFactory.createForClass(CreditParameter);
