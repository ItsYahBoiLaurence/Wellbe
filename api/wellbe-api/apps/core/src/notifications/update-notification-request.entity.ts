import { PartialType } from '@nestjs/mapped-types';
import { NotificationEntity } from './notification.schema';

export class UpdateNotificationRequest extends PartialType(
  NotificationEntity
) {}
