import {
  IsString,
  IsEmail,
  IsStrongPassword,
  IsNotEmpty,
  IsDefined,
} from 'class-validator';

export class RegisterEmployeeDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @IsStrongPassword()
  password: string;

  @IsString()
  @IsNotEmpty()
  @IsDefined()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @IsDefined()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  @IsDefined()
  companyAssigned: string;

  @IsString()
  @IsNotEmpty()
  @IsDefined()
  profileImage: string;
}
