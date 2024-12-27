import { ApiProperty } from '@nestjs/swagger';
import { PagedList } from '@x/common';
import { Type } from 'class-transformer';
import { Employee, EmployeeEntity } from './employee.schema';

export class EmployeesList implements PagedList<Employee> {
  @ApiProperty({ type: EmployeeEntity, isArray: true })
  @Type(() => EmployeeEntity)
  items: Employee[];

  @ApiProperty()
  total: number;
}
