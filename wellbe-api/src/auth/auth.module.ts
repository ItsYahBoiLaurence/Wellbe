import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { EmployeeSchema } from './schema/auth.schema';
import { OtpService } from 'src/otp/otp.service';
import { CacheService } from 'src/cache/cache.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Employee', schema: EmployeeSchema }]),
  ],
  controllers: [AuthController],
  providers: [AuthService, OtpService, CacheService],
})
export class AuthModule {}
