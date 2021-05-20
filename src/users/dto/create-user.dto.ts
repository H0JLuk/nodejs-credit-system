import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsEmail({}, { message: 'should be a valid email' })
  readonly email: string;

  @IsString({ message: 'should be a string' })
  @Length(4, 20, { message: 'should be in 4..20 chars' })
  readonly password: string;

  @IsString({ message: 'should be a string' })
  @Length(3, 20, { message: 'should be in 3..20 chars' })
  readonly firstName: string;

  @IsString({ message: 'should be a string' })
  @Length(3, 20, { message: 'should be in 3..20 chars' })
  readonly middleName: string;

  @IsString({ message: 'should be a string' })
  @Length(3, 20, { message: 'should be in 3..20 chars' })
  readonly lastName: string;

  readonly mailConfirmationCode?: string;
}
