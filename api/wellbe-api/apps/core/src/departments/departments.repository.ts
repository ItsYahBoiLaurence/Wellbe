import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from '@x/common';
import { DepartmentEntity, Department } from './department.schema';

@Injectable()
export class DepartmentsRepository extends BaseRepository<Department> {
  constructor(@InjectModel(DepartmentEntity.name) model: Model<Department>) {
    super(model);
  }
}
