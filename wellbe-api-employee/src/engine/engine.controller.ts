import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';
import {
  GenerateQuestionDTO,
  GenerateReport,
  SubmitAnswersDTO,
} from './dto/engine.dto';
import { EngineService } from './engine.service';

@Controller('engine')
export class EngineController {
  constructor(private readonly engineService: EngineService) {}

  @Get('generateQuestions')
  @ApiQuery({
    name: 'email',
    type: String,
    required: true,
    description: 'First parameter',
  })
  @ApiQuery({
    name: 'company',
    type: String,
    required: true,
    description: 'Second parameter',
  })
  generateQuestions(@Query() generateQuestionsDTO: GenerateQuestionDTO) {
    return this.engineService.generateQuestions(generateQuestionsDTO);
  }

  @Post('submitAnswers')
  @ApiQuery({
    name: 'email',
    type: String,
    required: true,
    description: 'Email you want to submit your answer.',
  })
  submitAnswers(
    @Query('email') email: string,
    @Body() submitAnswers: SubmitAnswersDTO,
  ) {
    return this.engineService.submitAnswers(submitAnswers, email);
  }

  @Get('generateReport')
  @ApiQuery({
    name: 'email',
    type: String,
    required: true,
    description: 'Email you want to generate report',
  })
  @ApiQuery({
    name: 'company',
    type: String,
    required: true,
    description: 'Company you want to generate report',
  })
  generateReport(@Query() generateReport: GenerateReport) {
    return this.engineService.generateReport(generateReport);
  }
}
