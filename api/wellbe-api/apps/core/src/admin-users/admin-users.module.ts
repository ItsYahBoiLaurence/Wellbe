import { DynamicModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminUsersController } from './admin-users.controller';
import { AdminUsersRepository } from './admin-users.repository';
import { AdminUsersService } from './admin-users.service';
import { AdminUserSchema, AdminUserEntity } from './admin-user.schema';

@Module({})
export class AdminUsersModule {
  static register(): DynamicModule {
    return {
      module: AdminUsersModule,
      imports: [
        MongooseModule.forFeature([
          { name: AdminUserEntity.name, schema: AdminUserSchema },
        ]),
      ],
      controllers: [AdminUsersController],
      providers: [AdminUsersService, AdminUsersRepository],
      exports: [AdminUsersService],
    };
  }
}
