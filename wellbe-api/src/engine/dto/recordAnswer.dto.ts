import { IsDefined, IsEmail, IsInt, IsNotEmpty } from 'class-validator';

export class RecordAnswerDTO {
  @IsEmail({}, { message: 'The email must be a valid email address.' })
  @IsDefined({ message: 'The "email" property must be defined.' })
  @IsNotEmpty({ message: 'The "email" property must not be empty.' })
  email: string;

  @IsDefined({})
  @IsInt({})
  @IsNotEmpty({})
  P: number;

  @IsDefined({})
  @IsInt({})
  @IsNotEmpty({})
  W: number;

  @IsDefined({})
  @IsInt({})
  @IsNotEmpty({})
  SLS: number;

  @IsDefined({})
  @IsInt({})
  @IsNotEmpty({})
  SFM: number;
}

