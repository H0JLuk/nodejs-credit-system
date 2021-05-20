import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type WorkFinanceDocument = WorkFinance & mongoose.Document;

@Schema()
export class WorkFinance {}

export const WorkFinanceSchema = SchemaFactory.createForClass(WorkFinance);
