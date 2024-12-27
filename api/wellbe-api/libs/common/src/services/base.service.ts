import { LoggerService } from '@x/logging';
import * as _ from 'lodash';
import { FilterQuery, UpdateQuery } from 'mongoose';
import {
  BaseRepository,
  DeletedResponse,
  FindModelOptions,
} from '../database/base.repository';
import {
  BaseEntity,
  EmptyResponseError,
  EntityMetadata,
  FailedToCreateResourceError,
  FailedToDeleteResourceError,
  FailedToUpdateResourceError,
  NotFoundError,
  PagedList,
  UnhandledError,
} from '../models';

export class BaseService<T extends BaseEntity, TS extends BaseRepository<T>> {
  protected repository: TS;
  protected loggerService: LoggerService;

  constructor(repository: TS, loggerService: LoggerService) {
    this.repository = repository;
    this.loggerService = loggerService;
  }

  public async create(item: T): Promise<EntityMetadata<T>> {
    try {
      const result = await this.repository.create(item);
      if (!result) return new FailedToCreateResourceError();
      return this.getSuccessEntityMetadata(result);
    } catch (error) {
      this.loggerService.error('BaseService.create | unhandled error', error);
      return new FailedToCreateResourceError();
    }
  }

  public async update(
    id: string,
    item: Partial<T>
  ): Promise<EntityMetadata<T>> {
    try {
      const existing = await this.repository.findById(id);
      if (!existing) {
        return new NotFoundError();
      }
      const result = await this.repository.update(
        id,
        item as unknown as UpdateQuery<T>
      );
      if (!result) return new FailedToUpdateResourceError();
      return this.getSuccessEntityMetadata(result);
    } catch (error) {
      this.loggerService.error('BaseService.update | unhandled error', error);
      return new FailedToUpdateResourceError();
    }
  }

  public async updateOne(
    filter: FilterQuery<T>,
    item: Partial<T>
  ): Promise<EntityMetadata<T>> {
    try {
      const result = await this.repository.updateOne(
        filter,
        item as unknown as UpdateQuery<T>
      );
      if (!result || result?.modified === 0)
        return new FailedToUpdateResourceError();
      const updated = await this.repository.findOne(filter);
      return this.getSuccessEntityMetadata(updated);
    } catch (error) {
      this.loggerService.error(
        'BaseService.updateOne | unhandled error',
        error
      );
      return new FailedToUpdateResourceError();
    }
  }

  public async updateMany(
    filter: FilterQuery<T>,
    item: Partial<T>
  ): Promise<EntityMetadata<{ modified: number; found: number }>> {
    try {
      const result = await this.repository.updateMany(
        filter,
        item as unknown as UpdateQuery<T>
      );
      if (!result || result?.modified === 0)
        return new FailedToUpdateResourceError();
      return this.getSuccessEntityMetadata(result);
    } catch (error) {
      this.loggerService.error(
        'BaseService.updateMany | unhandled error',
        error
      );
      return new FailedToUpdateResourceError();
    }
  }

  public async delete(id: string): Promise<EntityMetadata<boolean>> {
    try {
      const existing = await this.repository.findById(id);
      if (!existing) {
        return new NotFoundError();
      }
      const result = (await this.repository.delete(id)) as DeletedResponse;
      if (!result) {
        return new FailedToDeleteResourceError();
      }

      if (result.acknowledged && result.deletedCount) {
        return this.getSuccessEntityMetadata(true);
      }
      return new FailedToDeleteResourceError();
    } catch (error) {
      this.loggerService.error('BaseService.delete | unhandled error', error);
      return new FailedToDeleteResourceError();
    }
  }

  public async getAll(): Promise<EntityMetadata<T[]>> {
    try {
      const result = await this.repository.getAll();
      if (!result) {
        return new EmptyResponseError();
      }
      return this.getSuccessEntityMetadata(result);
    } catch (error) {
      this.loggerService.error('this.getAll | unhandled error', error);
      return new UnhandledError();
    }
  }

  public async findById(id: string): Promise<EntityMetadata<T>> {
    try {
      const result = await this.repository.findById(id);
      if (!result) {
        return new NotFoundError();
      }
      return this.getSuccessEntityMetadata(result);
    } catch (error) {
      this.loggerService.error('BaseService.findById | unhandled error', error);
      return new UnhandledError();
    }
  }

  public async findOne(filter?: FilterQuery<T>): Promise<EntityMetadata<T>> {
    try {
      const result = await this.repository.findOne(filter);
      if (!result) {
        return new NotFoundError();
      }
      return this.getSuccessEntityMetadata(result);
    } catch (error) {
      this.loggerService.error('BaseService.findOne | unhandled error', error);
      return new UnhandledError();
    }
  }

  public async find(
    filter?: FilterQuery<T>,
    options?: FindModelOptions<T>
  ): Promise<EntityMetadata<T[]>> {
    try {
      const result = await this.repository.find(filter, options);
      if (!result) return new EmptyResponseError();
      return this.getSuccessEntityMetadata(result);
    } catch (error) {
      this.loggerService.error('BaseService.find | unhandled error', error);
      return new UnhandledError();
    }
  }

  public async findPagedList(
    filter?: FilterQuery<T>,
    options?: FindModelOptions<T>
  ): Promise<EntityMetadata<PagedList<T>>> {
    try {
      const items = (await this.repository.find(filter, options)) ?? [];
      const total = await this.repository.count(filter);
      return this.getSuccessEntityMetadata({ items, total });
    } catch (error) {
      this.loggerService.error(
        'BaseService.findPagedList | unhandled error',
        error
      );
      return new UnhandledError();
    }
  }

  /**
   * @param savedList Persisted list field to update
   * @param currList Items to be updated (added or removed)
   * @param field Field of T
   * @param propName Property name within the field (ex: field: { propName: 'value' })
   * @returns UpdateQuery options
   */
  protected getFieldUpdateOptions<TS>(
    savedList: TS[],
    currList: TS[],
    field: string,
    propName?: string
  ) {
    const itemsToAdd: TS[] = [];
    const itemsToRemove: TS[] = [];

    currList.forEach((item) => {
      const names = savedList?.map((item) =>
        propName ? item[propName] : item
      );
      if (names?.includes(propName ? item[propName] : item)) {
        itemsToRemove.push(item);
      } else {
        itemsToAdd.push(item);
      }
    });

    const opts = {} as any;
    if (itemsToAdd.length) {
      opts.$push = {
        [field]: { $each: itemsToAdd },
      };
    }
    if (itemsToRemove.length) {
      const removeOpts = {
        $in: itemsToRemove.map((item) => (propName ? item[propName] : item)),
      };
      const fieldOpts = propName ? { [propName]: removeOpts } : removeOpts;

      opts.$pull = { [field]: fieldOpts };
    }

    return opts;
  }

  getSuccessEntityMetadata<TResult>(data: TResult): EntityMetadata<TResult> {
    return new EntityMetadata<TResult>(data);
  }
}
