import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { EngineModule } from './engine/engine.module';
import { CacheModule } from './cache/cache.module';
import { OpenAIModule } from './openai/openai.module';
import { OpenAIService } from './openai/openai.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRoot(process.env.DATABASE_HOST, {
      dbName: process.env.DATABASE_NAME,
      bufferCommands: false,
    }),
    EngineModule,
    CacheModule,
    OpenAIModule,
  ],
  controllers: [AppController],
  providers: [AppService, OpenAIService],
})
export class AppModule {}
