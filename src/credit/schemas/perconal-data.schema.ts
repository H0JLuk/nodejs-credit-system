import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type PerconalDataDocument = PersonalData & mongoose.Document;

@Schema()
export class PersonalData {}

export const PerconalDataSchema = SchemaFactory.createForClass(PersonalData);
