import { Global, Module } from '@nestjs/common';
import { OtpService } from './otp.service';
import { CacheService } from 'src/cache/cache.service';

@Global()
@Module({
  providers: [OtpService, CacheService],
  exports: [OtpService, CacheService],
})
export class OtpModule {}
