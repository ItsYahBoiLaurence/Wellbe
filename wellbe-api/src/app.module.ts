import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { CacheModule } from './cache/cache.module';
import { EmailerModule } from './emailer/emailer.module';
import { OtpModule } from './otp/otp.module';
import { EngineModule } from './engine/engine.module';
import { MongooseModule } from '@nestjs/mongoose';
import { OpenAIModule } from './openai/openai.module';

@Module({
  imports: [
    AuthModule,
    DatabaseModule,
    CacheModule,
    EmailerModule,
    OtpModule,
    EngineModule,
    MongooseModule.forRoot(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000, // Timeout for server selection in milliseconds
      socketTimeoutMS: 45000,
    }),
    OpenAIModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
