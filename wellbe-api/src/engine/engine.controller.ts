import { Body, Controller, Get, HttpException, Post, Query } from '@nestjs/common';
import { GenerateQuestionDTO } from './dto/generateQuestion.dto';
import { EngineService } from './engine.service';
import { RecordAnswerDTO } from './dto/recordAnswer.dto';
import { log } from 'console';
import { RESPONSE_PASSTHROUGH_METADATA } from '@nestjs/common/constants';
import { Connection } from 'mongoose';

@Controller('engine')
export class EngineController {
  constructor(
    private engineService: EngineService
  ) { }

  @Get('greet-hello')
  sayHello() {
    return { message: "HELLOOOOOOO!" }
  }

  @Get('generateQuestions')
  generateQuestion(@Query() query: GenerateQuestionDTO) {

    return this.engineService.generateQuestions(query);

  }


  @Post('recordAnswer')
  recdAnswer(@Body() recordAnswerDTO: RecordAnswerDTO) {
    return this.engineService.recordAnswer(recordAnswerDTO);
  }


  @Get('delete')
  async resetData(@Query() email: string) {
    return this.engineService.deleteData(email);
  }

  @Get('get-tip')
  async getDailyTips(@Query() email: string) {
    return this.engineService.getTipLog(email)
  }
}
