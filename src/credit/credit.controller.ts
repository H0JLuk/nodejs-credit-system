import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ObjectId } from 'mongoose';

import { CustomValidationPipe } from '../pipes/custom-validation.pipe';
import { CreditService } from './credit.service';
import { AdditionallyDto } from './dto/additionally.dto';
import { BankConsiderationDto } from './dto/bank-consideration.dto';
import { ContactsDto } from './dto/contacts.dto';
import { CreateCredit } from './dto/create-credit.dto';
import { PerconalDataDto } from './dto/perconal-data.dto';
import { WorkFinanceDto } from './dto/work-finance.dto';

@Controller('credit')
export class CreditController {
  constructor(private creditService: CreditService) {}

  @Get('/:id')
  @UsePipes(CustomValidationPipe)
  getCreditById(@Param('id') id: ObjectId) {
    return this.creditService.getCreditById(id);
  }

  @Post()
  @UsePipes(CustomValidationPipe)
  @UseInterceptors(FileInterceptor('file'))
  createCredit(dto: CreateCredit, @UploadedFile() file: Express.Multer.File) {
    console.log(file);
    return this.creditService.createCredit(dto);
  }

  @Put('/perconal-data')
  @UsePipes(CustomValidationPipe)
  setPerconalData(@Body() dto: PerconalDataDto) {
    return this.creditService.setPerconalData(dto);
  }

  @Put('/work-finance')
  @UsePipes(CustomValidationPipe)
  setWorkFinance(@Body() dto: WorkFinanceDto) {
    return this.creditService.setWorkFinance(dto);
  }

  @Put('/contacts')
  @UsePipes(CustomValidationPipe)
  setContacts(@Body() dto: ContactsDto) {
    return this.creditService.setContacts(dto);
  }

  @Put('/additionally')
  @UsePipes(CustomValidationPipe)
  setAdditionally(@Body() dto: AdditionallyDto) {
    return this.creditService.setAdditionally(dto);
  }

  @Put('/bank-consideration')
  @UsePipes(CustomValidationPipe)
  seBankConsideration(@Body() dto: BankConsiderationDto) {
    return this.creditService.seBankConsideration(dto);
  }
}
