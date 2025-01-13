import {
  IsString,
  IsEmail,
  IsNotEmpty,
  ValidateNested,
  IsInt,
  ArrayNotEmpty,
  IsDefined,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class GenerateQuestionDTO {
  @IsString()
  @IsEmail()
  @IsDefined()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsDefined()
  @IsNotEmpty()
  company: string;
}

class AnswerItemDto {
  @ApiProperty({ description: 'Index of the Question', example: '0_0' })
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  indexQuestion: string;

  @ApiProperty({ description: 'Value of answers', example: 1 })
  @IsInt()
  @IsDefined()
  @IsNotEmpty()
  answer: number;
}

export class SubmitAnswersDTO {
  @ApiProperty({
    description: 'Array of answers',
    type: [AnswerItemDto],
  })
  @ArrayNotEmpty()
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => AnswerItemDto)
  answers: AnswerItemDto[];
}

export class GenerateReport {
  @IsString()
  @IsEmail()
  @IsDefined()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsDefined()
  @IsNotEmpty()
  company: string;
}
