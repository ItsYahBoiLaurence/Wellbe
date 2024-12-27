import { ApiProperty } from '@nestjs/swagger';
import { PagedList } from '@x/common';
import { Type } from 'class-transformer';
import { Department, DepartmentEntity } from './department.schema';

export class DepartmentsList implements PagedList<Department> {
  @ApiProperty({ type: DepartmentEntity, isArray: true })
  @Type(() => DepartmentEntity)
  items: Department[];

  @ApiProperty()
  total: number;
}
