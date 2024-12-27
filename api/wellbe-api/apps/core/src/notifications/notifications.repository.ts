import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from '@x/common';
import { NotificationEntity, Notification } from './notification.schema';

@Injectable()
export class NotificationsRepository extends BaseRepository<Notification> {
  constructor(
    @InjectModel(NotificationEntity.name) model: Model<Notification>
  ) {
    super(model);
  }
}
