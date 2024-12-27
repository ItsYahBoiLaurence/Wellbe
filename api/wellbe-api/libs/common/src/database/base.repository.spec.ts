import { Test, TestingModule } from '@nestjs/testing';
import { Injectable } from '@nestjs/common';
import { BaseEntity } from '../models';
import { BaseRepository } from './base.repository';
import { getModelToken, InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

type TestClass = TestClassEntity & BaseEntity;

class TestClassEntity {
  name: String;
}

@Injectable()
class TestRepository extends BaseRepository<TestClass> {
  constructor(@InjectModel(TestClassEntity.name) model: Model<TestClass>) {
    super(model);
  }
}

describe('BaseRepository', () => {
  let repositoryModel;
  const data1 = { name: 'foobar' };
  const data2 = { name: 'barbaz' };
  const modelData1 = { toJSON: () => data1 };
  const mockLean = jest.fn().mockResolvedValue([data1, data2]);
  const findResult = { lean: mockLean };
  let repository: TestRepository;

  beforeEach(async () => {
    repositoryModel = {
      create: jest.fn().mockResolvedValue(modelData1),
      find: jest.fn().mockReturnValue(findResult),
      findByIdAndUpdate: jest.fn().mockResolvedValue(modelData1),
      remove: jest
        .fn()
        .mockResolvedValue({ deletedCount: 1, acknowledged: true }),
      findById: jest.fn().mockResolvedValue(modelData1),
      findOne: jest.fn().mockResolvedValue(modelData1),
      countDocuments: jest.fn().mockResolvedValue(1),
      insertMany: jest.fn().mockResolvedValue({ insertedCount: 5 }),
      updateMany: jest
        .fn()
        .mockResolvedValue({ modifiedCount: 5, matchedCount: 5 }),
      updateOne: jest
        .fn()
        .mockResolvedValue({ modifiedCount: 1, matchedCount: 1 }),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TestRepository,
        {
          provide: getModelToken(TestClassEntity.name),
          useValue: repositoryModel,
        },
      ],
    }).compile();

    repository = module.get<TestRepository>(TestRepository);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('constructor', () => {
    it('should be defined', () => {
      expect(repository).toBeDefined();
    });
  });

  describe('create', () => {
    it('should call model.create and return result successfully', async () => {
      const param: TestClassEntity = { name: 'foobar' };
      const result = await repository.create(param as TestClass);
      expect(repositoryModel.create).toBeCalledWith(param);
      expect(result).toMatchObject(data1);
    });
  });

  describe('insertMany', () => {
    it('should call model.insertMany and return result successfully', async () => {
      const param: TestClassEntity = { name: 'foobar' };
      const items = [param as TestClass, param as TestClass];
      const result = await repository.insertMany(items);
      expect(repositoryModel.insertMany).toBeCalledWith(items, {
        ordered: false,
        rawResult: true,
      });
      expect(result).toMatchObject({ insertedCount: 5 });
    });
  });

  describe('getAll', () => {
    it('should call model.getAll and return result successfully', async () => {
      const result = await repository.getAll();
      expect(repositoryModel.find).toBeCalledWith({}, null);
      expect(result).toMatchObject([data1, data2]);
    });
  });

  describe('update', () => {
    it('should call model.findByIdAndUpdate and return result successfully', async () => {
      const param: TestClassEntity = { name: 'foobar' };
      const result = await repository.update('id', param as TestClass);
      expect(repositoryModel.findByIdAndUpdate).toBeCalledWith('id', param, {
        new: true,
      });
      expect(result).toMatchObject(data1);
    });
    it('should throw error if findByIdAndUpdate returns empty result', async () => {
      repositoryModel.findByIdAndUpdate.mockResolvedValue(null);
      const param: TestClassEntity = { name: 'foobar' };
      const expectedError = new Error('Failed to update entity id');
      await expect(
        repository.update('id', param as TestClass)
      ).rejects.toThrowError(expectedError);
    });
  });

  describe('updateOne', () => {
    it('should call model.updateOne and return result successfully', async () => {
      const param: TestClassEntity = { name: 'foobar' };
      const result = await repository.updateOne(
        { name: 'foobar' },
        param as TestClass
      );
      expect(repositoryModel.updateOne).toBeCalledWith(
        { name: 'foobar' },
        param,
        {
          new: true,
        }
      );
      expect(result).toMatchObject({ found: 1, modified: 1 });
    });
    it('should throw error if updateOne returns empty result', async () => {
      repositoryModel.updateOne.mockResolvedValue(null);
      const param: TestClassEntity = { name: 'foobar' };
      const expectedError = new Error('Failed to update entity by filter');
      await expect(
        repository.updateOne({ name: 'foobar' }, param as TestClass)
      ).rejects.toThrowError(expectedError);
    });
  });

  describe('updateMany', () => {
    it('should call model.updateMany and return result successfully', async () => {
      const result = await repository.updateMany({}, {});
      expect(repositoryModel.updateMany).toBeCalledWith(
        {},
        {},
        {
          new: true,
        }
      );
      expect(result).toMatchObject({ found: 5, modified: 5 });
    });
  });

  describe('delete', () => {
    it('should call model.remove and return result successfully', async () => {
      const expectedParam = {
        _id: BaseRepository.toObjectId('5fe9b14943c3fd78018530ac'),
      };
      const result = await repository.delete('5fe9b14943c3fd78018530ac');
      expect(repositoryModel.remove).toBeCalledWith(expectedParam);
      expect(result).toMatchObject({ deletedCount: 1, acknowledged: true });
    });
  });

  describe('findById', () => {
    it('should call model.findById and return result successfully', async () => {
      const result = await repository.findById('id');
      expect(repositoryModel.findById).toBeCalledWith('id', null);
      expect(result).toMatchObject(data1);
    });
  });

  describe('findOne', () => {
    it('should call model.findOne and return result successfully', async () => {
      const result = await repository.findOne({ name: 'foobar' });
      expect(repositoryModel.findOne).toBeCalledWith({ name: 'foobar' }, null);
      expect(result).toMatchObject(data1);
    });
  });

  describe('find', () => {
    it('should call lean on find query', async () => {
      await repository.find();
      expect(mockLean).toBeCalledWith({ virtuals: true });
    });
    it('should call model.find with defaults if options not defined and return result successfully', async () => {
      const result = await repository.find({}, null);
      expect(repositoryModel.find).toBeCalledWith({}, null, {
        limit: 15,
        skip: 0,
        sort: undefined,
      });
      expect(result).toMatchObject([data1, data2]);
    });
    it('should call model.find with defaults and return result successfully', async () => {
      const result = await repository.find({}, { limit: 100, skip: 20 });
      expect(repositoryModel.find).toBeCalledWith({}, null, {
        limit: 100,
        skip: 20,
        sort: undefined,
      });
      expect(result).toMatchObject([data1, data2]);
    });
  });

  describe('toObjectId', () => {
    it('should return correct structure of entity metadata', () => {
      const result = BaseRepository.toObjectId('5fe9b14943c3fd78018530ac');
      expect(result).toBeDefined();
    });
  });

  describe('count', () => {
    it('should call model.count and return result successfully', async () => {
      const result = await repository.count({ name: 'foobar' });
      expect(repositoryModel.countDocuments).toBeCalledWith({ name: 'foobar' });
      expect(result).toBe(1);
    });
  });
});
