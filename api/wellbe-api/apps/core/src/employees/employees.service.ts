import { Injectable } from '@nestjs/common';
import { BaseService } from '@x/common';
import { LoggerService } from '@x/logging';
import { EmployeesRepository } from './employees.repository';
import { Employee } from './employee.schema';

@Injectable()
export class EmployeesService extends BaseService<
  Employee,
  EmployeesRepository
> {
  constructor(repository: EmployeesRepository, loggerService: LoggerService) {
    super(repository, loggerService);
  }
}
