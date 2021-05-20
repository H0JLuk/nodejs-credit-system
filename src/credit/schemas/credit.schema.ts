import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

import { CreditParameter } from './credit-parameter.schema';
import { PersonalData } from './perconal-data.schema';
import { WorkFinance } from './work-finance.schema';
import { Contacts } from './contacts.schema';
import { Additionally } from './additionally.schema';
import { BankConsideration } from './bank-consideration.schema';

export type CreditDocument = Credit & mongoose.Document;

@Schema()
export class Credit {
  @Prop({ type: mongoose.Schema.Types.String, default: 'pending' })
  status: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'CreditParameter' })
  creditParameter: CreditParameter;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'PersonalData' })
  personalData: PersonalData;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'WorkFinance' })
  workFinance: WorkFinance;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Contacts' })
  contacts: Contacts;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Additionally' })
  additionally: Additionally;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'BankConsideration' })
  bankConsideration: BankConsideration;
}

export const CreditSchema = SchemaFactory.createForClass(Credit);
