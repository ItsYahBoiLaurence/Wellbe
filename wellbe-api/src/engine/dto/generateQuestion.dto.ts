import { IsDefined, IsEmail, IsNotEmpty } from 'class-validator';

export class GenerateQuestionDTO {
  @IsEmail({}, { message: 'The email must be a valid email address.' })
  @IsDefined({ message: 'The "email" property must be defined.' })
  @IsNotEmpty({ message: 'The "email" property must not be empty.' })
  email: string;
}
