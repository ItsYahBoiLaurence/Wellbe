import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from '@x/common';

@ApiTags('App')
@Controller('')
export class AppController {
  @Get('health-check')
  @ApiOperation({ operationId: 'healthCheck' })
  @Public()
  getHealthStatus(): HealthStatus {
    return { status: 'ok', timestamp: Date.now() };
  }
}

interface HealthStatus {
  status: string;
  timestamp: number;
}
