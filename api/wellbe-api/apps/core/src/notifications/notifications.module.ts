import { DynamicModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NotificationsController } from './notifications.controller';
import { NotificationsRepository } from './notifications.repository';
import { NotificationsService } from './notifications.service';
import { NotificationSchema, NotificationEntity } from './notification.schema';

@Module({})
export class NotificationsModule {
  static register(): DynamicModule {
    return {
      module: NotificationsModule,
      imports: [
        MongooseModule.forFeature([
          { name: NotificationEntity.name, schema: NotificationSchema },
        ]),
      ],
      controllers: [NotificationsController],
      providers: [NotificationsService, NotificationsRepository],
      exports: [NotificationsService, NotificationsRepository],
    };
  }
}
