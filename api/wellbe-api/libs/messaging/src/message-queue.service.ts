import { Injectable } from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Options, ConsumeMessage } from 'amqplib';
import { LoggerService } from '@x/logging';
import { Message } from './message.entity';

@Injectable()
export class MessageQueueService {
  constructor(
    private readonly amqpConnection: AmqpConnection,
    private logger: LoggerService
  ) {}

  publish<T>(
    exchange: string,
    routingKey: string,
    message: Message<T>,
    options?: Options.Publish
  ): void {
    try {
      this.amqpConnection.publish(exchange, routingKey, message, options);
    } catch (err) {
      this.logger.error(`MessageQueueService.publish ${err?.message}`, err);
    }
  }

  handleMessage<T>(
    message: Message<T>,
    amqpMsg: ConsumeMessage,
    callback: () => void
  ): void {
    try {
      callback();
    } catch (err) {
      this.logger.error(`MessageQueueService.publish ${err?.message}`, err);
      if (!message?.retry) {
        return;
      }
      this.publish(amqpMsg.fields.exchange, amqpMsg.fields.routingKey, {
        ...message,
        retry: message.retry - 1,
      });
      this.logger.info(
        `MessageQueueService.handleMessage retyring ${amqpMsg.fields.exchange}::${amqpMsg.fields.routingKey}`
      );
    }
  }
}
