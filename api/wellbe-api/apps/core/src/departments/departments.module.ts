import { DynamicModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DepartmentsController } from './departments.controller';
import { DepartmentsRepository } from './departments.repository';
import { DepartmentsService } from './departments.service';
import { DepartmentSchema, DepartmentEntity } from './department.schema';

@Module({})
export class DepartmentsModule {
  static register(): DynamicModule {
    return {
      module: DepartmentsModule,
      imports: [
        MongooseModule.forFeature([
          { name: DepartmentEntity.name, schema: DepartmentSchema },
        ]),
      ],
      controllers: [DepartmentsController],
      providers: [DepartmentsService, DepartmentsRepository],
      exports: [DepartmentsService],
    };
  }
}
