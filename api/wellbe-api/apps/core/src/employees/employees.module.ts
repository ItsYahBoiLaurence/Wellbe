import { DynamicModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EmployeesController } from './employees.controller';
import { EmployeesRepository } from './employees.repository';
import { EmployeesService } from './employees.service';
import { EmployeeEntity, EmployeeSchema } from './employee.schema';

@Module({})
export class EmployeesModule {
  static register(): DynamicModule {
    return {
      module: EmployeesModule,
      imports: [
        MongooseModule.forFeature([
          { name: EmployeeEntity.name, schema: EmployeeSchema },
        ]),
      ],
      controllers: [EmployeesController],
      providers: [EmployeesService, EmployeesRepository],
      exports: [EmployeesService, EmployeesRepository],
    };
  }
}
