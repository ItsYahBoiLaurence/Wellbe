import { Injectable } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { LoggerService } from '@x/logging';
import { FilterQuery } from 'mongoose';
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
  UnhandledError,
} from '../models';
import { BaseService } from './base.service';

type TestClass = TestClassEntity & BaseEntity;

class TestClassEntity {
  name: String;
}

@Injectable()
class TestRepository extends BaseRepository<TestClass> {}

@Injectable()
class TestService extends BaseService<TestClass, TestRepository> {
  constructor(repository: TestRepository, logger: LoggerService) {
    super(repository, logger);
  }

  async find(
    cond?: FilterQuery<TestClass>,
    options?: FindModelOptions<TestClass>
  ): Promise<EntityMetadata<TestClass[]>> {
    return super.find(cond, options);
  }

  async findById(id: string): Promise<EntityMetadata<TestClass>> {
    return super.findById(id);
  }

  async findOne(
    cond?: FilterQuery<TestClass>
  ): Promise<EntityMetadata<TestClass>> {
    return super.findOne(cond);
  }

  async create(model: TestClass): Promise<EntityMetadata<TestClass>> {
    return super.create(model);
  }

  async update(
    id: string,
    model: TestClass
  ): Promise<EntityMetadata<TestClass>> {
    return super.update(id, model);
  }

  async delete(id: string): Promise<EntityMetadata<boolean>> {
    return super.delete(id);
  }
}

describe('BaseService', () => {
  interface MockBaseRepository {
    create: jest.Mock<Promise<TestClass>, [TestClass]>;
    update: jest.Mock<Promise<TestClass>, [string, TestClass]>;
    delete: jest.Mock<Promise<DeletedResponse>, [string]>;
    find: jest.Mock<
      Promise<TestClass[]>,
      [FilterQuery<TestClass>, FindModelOptions<TestClass>]
    >;
    getAll: jest.Mock<Promise<TestClass[]>>;
    findById: jest.Mock<Promise<TestClass>, [string]>;
    findOne: jest.Mock<Promise<TestClass>, [object]>;
    count: jest.Mock<Promise<number>>;
    updateOne: jest.Mock<
      Promise<{ found?: number; modified?: number }>,
      [FilterQuery<TestClass>]
    >;
  }

  interface MockLoggerService {
    error: jest.Mock<void>;
  }

  let mockBaseRepository: MockBaseRepository;
  let mockLoggerService: MockLoggerService;
  let service: TestService;

  beforeEach(async () => {
    mockBaseRepository = {
      create: jest.fn().mockResolvedValue({ name: 'foobar' }),
      update: jest.fn().mockResolvedValue({ name: 'foobar' }),
      delete: jest.fn().mockResolvedValue({ deletedCount: 1, acknowledged: 1 }),
      find: jest
        .fn()
        .mockResolvedValue([{ name: 'foobar' }, { name: 'barbaz' }]),
      getAll: jest
        .fn()
        .mockResolvedValue([{ name: 'foobar' }, { name: 'barbaz' }]),
      findById: jest.fn().mockResolvedValue({ name: 'foobar' }),
      findOne: jest.fn().mockResolvedValue({ name: 'foobar' }),
      count: jest.fn().mockResolvedValue(5),
      updateOne: jest.fn().mockResolvedValue({ found: 1, modified: 1 }),
    };

    mockLoggerService = {
      error: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TestService,
        {
          provide: TestRepository,
          useValue: mockBaseRepository,
        },
        {
          provide: LoggerService,
          useValue: mockLoggerService,
        },
      ],
    }).compile();

    service = module.get<TestService>(TestService);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('constructor', () => {
    it('should be defined', () => {
      expect(service).toBeDefined();
    });
  });

  describe('create', () => {
    it('should call repository.create and return result successfully', async () => {
      const param: TestClassEntity = { name: 'foobar' };
      const result = await service.create(param as TestClass);
      expect(mockBaseRepository.create).toBeCalledWith(param);
      expect(result).toMatchObject({ data: { name: 'foobar' } });
    });
    it('should return FailedToCreateResourceError if response is empty from repository', async () => {
      const param: TestClassEntity = { name: 'foobar' };
      mockBaseRepository.create.mockResolvedValue(null);
      const expected = new FailedToCreateResourceError();
      const result = await service.create(param as TestClass);
      expect(result).toMatchObject(expected);
    });
    it('should return FailedToCreateResourceError if unhandled error occurs', async () => {
      const param: TestClassEntity = { name: 'foobar' };
      const expectedError = new Error('error');
      mockBaseRepository.create.mockRejectedValue(expectedError);
      const expected = new FailedToCreateResourceError();
      const result = await service.create(param as TestClass);
      expect(result).toMatchObject(expected);
      expect(mockLoggerService.error).toBeCalled();
    });
  });

  describe('getAll', () => {
    it('should call repository.getAll and return result successfully', async () => {
      const result = await service.getAll();
      expect(mockBaseRepository.getAll).toBeCalled();
      expect(result).toMatchObject({
        data: [{ name: 'foobar' }, { name: 'barbaz' }],
      });
    });
    it('should return EmptyResponseError if response is empty from repository', async () => {
      mockBaseRepository.getAll.mockResolvedValue(null);
      const expected = new EmptyResponseError();
      const result = await service.getAll();
      expect(result).toMatchObject(expected);
    });
    it('should return UnhandledError if unhandled error occurs', async () => {
      const expectedError = new Error('error');
      mockBaseRepository.getAll.mockRejectedValue(expectedError);
      const expected = new UnhandledError();
      const result = await service.getAll();
      expect(result).toMatchObject(expected);
      expect(mockLoggerService.error).toBeCalled();
    });
  });

  describe('update', () => {
    it('should call repository.update and return result successfully', async () => {
      const param: TestClassEntity = { name: 'foobar' };
      const result = await service.update('id', param as TestClass);
      expect(mockBaseRepository.update).toBeCalledWith('id', param);
      expect(result).toMatchObject({ data: { name: 'foobar' } });
    });
    it('should return FailedToUpdateResourceError if response is empty from repository', async () => {
      const param: TestClassEntity = { name: 'foobar' };
      mockBaseRepository.update.mockResolvedValue(null);
      const expected = new FailedToUpdateResourceError();
      const result = await service.update('id', param as TestClass);
      expect(result).toMatchObject(expected);
    });
    it('should return NotFoundError if model to be updated is not found by id', async () => {
      const param: TestClassEntity = { name: 'foobar' };
      mockBaseRepository.findById.mockResolvedValue(null);
      const expected = new NotFoundError();
      const result = await service.update('id', param as TestClass);
      expect(result).toMatchObject(expected);
    });
    it('should return FailedToUpdateResourceError if unhandled error occurs', async () => {
      const param: TestClassEntity = { name: 'foobar' };
      const expectedError = new Error('error');
      mockBaseRepository.update.mockRejectedValue(expectedError);
      const expected = new FailedToUpdateResourceError();
      const result = await service.update('id', param as TestClass);
      expect(result).toMatchObject(expected);
      expect(mockLoggerService.error).toBeCalled();
    });
  });

  describe('delete', () => {
    it('should call repository.delete and return result successfully', async () => {
      const result = await service.delete('id');
      expect(mockBaseRepository.delete).toBeCalledWith('id');
      expect(result).toMatchObject({ data: true });
    });
    it('should return FailedToDeleteResourceError if response is empty from repository', async () => {
      mockBaseRepository.delete.mockResolvedValue(null);
      const expected = new FailedToDeleteResourceError();
      const result = await service.delete('id');
      expect(result).toMatchObject(expected);
    });
    it('should return FailedToDeleteResourceError if nothing deleted from repository', async () => {
      mockBaseRepository.delete.mockResolvedValue({
        deletedCount: 0,
        acknowledged: true,
      });
      const expected = new FailedToDeleteResourceError();
      const result = await service.delete('id');
      expect(result).toMatchObject(expected);
    });
    it('should return NotFoundError if model to be deleted is not found by id', async () => {
      mockBaseRepository.findById.mockResolvedValue(null);
      const expected = new NotFoundError();
      const result = await service.delete('id');
      expect(result).toMatchObject(expected);
    });
    it('should return FailedToDeleteResourceError if unhandled error occurs', async () => {
      const expectedError = new Error('error');
      mockBaseRepository.delete.mockRejectedValue(expectedError);
      const expected = new FailedToDeleteResourceError();
      const result = await service.delete('id');
      expect(result).toMatchObject(expected);
      expect(mockLoggerService.error).toBeCalled();
    });
  });

  describe('findById', () => {
    it('should call repository.findById and return result successfully', async () => {
      const result = await service.findById('id');
      expect(mockBaseRepository.findById).toBeCalledWith('id');
      expect(result).toMatchObject({ data: { name: 'foobar' } });
    });
    it('should return NotFoundError if response is empty from repository', async () => {
      mockBaseRepository.findById.mockResolvedValue(null);
      const expected = new NotFoundError();
      const result = await service.findById('id');
      expect(result).toMatchObject(expected);
    });
    it('should return UnhandledError if unhandled error occurs', async () => {
      const expectedError = new Error('error');
      mockBaseRepository.findById.mockRejectedValue(expectedError);
      const expected = new UnhandledError();
      const result = await service.findById('id');
      expect(result).toMatchObject(expected);
      expect(mockLoggerService.error).toBeCalled();
    });
  });

  describe('findOne', () => {
    it('should call repository.findOne and return result successfully', async () => {
      const result = await service.findOne({ name: 'foobar' });
      expect(mockBaseRepository.findOne).toBeCalledWith({ name: 'foobar' });
      expect(result).toMatchObject({ data: { name: 'foobar' } });
    });
    it('should return NotFoundError if response is empty from repository', async () => {
      mockBaseRepository.findOne.mockResolvedValue(null);
      const expected = new NotFoundError();
      const result = await service.findOne({ name: 'foobar' });
      expect(result).toMatchObject(expected);
    });
    it('should return UnhandledError if unhandled error occurs', async () => {
      const expectedError = new Error('error');
      mockBaseRepository.findOne.mockRejectedValue(expectedError);
      const expected = new UnhandledError();
      const result = await service.findOne({ name: 'foobar' });
      expect(result).toMatchObject(expected);
      expect(mockLoggerService.error).toBeCalled();
    });
  });

  describe('find', () => {
    it('should call repository.find and return result successfully', async () => {
      const result = await service.find(
        { name: 'foobar' },
        { limit: 5, skip: 0 }
      );
      expect(mockBaseRepository.find).toBeCalledWith(
        { name: 'foobar' },
        { limit: 5, skip: 0 }
      );
      expect(result).toMatchObject({
        data: [{ name: 'foobar' }, { name: 'barbaz' }],
      });
    });
    it('should return EmptyResponseError if response is empty from repository', async () => {
      mockBaseRepository.find.mockResolvedValue(null);
      const expected = new EmptyResponseError();
      const result = await service.find(
        { name: 'foobar' },
        { limit: 5, skip: 0 }
      );
      expect(result).toMatchObject(expected);
    });
    it('should return UnhandledError if unhandled error occurs', async () => {
      const expectedError = new Error('error');
      mockBaseRepository.find.mockRejectedValue(expectedError);
      const expected = new UnhandledError();
      const result = await service.find(
        { name: 'foobar' },
        { limit: 5, skip: 0 }
      );
      expect(result).toMatchObject(expected);
      expect(mockLoggerService.error).toBeCalled();
    });
  });

  describe('findPagedList', () => {
    it('should call repository.find and repository.count and return result successfully', async () => {
      const result = await service.findPagedList(
        { name: 'foobar' },
        { limit: 5, skip: 0 }
      );
      expect(mockBaseRepository.count).toBeCalledWith({ name: 'foobar' });
      expect(result).toMatchObject({
        data: {
          items: [{ name: 'foobar' }, { name: 'barbaz' }],
          total: 5,
        },
      });
    });
    it('should return empty items list if response is empty from repository', async () => {
      mockBaseRepository.find.mockResolvedValue(null);
      const result = await service.findPagedList(
        { name: 'foobar' },
        { limit: 5, skip: 0 }
      );
      expect(result).toMatchObject({
        data: {
          items: [],
          total: 5,
        },
      });
    });
    it('should return UnhandledError if unhandled error occurs', async () => {
      const expectedError = new Error('error');
      mockBaseRepository.find.mockRejectedValue(expectedError);
      const expected = new UnhandledError();
      const result = await service.findPagedList(
        { name: 'foobar' },
        { limit: 5, skip: 0 }
      );
      expect(result).toMatchObject(expected);
      expect(mockLoggerService.error).toBeCalled();
    });
  });

  describe('updateOne', () => {
    it('should call repository.updateOne and return result successfully', async () => {
      const param: TestClassEntity = { name: 'foobar' };
      const result = await service.updateOne(
        { name: 'lorem' },
        param as TestClass
      );
      expect(mockBaseRepository.updateOne).toBeCalledWith(
        { name: 'lorem' },
        param
      );
      expect(mockBaseRepository.findOne).toBeCalledWith({ name: 'lorem' });
      expect(result).toMatchObject({ data: { name: 'foobar' } });
    });
    it('should return FailedToUpdateResourceError if response is empty from repository', async () => {
      const param: TestClassEntity = { name: 'foobar' };
      mockBaseRepository.updateOne.mockResolvedValue(null);
      const expected = new FailedToUpdateResourceError();
      const result = await service.updateOne(
        { name: 'lorem' },
        param as TestClass
      );
      expect(mockBaseRepository.findOne).not.toBeCalled();
      expect(result).toMatchObject(expected);
    });
    it('should return FailedToUpdateResourceError if modified 0 from repository', async () => {
      const param: TestClassEntity = { name: 'foobar' };
      mockBaseRepository.updateOne.mockResolvedValue({ modified: 0 });
      const expected = new FailedToUpdateResourceError();
      const result = await service.updateOne(
        { name: 'lorem' },
        param as TestClass
      );
      expect(mockBaseRepository.findOne).not.toBeCalled();
      expect(result).toMatchObject(expected);
    });
    it('should return FailedToUpdateResourceError if unhandled error occurs', async () => {
      const param: TestClassEntity = { name: 'foobar' };
      const expectedError = new Error('error');
      mockBaseRepository.updateOne.mockRejectedValue(expectedError);
      const expected = new FailedToUpdateResourceError();
      const result = await service.updateOne(
        { name: 'lorem' },
        param as TestClass
      );
      expect(result).toMatchObject(expected);
      expect(mockLoggerService.error).toBeCalled();
    });
  });

  describe('getSuccessEntityMetadata', () => {
    it('should return correct structure of entity metadata', () => {
      const result = service.getSuccessEntityMetadata({ name: 'foobar' });
      expect(result).toMatchObject({ data: { name: 'foobar' } });
    });
  });
});
