import { Module } from '@nestjs/common';
import { EngineService } from './engine.service';
import { EngineController } from './engine.controller';
import { CacheService } from 'src/cache/cache.service';
import { OpenAIService } from 'src/openai/openai.service';

@Module({
  providers: [EngineService, CacheService, OpenAIService],
  controllers: [EngineController],
})
export class EngineModule {}
