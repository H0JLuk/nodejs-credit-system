import { Injectable } from '@nestjs/common';
import { ObjectId } from 'mongoose';
import { AdditionallyDto } from './dto/additionally.dto';
import { BankConsiderationDto } from './dto/bank-consideration.dto';
import { ContactsDto } from './dto/contacts.dto';
import { CreateCredit } from './dto/create-credit.dto';
import { PerconalDataDto } from './dto/perconal-data.dto';
import { WorkFinanceDto } from './dto/work-finance.dto';

@Injectable()
export class CreditService {
  async getCreditById(id: ObjectId): Promise<any> {
    return;
  }

  createCredit(dto: CreateCredit): Promise<any> {
    return;
  }

  setPerconalData(dto: PerconalDataDto): Promise<any> {
    return;
  }

  setWorkFinance(dto: WorkFinanceDto): Promise<any> {
    return;
  }

  setContacts(dto: ContactsDto): Promise<any> {
    return;
  }

  setAdditionally(dto: AdditionallyDto): Promise<any> {
    return;
  }

  seBankConsideration(dto: BankConsiderationDto): Promise<any> {
    return;
  }
}
