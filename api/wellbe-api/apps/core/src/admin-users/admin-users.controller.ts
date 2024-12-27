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
import { AdminUsersList } from './admin-users-list.entity';
import { AdminUsersRepository } from './admin-users.repository';
import { AdminUser, AdminUserEntity } from './admin-user.schema';
import { AdminUsersService } from './admin-users.service';
import { UpdateAdminUserRequest } from './update-admin-users-request.entity';

@ApiTags('AdminUsers')
@Controller('admin-users')
export class AdminUsersController extends BaseController<
  AdminUser,
  AdminUsersRepository,
  AdminUsersService
> {
  constructor(service: AdminUsersService) {
    super(service);
  }

  @Get()
  @Public()
  @UseInterceptors(new EntityTransformInterceptor(AdminUsersList))
  @ApiResponse({ type: AdminUsersList, status: 200 })
  @ApiResponse({ type: ErrorInfo, status: 500 })
  @ApiOperation({ operationId: 'find' })
  @ApiQuery({
    name: 'filter',
    required: false,
    style: 'deepObject',
    schema: {
      $ref: getSchemaPath(AdminUserEntity),
    },
  })
  @ApiQuery(ApiPropertyParams.LIMIT)
  @ApiQuery(ApiPropertyParams.SKIP)
  @ApiQuery(ApiPropertyParams.SORT)
  async find(
    @Query() query?: FilterQueryOptions<AdminUser>
  ): Promise<EntityMetadata<AdminUser[]>> {
    const options = BaseController.getFindModelOptions(query);
    const result = await this.service.find(query?.filter, options);
    return BaseController.handleResponse(result);
  }

  @Get('single')
  @Public()
  @UseInterceptors(new EntityTransformInterceptor(AdminUserEntity))
  @ApiResponse({ type: AdminUserEntity, status: 200 })
  @ApiResponse({ type: ErrorInfo, status: 500 })
  @ApiOperation({ operationId: 'findOne' })
  @ApiQuery({
    name: 'filter',
    required: false,
    schema: {
      $ref: getSchemaPath(AdminUserEntity),
    },
  })
  async findOne(
    @Query() query: FilterQuery<AdminUser>
  ): Promise<EntityMetadata<AdminUser>> {
    const result = await this.service.findOne(query);
    return BaseController.handleResponse(result);
  }

  @Get(':id')
  @Public()
  @UseInterceptors(new EntityTransformInterceptor(AdminUserEntity))
  @ApiResponse({ type: AdminUserEntity, status: 200 })
  @ApiResponse({ type: ErrorInfo, status: 500 })
  @ApiOperation({ operationId: 'findById' })
  async findById(@Param('id') id: string): Promise<EntityMetadata<AdminUser>> {
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
  @UseInterceptors(new EntityTransformInterceptor(AdminUserEntity))
  @ApiResponse({ type: AdminUserEntity, status: 200 })
  @ApiResponse({ type: ErrorInfo, status: 500 })
  @ApiOperation({ operationId: 'create' })
  @ApiBearerAuth()
  @UsePipes(
    new ValidationPipe({
      exceptionFactory: throwValidationErrors,
    })
  )
  async create(
    @Body() model: AdminUserEntity
  ): Promise<EntityMetadata<AdminUser>> {
    return super.create(model as AdminUser);
  }

  @Patch(':id')
  @UseInterceptors(
    new EntityTransformInterceptor(AdminUserEntity, {
      ignoreDecorators: true,
    })
  )
  @ApiResponse({ type: AdminUserEntity, status: 200 })
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
    @Body() model: UpdateAdminUserRequest
  ): Promise<EntityMetadata<AdminUser>> {
    const result = await this.service.update(id, model);
    return BaseController.handleResponse(result);
  }
}
