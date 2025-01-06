import { Global, Module } from '@nestjs/common';
import { EmailerService } from './emailer.service';

@Global()
@Module({
  providers: [EmailerService],
})
export class EmailerModule {}
