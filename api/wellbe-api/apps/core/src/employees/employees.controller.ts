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
import { Employee, EmployeeEntity } from './employee.schema';
import { EmployeesList } from './employees-list.entity';
import { EmployeesRepository } from './employees.repository';
import { EmployeesService } from './employees.service';
import { UpdateEmployeeRequest } from './update-employee-request.entity';

@ApiTags('Employees')
@Controller('employees')
export class EmployeesController extends BaseController<
  Employee,
  EmployeesRepository,
  EmployeesService
> {
  constructor(service: EmployeesService) {
    super(service);
  }

  @Get()
  @Public()
  @UseInterceptors(new EntityTransformInterceptor(EmployeesList))
  @ApiResponse({ type: EmployeesList, status: 200 })
  @ApiResponse({ type: ErrorInfo, status: 500 })
  @ApiOperation({ operationId: 'find' })
  @ApiQuery({
    name: 'filter',
    required: false,
    style: 'deepObject',
    schema: {
      $ref: getSchemaPath(EmployeeEntity),
    },
  })
  @ApiQuery(ApiPropertyParams.LIMIT)
  @ApiQuery(ApiPropertyParams.SKIP)
  @ApiQuery(ApiPropertyParams.SORT)
  async find(
    @Query() query?: FilterQueryOptions<Employee>
  ): Promise<EntityMetadata<Employee[]>> {
    const options = BaseController.getFindModelOptions(query);
    const result = await this.service.find(query?.filter, options);
    return BaseController.handleResponse(result);
  }

  @Get('single')
  @Public()
  @UseInterceptors(new EntityTransformInterceptor(EmployeeEntity))
  @ApiResponse({ type: EmployeeEntity, status: 200 })
  @ApiResponse({ type: ErrorInfo, status: 500 })
  @ApiOperation({ operationId: 'findOne' })
  @ApiQuery({
    name: 'filter',
    required: false,
    schema: {
      $ref: getSchemaPath(EmployeeEntity),
    },
  })
  async findOne(
    @Query() query: FilterQuery<Employee>
  ): Promise<EntityMetadata<Employee>> {
    const result = await this.service.findOne(query);
    return BaseController.handleResponse(result);
  }

  @Get(':id')
  @Public()
  @UseInterceptors(new EntityTransformInterceptor(EmployeeEntity))
  @ApiResponse({ type: EmployeeEntity, status: 200 })
  @ApiResponse({ type: ErrorInfo, status: 500 })
  @ApiOperation({ operationId: 'findById' })
  async findById(@Param('id') id: string): Promise<EntityMetadata<Employee>> {
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
  @UseInterceptors(new EntityTransformInterceptor(EmployeeEntity))
  @ApiResponse({ type: EmployeeEntity, status: 200 })
  @ApiResponse({ type: ErrorInfo, status: 500 })
  @ApiOperation({ operationId: 'create' })
  @ApiBearerAuth()
  @UsePipes(
    new ValidationPipe({
      exceptionFactory: throwValidationErrors,
    })
  )
  async create(
    @Body() model: EmployeeEntity
  ): Promise<EntityMetadata<Employee>> {
    return super.create(model as Employee);
  }

  @Patch(':id')
  @UseInterceptors(
    new EntityTransformInterceptor(EmployeeEntity, {
      ignoreDecorators: true,
    })
  )
  @ApiResponse({ type: EmployeeEntity, status: 200 })
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
    @Body() model: UpdateEmployeeRequest
  ): Promise<EntityMetadata<Employee>> {
    const result = await this.service.update(id, model);
    return BaseController.handleResponse(result);
  }
}
