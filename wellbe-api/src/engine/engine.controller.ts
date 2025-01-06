import { Body, Controller, Get, Post } from '@nestjs/common';
import { GenerateQuestionDTO } from './dto/generateQuestion.dto';
import { EngineService } from './engine.service';
import { RecordAnswerDTO } from './dto/recordAnswer.dto';

@Controller('engine')
export class EngineController {
  constructor(private engineService: EngineService) {}

  @Get('generateQuestions')
  generateQuestion(@Body() generateQuestion: GenerateQuestionDTO) {
    return this.engineService.generateQuestions(generateQuestion);
  }
  @Post('recordAnswer')
  recdAnswer(@Body() recordAnswerDTO: RecordAnswerDTO) {
    return this.engineService.recordAnswer(recordAnswerDTO);
  }
}
