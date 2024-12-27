import { PartialType } from '@nestjs/mapped-types';
import { CompanyEntity } from './company.schema';

export class UpdateCompanyRequest extends PartialType(CompanyEntity) {}
