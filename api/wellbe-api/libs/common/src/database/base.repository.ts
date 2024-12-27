import {
  Model,
  Types,
  FilterQuery,
  QueryOptions,
  UpdateQuery,
  InsertManyResult,
  PipelineStage,
  Expression,
} from 'mongoose';
import { BaseEntity } from '../models';

const DEFAULT_LIMIT = 15;
const DEFAULT_SKIP = 0;

export class BaseRepository<T extends BaseEntity> {
  protected model: Model<T>;

  constructor(schemaModel: Model<T>) {
    this.model = schemaModel;
  }

  public async create(item: T): Promise<T> {
    return (await this.model.create(item))?.toJSON() as unknown as T;
  }

  public async insertMany(items: T[]): Promise<InsertManyResult<T>> {
    const result = await this.model.insertMany(items, {
      ordered: false,
      rawResult: true,
    });

    return result as unknown as InsertManyResult<T>;
  }

  public async getAll(): Promise<T[]> {
    return await this.model.find({}, null).lean({ virtuals: true });
  }

  public async update(id: string, item: UpdateQuery<T>): Promise<T> {
    const result = await this.model.findByIdAndUpdate(id, item, {
      new: true,
    });
    if (!result) throw new Error(`Failed to update entity ${id}`);
    return result?.toJSON() as unknown as T;
  }

  public async updateOne(
    filter: FilterQuery<T>,
    item: UpdateQuery<T>
  ): Promise<{ modified: number; found: number }> {
    const result = await this.model.updateOne(filter, item, {
      new: true,
    });
    if (!result) throw new Error('Failed to update entity by filter');
    return {
      modified: result.modifiedCount ?? 0,
      found: result.matchedCount ?? 0,
    };
  }

  public async updateMany(
    filter: FilterQuery<T>,
    updateQuery: UpdateQuery<T>
  ): Promise<{ modified: number; found: number }> {
    const result = await this.model.updateMany(filter, updateQuery, {
      new: true,
    });
    if (!result) throw new Error('Failed to update entities');
    return { modified: result.modifiedCount, found: result.matchedCount };
  }

  public async delete(id: string): Promise<DeletedResponse> {
    return this.model.deleteOne({ _id: BaseRepository.toObjectId(id) });
  }

  public async findById(id: string): Promise<T> {
    return (await this.model.findById(id, null))?.toJSON() as unknown as T;
  }

  public async findOne(filter?: FilterQuery<T>): Promise<T> {
    return (await this.model.findOne(filter, null))?.toJSON() as unknown as T;
  }

  public async find(
    filter?: FilterQuery<T>,
    options?: FindModelOptions<T>
  ): Promise<T[]> {
    const queryOptions: QueryOptions = BaseRepository.getQueryOptions(options);
    const result = await this.model
      .find(filter, null, queryOptions)
      .lean({ virtuals: true });
    return result as unknown as T[];
  }

  public async count(filter?: FilterQuery<T>): Promise<number> {
    const result = await this.model.countDocuments(filter);
    return result as number;
  }

  public async distinct<TResult>(
    field: string,
    filter?: FilterQuery<T>
  ): Promise<TResult[]> {
    const result = await this.model.distinct(field, filter);
    return result as TResult[];
  }

  static toObjectId(id: string): Types.ObjectId {
    return new Types.ObjectId(id);
  }

  static getQueryOptions<T>(options?: FindModelOptions<T>): QueryOptions {
    const limit = options?.limit ?? DEFAULT_LIMIT;
    const skip = options?.skip ?? DEFAULT_SKIP;
    const sort = options?.sort;
    return { limit, skip, sort };
  }

  static getAggregateFindModelOptionsPipeline<T>(
    options: FindModelOptions<T>
  ): PipelineStage[] {
    return [
      ...(options?.sort ? [{ $sort: options.sort }] : []),
      ...(options?.skip ? [{ $skip: options.skip }] : []),
      ...(options?.limit ? [{ $limit: options.limit }] : []),
    ];
  }
}

export type FindModelOptions<T> = {
  limit?: number;
  skip?: number;
  sort?: {
    [field in Exclude<keyof T, keyof Document>]?: 1 | -1 | Expression.Meta;
  };
  hydrate?: boolean;
};

export type DeletedResponse = {
  acknowledged?: boolean;
  deletedCount?: number;
};
