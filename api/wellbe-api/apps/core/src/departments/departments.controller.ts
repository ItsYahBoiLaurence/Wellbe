import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import {
  ApiPropertyParams,
  AppResponse,
  BaseController,
  EntityMetadata,
  EntityTransformInterceptor,
  ErrorInfo,
  FilterQueryOptions,
  Public,
  throwValidationErrors,
} from '@x/common';
import { FilterQuery } from 'mongoose';
import { DepartmentsList } from './departments-list.entity';
import { DepartmentsRepository } from './departments.repository';
import { Department, DepartmentEntity } from './department.schema';
import { DepartmentsService } from './departments.service';
import { UpdateDepartmentRequest } from './update-department-request.entity';

@ApiTags('Departments')
@Controller('departments')
export class DepartmentsController extends BaseController<
  Department,
  DepartmentsRepository,
  DepartmentsService
> {
  constructor(service: DepartmentsService) {
    super(service);
  }

  @Get()
  @Public()
  @UseInterceptors(new EntityTransformInterceptor(DepartmentsList))
  @ApiResponse({ type: DepartmentsList, status: 200 })
  @ApiResponse({ type: ErrorInfo, status: 500 })
  @ApiOperation({ operationId: 'find' })
  @ApiQuery({
    name: 'filter',
    required: false,
    style: 'deepObject',
    schema: {
      $ref: getSchemaPath(DepartmentEntity),
    },
  })
  @ApiQuery(ApiPropertyParams.LIMIT)
  @ApiQuery(ApiPropertyParams.SKIP)
  @ApiQuery(ApiPropertyParams.SORT)
  async find(
    @Query() query?: FilterQueryOptions<Department>
  ): Promise<EntityMetadata<Department[]>> {
    const options = BaseController.getFindModelOptions(query);
    const result = await this.service.find(query?.filter, options);
    return BaseController.handleResponse(result);
  }

  @Get('single')
  @Public()
  @UseInterceptors(new EntityTransformInterceptor(DepartmentEntity))
  @ApiResponse({ type: DepartmentEntity, status: 200 })
  @ApiResponse({ type: ErrorInfo, status: 500 })
  @ApiOperation({ operationId: 'findOne' })
  @ApiQuery({
    name: 'filter',
    required: false,
    schema: {
      $ref: getSchemaPath(DepartmentEntity),
    },
  })
  async findOne(
    @Query() query: FilterQuery<Department>
  ): Promise<EntityMetadata<Department>> {
    const result = await this.service.findOne(query);
    return BaseController.handleResponse(result);
  }

  @Get(':id')
  @Public()
  @UseInterceptors(new EntityTransformInterceptor(DepartmentEntity))
  @ApiResponse({ type: DepartmentEntity, status: 200 })
  @ApiResponse({ type: ErrorInfo, status: 500 })
  @ApiOperation({ operationId: 'findById' })
  async findById(@Param('id') id: string): Promise<EntityMetadata<Department>> {
    const result = await this.service.findById(id);
    return BaseController.handleResponse(result);
  }

  @Delete(':id')
  @Public()
  @ApiResponse({ type: AppResponse, status: 200 })
  @ApiResponse({ type: ErrorInfo, status: 500 })
  @ApiOperation({ operationId: 'findById' })
  async delete(@Param('id') id: string): Promise<EntityMetadata<boolean>> {
    const result = await this.service.delete(id);
    return BaseController.handleResponse(result);
  }

  @Post()
  @UseInterceptors(new EntityTransformInterceptor(DepartmentEntity))
  @ApiResponse({ type: DepartmentEntity, status: 200 })
  @ApiResponse({ type: ErrorInfo, status: 500 })
  @ApiOperation({ operationId: 'create' })
  @ApiBearerAuth()
  @UsePipes(
    new ValidationPipe({
      exceptionFactory: throwValidationErrors,
    })
  )
  async create(
    @Body() model: DepartmentEntity
  ): Promise<EntityMetadata<Department>> {
    return super.create(model as Department);
  }

  @Patch(':id')
  @UseInterceptors(
    new EntityTransformInterceptor(DepartmentEntity, {
      ignoreDecorators: true,
    })
  )
  @ApiResponse({ type: DepartmentEntity, status: 200 })
  @ApiResponse({ type: ErrorInfo, status: 500 })
  @ApiOperation({ operationId: 'patch' })
  @ApiBearerAuth()
  @UsePipes(
    new ValidationPipe({
      exceptionFactory: throwValidationErrors,
      transformOptions: { ignoreDecorators: true },
    })
  )
  async patch(
    @Param('id') id: string,
    @Body() model: UpdateDepartmentRequest
  ): Promise<EntityMetadata<Department>> {
    const result = await this.service.update(id, model);
    return BaseController.handleResponse(result);
  }
}
