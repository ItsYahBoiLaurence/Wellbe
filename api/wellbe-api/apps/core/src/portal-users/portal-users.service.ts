import { Injectable } from '@nestjs/common';
import { BaseService } from '@x/common';
import { LoggerService } from '@x/logging';
import { PortalUsersRepository } from './portal-users.repository';
import { PortalUser } from './portal-user.schema';

@Injectable()
export class PortalUsersService extends BaseService<
  PortalUser,
  PortalUsersRepository
> {
  constructor(repository: PortalUsersRepository, loggerService: LoggerService) {
    super(repository, loggerService);
  }
}
