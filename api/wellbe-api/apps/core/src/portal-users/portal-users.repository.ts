import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from '@x/common';
import { PortalUserEntity, PortalUser } from './portal-user.schema';

@Injectable()
export class PortalUsersRepository extends BaseRepository<PortalUser> {
  constructor(@InjectModel(PortalUserEntity.name) model: Model<PortalUser>) {
    super(model);
  }
}
