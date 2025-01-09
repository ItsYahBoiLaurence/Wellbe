import { Module } from '@nestjs/common';
import { EngineController } from './engine.controller';
import { EngineService } from './engine.service';
import { OpenAIService } from 'src/openai/openai.service';

@Module({
  controllers: [EngineController],
  providers: [EngineService, OpenAIService],
})
export class EngineModule { }
