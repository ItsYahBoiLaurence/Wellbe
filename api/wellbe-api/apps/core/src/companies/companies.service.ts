import { Injectable } from '@nestjs/common';
import {
  BaseService,
  EntityMetadata,
  FailedToCreateResourceError,
} from '@x/common';
import { LoggerService } from '@x/logging';
import { CompaniesRepository } from './companies.repository';
import { Company } from './company.schema';

@Injectable()
export class CompaniesService extends BaseService<
  Company,
  CompaniesRepository
> {
  constructor(repository: CompaniesRepository, loggerService: LoggerService) {
    super(repository, loggerService);
  }

  async create(item: Company): Promise<EntityMetadata<Company>> {
    try {
      const uniqueName = await this.generateUniqueName();
      item.uniqueName = uniqueName;
      const result = await this.repository.create(item);
      if (!result) return new FailedToCreateResourceError();
      return this.getSuccessEntityMetadata(result);
    } catch (error) {
      this.loggerService.error(
        'CompaniesService.create | unhandled error',
        error
      );
      return new FailedToCreateResourceError();
    }
  }

  private async generateUniqueName(retryCount: number = 0): Promise<string> {
    if (retryCount === 5) throw new Error('Failed to generate unique name');
    const uniqueName = (Math.random() + 1).toString(36).substring(7);
    const company = await this.repository.findOne({ uniqueName });
    if (company) return this.generateUniqueName(retryCount + 1);
    return uniqueName;
  }
}
