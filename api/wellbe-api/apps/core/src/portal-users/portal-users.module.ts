import { DynamicModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PortalUsersController } from './portal-users.controller';
import { PortalUsersRepository } from './portal-users.repository';
import { PortalUsersService } from './portal-users.service';
import { PortalUserSchema, PortalUserEntity } from './portal-user.schema';

@Module({})
export class PortalUsersModule {
  static register(): DynamicModule {
    return {
      module: PortalUsersModule,
      imports: [
        MongooseModule.forFeature([
          { name: PortalUserEntity.name, schema: PortalUserSchema },
        ]),
      ],
      controllers: [PortalUsersController],
      providers: [PortalUsersService, PortalUsersRepository],
      exports: [PortalUsersService],
    };
  }
}
