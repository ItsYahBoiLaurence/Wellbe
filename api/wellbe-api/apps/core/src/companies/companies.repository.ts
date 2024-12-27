import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from '@x/common';
import { CompanyEntity, Company } from './company.schema';

@Injectable()
export class CompaniesRepository extends BaseRepository<Company> {
  constructor(@InjectModel(CompanyEntity.name) model: Model<Company>) {
    super(model);
  }
}
