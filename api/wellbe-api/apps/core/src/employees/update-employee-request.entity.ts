import { PartialType } from '@nestjs/mapped-types';
import { EmployeeEntity } from './employee.schema';

export class UpdateEmployeeRequest extends PartialType(EmployeeEntity) {}
