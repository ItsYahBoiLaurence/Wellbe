import { DynamicModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CompaniesController } from './companies.controller';
import { CompaniesRepository } from './companies.repository';
import { CompaniesService } from './companies.service';
import { CompanySchema, CompanyEntity } from './company.schema';

@Module({})
export class CompaniesModule {
  static register(): DynamicModule {
    return {
      module: CompaniesModule,
      imports: [
        MongooseModule.forFeature([
          { name: CompanyEntity.name, schema: CompanySchema },
        ]),
      ],
      controllers: [CompaniesController],
      providers: [CompaniesService, CompaniesRepository],
      exports: [CompaniesService, CompaniesRepository],
    };
  }
}
