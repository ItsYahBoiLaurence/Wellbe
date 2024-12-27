import { ApiProperty } from '@nestjs/swagger';
import { PagedList } from '@x/common';
import { Type } from 'class-transformer';
import { Company, CompanyEntity } from './company.schema';

export class CompaniesList implements PagedList<Company> {
  @ApiProperty({ type: CompanyEntity, isArray: true })
  @Type(() => CompanyEntity)
  items: Company[];

  @ApiProperty()
  total: number;
}
