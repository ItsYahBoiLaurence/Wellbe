import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from '@x/common';
import { AdminUserEntity, AdminUser } from './admin-user.schema';

@Injectable()
export class AdminUsersRepository extends BaseRepository<AdminUser> {
  constructor(@InjectModel(AdminUserEntity.name) model: Model<AdminUser>) {
    super(model);
  }
}
