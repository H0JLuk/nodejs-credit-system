import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type AdditionallyDocument = Additionally & mongoose.Document;

@Schema()
export class Additionally {}

export const AdditionallySchema = SchemaFactory.createForClass(Additionally);
