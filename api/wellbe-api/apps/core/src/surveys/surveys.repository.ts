import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, PipelineStage, Types } from 'mongoose';
import { BaseRepository, FindModelOptions } from '@x/common';
import { SurveyEntity, Survey } from './survey.schema';

@Injectable()
export class SurveysRepository extends BaseRepository<Survey> {
  constructor(@InjectModel(SurveyEntity.name) model: Model<Survey>) {
    super(model);
  }

  async findById(id: string): Promise<Survey> {
    const aggregate = [
      { $match: { _id: new Types.ObjectId(id) } },
      ...this.getAggregateQuery(),
    ];
    const result = (await this.model.aggregate(aggregate)) as Survey[];
    return result?.[0] ?? null;
  }

  async findOne(filter?: FilterQuery<Survey>): Promise<Survey> {
    const aggregate = [...this.getAggregateQuery(), { $match: filter }];
    const result = (await this.model.aggregate(aggregate)) as Survey[];
    return result?.[0] ?? null;
  }

  async find(
    filter?: FilterQuery<Survey>,
    options?: FindModelOptions<Survey>
  ): Promise<Survey[]> {
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
      .collation({ locale: 'en_US', strength: 1 })) as Survey[];
    return result ?? [];
  }

  async count(filter?: FilterQuery<Survey>): Promise<number> {
    const cond = filter ?? {};
    const aggregate = [
      ...this.getAggregateQuery(),
      { $match: cond },
    ] as PipelineStage[];
    const result = (await this.model.aggregate(aggregate)) as Survey[];
    return result?.length ?? 0;
  }

  private getAggregateQuery() {
    return [
      { $unwind: '$questions' },
      { $unwind: '$questions.question' },
      {
        $lookup: {
          from: 'Questions',
          let: {
            questionId: {
              $toObjectId: '$questions.question',
            },
          },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ['$_id', '$$questionId'],
                },
              },
            },
            {
              $project: {
                _id: 0,
                id: { $toString: '$_id' },
                question: 1,
                domain: 1,
                subdomain: 1,
                label: 1,
                options: 1,
              },
            },
          ],
          as: 'questions.question',
        },
      },
      { $unwind: '$questions.question' },
      {
        $group: {
          _id: '$_id',
          remarks: { $last: '$remarks' },
          status: { $last: '$status' },
          employee: { $last: '$employee' },
          questions: { $push: '$questions' },
          createdDate: { $last: '$createdDate' },
          modifiedDate: { $last: '$modifiedDate' },
        },
      },
      {
        $lookup: {
          from: 'Employees',
          let: {
            employeeId: {
              $toObjectId: '$employee',
            },
          },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ['$_id', '$$employeeId'],
                },
              },
            },
            {
              $project: {
                _id: 0,
                id: { $toString: '$_id' },
                firstName: 1,
                lastName: 1,
                employeeId: 1,
              },
            },
          ],
          as: 'employee',
        },
      },
      {
        $unwind: {
          path: '$employee',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          _id: 0,
          id: { $toString: '$_id' },
          questions: 1,
          employee: 1,
          status: 1,
          remarks: 1,
          createdDate: 1,
          modifiedDate: 1,
        },
      },
    ];
  }
}
