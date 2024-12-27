import { Injectable } from '@nestjs/common';
import { BaseService } from '@x/common';
import { LoggerService } from '@x/logging';
import { AdminUsersRepository } from './admin-users.repository';
import { AdminUser } from './admin-user.schema';

@Injectable()
export class AdminUsersService extends BaseService<
  AdminUser,
  AdminUsersRepository
> {
  constructor(repository: AdminUsersRepository, loggerService: LoggerService) {
    super(repository, loggerService);
  }
}
