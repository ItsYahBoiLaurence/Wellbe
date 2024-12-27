import { ApiProperty } from '@nestjs/swagger';
import { PagedList } from '@x/common';
import { Type } from 'class-transformer';
import { Notification, NotificationEntity } from './notification.schema';

export class NotificationsList implements PagedList<Notification> {
  @ApiProperty({ type: NotificationEntity, isArray: true })
  @Type(() => NotificationEntity)
  items: Notification[];

  @ApiProperty()
  total: number;
}
