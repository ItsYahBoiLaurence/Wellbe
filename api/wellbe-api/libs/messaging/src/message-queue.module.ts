import { DynamicModule, Module } from '@nestjs/common';
import {
  RabbitMQExchangeConfig,
  RabbitMQModule,
} from '@golevelup/nestjs-rabbitmq';
import { MessageQueueConfigOptions } from './message-queue-config-options';
import { MessageQueueService } from './message-queue.service';

@Module({})
export class MessageQueueModule {
  static register(
    config: MessageQueueConfigOptions,
    global = false,
    exchanges: RabbitMQExchangeConfig[] = []
  ): DynamicModule {
    return {
      global,
      module: MessageQueueModule,
      imports: [
        RabbitMQModule.forRoot(RabbitMQModule, {
          exchanges,
          uri: config.uri,
          connectionInitOptions: { wait: false, timeout: 30000 },
        }),
      ],
      providers: [MessageQueueService],
      exports: [MessageQueueService],
    };
  }
}
