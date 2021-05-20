import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type ContactsDocument = Contacts & mongoose.Document;

@Schema()
export class Contacts {}

export const ContactsSchema = SchemaFactory.createForClass(Contacts);
