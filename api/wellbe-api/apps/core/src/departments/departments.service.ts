import { Injectable } from '@nestjs/common';
import { BaseService } from '@x/common';
import { LoggerService } from '@x/logging';
import { DepartmentsRepository } from './departments.repository';
import { Department } from './department.schema';

@Injectable()
export class DepartmentsService extends BaseService<
  Department,
  DepartmentsRepository
> {
  constructor(repository: DepartmentsRepository, loggerService: LoggerService) {
    super(repository, loggerService);
  }
}
