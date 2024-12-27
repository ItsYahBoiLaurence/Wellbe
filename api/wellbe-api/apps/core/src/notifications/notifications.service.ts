import { Injectable } from '@nestjs/common';
import { BaseService } from '@x/common';
import { LoggerService } from '@x/logging';
import { NotificationsRepository } from './notifications.repository';
import { Notification } from './notification.schema';

@Injectable()
export class NotificationsService extends BaseService<
  Notification,
  NotificationsRepository
> {
  constructor(
    repository: NotificationsRepository,
    loggerService: LoggerService
  ) {
    super(repository, loggerService);
  }
}
