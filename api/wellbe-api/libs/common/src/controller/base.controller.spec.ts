import { Injectable } from '@nestjs/common';
import { Prop } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { FilterQuery } from 'mongoose';
import { BaseRepository, FindModelOptions } from '../database/base.repository';
import {
  BaseEntity,
  EmptyResponseError,
  EntityMetadata,
  InvalidArgumentsError,
  UnhandledError,
  FilterQueryOptions,
} from '../models';
import { BaseService } from '../services/base.service';
import { BaseController } from './base.controller';

type TestClass = TestClassEntity & BaseEntity;

class TestClassEntity {
  @Prop()
  name: String;
}
class TestRepository extends BaseRepository<TestClass> {}

@Injectable()
class TestService extends BaseService<TestClass, TestRepository> {}

@Injectable()
class TestController extends BaseController<
  TestClass,
  TestRepository,
  TestService
> {
  constructor(service: TestService) {
    super(service);
  }

  async find(
    query?: FilterQueryOptions<TestClass>
  ): Promise<EntityMetadata<TestClass[]>> {
    return super.find(query);
  }

  async findById(id: string): Promise<EntityMetadata<TestClass>> {
    return super.findById(id);
  }

  async findOne(
    query: FilterQueryOptions<TestClass>
  ): Promise<EntityMetadata<TestClass>> {
    return super.findOne(query);
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

describe('BaseController', () => {
  interface MockBaseService {
    create: jest.Mock<Promise<EntityMetadata<TestClass>>, [TestClass]>;
    update: jest.Mock<Promise<EntityMetadata<TestClass>>, [string, TestClass]>;
    delete: jest.Mock<Promise<EntityMetadata<boolean>>, [string]>;
    find: jest.Mock<
      Promise<EntityMetadata<TestClass[]>>,
      [FilterQuery<TestClass>, FindModelOptions<TestClass>]
    >;
    findById: jest.Mock<Promise<EntityMetadata<TestClass>>, [string]>;
    findOne: jest.Mock<Promise<EntityMetadata<TestClass>>, [object]>;
  }

  let mockBaseService: MockBaseService;
  let controller: TestController;

  beforeEach(async () => {
    mockBaseService = {
      create: jest.fn().mockResolvedValue({ data: { name: 'foobar' } }),
      update: jest.fn().mockResolvedValue({ data: { name: 'foobar' } }),
      delete: jest.fn().mockResolvedValue({ data: true }),
      find: jest
        .fn()
        .mockResolvedValue({ data: [{ name: 'foobar' }, { name: 'barbaz' }] }),
      findById: jest.fn().mockResolvedValue({ data: { name: 'foobar' } }),
      findOne: jest.fn().mockResolvedValue({ data: { name: 'foobar' } }),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [TestController],
      providers: [
        {
          provide: TestService,
          useValue: mockBaseService,
        },
      ],
    }).compile();

    controller = module.get<TestController>(TestController);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('constructor', () => {
    it('should be defined', () => {
      expect(controller).toBeDefined();
    });
  });

  describe('find', () => {
    it('should call service.find with empty arguments if query is null', async () => {
      await controller.find();
      expect(mockBaseService.find).toBeCalledWith();
    });
    it('should call service.find with query and options and return response', async () => {
      const param = { filter: { name: 'foobar' }, limit: 10, skip: 0 };
      const response = await controller.find(param);
      const expected = { data: [{ name: 'foobar' }, { name: 'barbaz' }] };
      expect(response).toMatchObject(expected);
      expect(mockBaseService.find).toBeCalledWith(param.filter, {
        limit: 10,
        skip: 0,
        sort: undefined,
      });
    });
  });

  describe('findById', () => {
    it('should call service.find', async () => {
      await controller.findById('id');
      expect(mockBaseService.findById).toBeCalledWith('id');
    });
  });

  describe('findOne', () => {
    it('should call service.findOne with query and return response', async () => {
      const param = { filter: { name: 'foobar' } };
      const response = await controller.findOne(param);
      const expected = { data: { name: 'foobar' } };
      expect(response).toMatchObject(expected);
      expect(mockBaseService.findOne).toBeCalledWith(param.filter);
    });
  });

  describe('create', () => {
    it('should throw InvalidArgumentsError if model is empty', async () => {
      const expectedError = new InvalidArgumentsError().exception;

      await expect(controller.create(null)).rejects.toThrowError(expectedError);

      await expect(
        controller.create('' as unknown as TestClass)
      ).rejects.toThrowError(expectedError);
    });
    it('should call service.create and return response', async () => {
      const param: TestClassEntity = { name: 'foobar' };
      const response = await controller.create(param as TestClass);
      const expected = { data: { name: 'foobar' } };
      expect(response).toMatchObject(expected);
      expect(mockBaseService.create).toBeCalledWith(param);
    });
  });

  describe('update', () => {
    it('should call service.update', async () => {
      const param: TestClassEntity = { name: 'foobar' };
      const expected = { data: { name: 'foobar' } };
      const result = await controller.update('id', param as TestClass);
      expect(mockBaseService.update).toBeCalledWith('id', param);
      expect(result).toMatchObject(expected);
    });
  });

  describe('delete', () => {
    it('should call service.delete and return response', async () => {
      const result = await controller.delete('id');
      expect(mockBaseService.delete).toBeCalledWith('id');
      expect(result).toMatchObject({ data: true });
    });
  });

  describe('handleResponse', () => {
    it('should throw EmptyResponseError error if response is empty', () => {
      const expectedError = new EmptyResponseError().exception;
      expect(() => BaseController.handleResponse(null)).toThrowError(
        expectedError
      );
    });

    it('should throw UnhandledError if error object is present', () => {
      const errorInfo = new UnhandledError().error;
      const expectedError = new UnhandledError().exception;
      const arg = new EntityMetadata(null, errorInfo);
      expect(() => BaseController.handleResponse(arg)).toThrowError(
        expectedError
      );
    });

    it('should return response with data', () => {
      const result = BaseController.handleResponse(
        new EntityMetadata({ name: 'foobar' })
      );
      expect(result).toMatchObject({ data: { name: 'foobar' } });
    });
  });

  describe('getFindModelOptions', () => {
    it('should return null if query is empty', async () => {
      const result = BaseController.getFindModelOptions(null);
      expect(result).toBe(null);
    });
    it('should return correct object structure', async () => {
      const expected = {
        limit: 5,
        skip: 0,
        sort: null,
        filter: { name: 'foobar' },
      };
      const result = BaseController.getFindModelOptions(expected);
      expect(result).toMatchObject({
        limit: 5,
        skip: 0,
        sort: null,
      });
    });
  });
});
