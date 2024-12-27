import { PartialType } from '@nestjs/mapped-types';
import { DepartmentEntity } from './department.schema';

export class UpdateDepartmentRequest extends PartialType(DepartmentEntity) {}
