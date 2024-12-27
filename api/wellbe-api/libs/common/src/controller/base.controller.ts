import { BaseRepository, FindModelOptions } from '../database/base.repository';
import {
  AppException,
  BaseEntity,
  EmptyResponseError,
  EntityMetadata,
  FilterQueryOptions,
  InvalidArgumentsError,
} from '../models';
import { BaseService } from '../services/base.service';
export class BaseController<
  T extends BaseEntity,
  TR extends BaseRepository<T>,
  TS extends BaseService<T, TR>,
> {
  protected service: TS;

  constructor(service: TS) {
    this.service = service;
  }

  protected async find(
    query?: FilterQueryOptions<T>
  ): Promise<EntityMetadata<T[]>> {
    if (!query) return this.service.find();
    const queryOptions = BaseController.getFindModelOptions(query);
    const res = await this.service.find(query.filter, queryOptions);
    return BaseController.handleResponse(res);
  }

  protected async findById(id: string): Promise<EntityMetadata<T>> {
    const res = await this.service.findById(id);
    return BaseController.handleResponse(res);
  }

  protected async findOne(
    query: FilterQueryOptions<T>
  ): Promise<EntityMetadata<T>> {
    if (!query) throw new InvalidArgumentsError().exception;
    const res = await this.service.findOne(query.filter);
    return BaseController.handleResponse(res);
  }

  protected async create(model: T): Promise<EntityMetadata<T>> {
    if (!model) throw new InvalidArgumentsError().exception;
    const res = await this.service.create(model);
    return BaseController.handleResponse(res);
  }

  protected async update(id: string, model: T): Promise<EntityMetadata<T>> {
    const res = await this.service.update(id, model);
    return BaseController.handleResponse(res);
  }

  protected async delete(id: string): Promise<EntityMetadata<boolean>> {
    const res = await this.service.delete(id);
    return BaseController.handleResponse(res);
  }

  static handleResponse<TResult>(
    results: EntityMetadata<TResult>
  ): EntityMetadata<TResult> {
    if (!results) throw new EmptyResponseError().exception;
    if (results.error) throw new AppException(results.error);
    return results;
  }

  static getSearchQuery(query) {
    if (!query) return null;
    return query.q;
  }

  static getFindModelOptions<T>(
    query: FilterQueryOptions<T>
  ): FindModelOptions<T> {
    if (!query) return null;
    const { limit, skip, sort } = query;
    return {
      limit: !limit ? 15 : +limit,
      skip: !skip ? 0 : +skip,
      sort:
        sort &&
        Object.keys(sort).reduce(
          (acc, curr) => ({ ...acc, [curr]: +sort[curr] }),
          {}
        ),
    };
  }
}
