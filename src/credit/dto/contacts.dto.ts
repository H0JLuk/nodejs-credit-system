import { IsPhoneNumber } from 'class-validator';

export class ContactsDto {
  @IsPhoneNumber('RU', { message: 'should be a phone number' })
  workPhone: string;

  @IsPhoneNumber('RU', { message: 'should be a phone number' })
  homePhone: string;
}
