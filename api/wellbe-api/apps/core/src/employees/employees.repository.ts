import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, PipelineStage, Types } from 'mongoose';
import { BaseRepository, FindModelOptions } from '@x/common';
import { EmployeeEntity, Employee } from './employee.schema';

@Injectable()
export class EmployeesRepository extends BaseRepository<Employee> {
  constructor(@InjectModel(EmployeeEntity.name) model: Model<Employee>) {
    super(model);
  }

  async findById(id: string): Promise<Employee> {
    const aggregate = [
      { $match: { _id: new Types.ObjectId(id) } },
      ...this.getAggregateQuery(),
    ];
    const result = (await this.model.aggregate(aggregate)) as Employee[];
    return result?.[0] ?? null;
  }

  async findOne(filter?: FilterQuery<Employee>): Promise<Employee> {
    const aggregate = [...this.getAggregateQuery(), { $match: filter }];
    const result = (await this.model.aggregate(aggregate)) as Employee[];
    return result?.[0] ?? null;
  }

  async find(
    filter?: FilterQuery<Employee>,
    options?: FindModelOptions<Employee>
  ): Promise<Employee[]> {
    const cond = filter ?? {};
    const aggregate = [
      ...this.getAggregateQuery(),
      { $match: cond },
      ...(options?.sort ? [{ $sort: { ...options?.sort, _id: -1 } }] : []),
      ...(options?.skip ? [{ $skip: options?.skip }] : []),
      ...(options?.limit ? [{ $limit: options?.limit }] : []),
    ] as PipelineStage[];
    const result = (await this.model
      .aggregate(aggregate)
      .collation({ locale: 'en_US', strength: 1 })) as Employee[];
    return result ?? [];
  }

  async count(filter?: FilterQuery<Employee>): Promise<number> {
    const cond = filter ?? {};
    const aggregate = [
      ...this.getAggregateQuery(),
      { $match: cond },
    ] as PipelineStage[];
    const result = (await this.model.aggregate(aggregate)) as Employee[];
    return result?.length ?? 0;
  }

  private getAggregateQuery() {
    return [
      {
        $addFields: {
          id: {
            $toString: '$_id',
          },
        },
      },
      {
        $lookup: {
          from: 'Departments',
          let: {
            departmentId: {
              $toObjectId: '$department',
            },
          },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ['$_id', '$$departmentId'],
                },
              },
            },
            {
              $project: {
                _id: 0,
                id: { $toString: '$_id' },
                name: 1,
              },
            },
          ],
          as: 'department',
        },
      },
      {
        $unwind: {
          path: '$department',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: 'Companies',
          let: {
            companyId: {
              $toObjectId: '$company',
            },
          },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ['$_id', '$$companyId'],
                },
              },
            },
            {
              $project: {
                _id: 0,
                id: { $toString: '$_id' },
                name: 1,
                uniqueName: 1,
                logoUrl: 1,
                about: 1,
              },
            },
          ],
          as: 'company',
        },
      },
      {
        $unwind: {
          path: '$company',
          preserveNullAndEmptyArrays: true,
        },
      },
    ];
  }
}
