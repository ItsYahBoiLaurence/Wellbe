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
import { PortalUsersList } from './portal-users-list.entity';
import { PortalUsersRepository } from './portal-users.repository';
import { PortalUser, PortalUserEntity } from './portal-user.schema';
import { PortalUsersService } from './portal-users.service';
import { UpdatePortalUserRequest } from './update-portal-user-request.entity';

@ApiTags('PortalUsers')
@Controller('portal-users')
export class PortalUsersController extends BaseController<
  PortalUser,
  PortalUsersRepository,
  PortalUsersService
> {
  constructor(service: PortalUsersService) {
    super(service);
  }

  @Get()
  @Public()
  @UseInterceptors(new EntityTransformInterceptor(PortalUsersList))
  @ApiResponse({ type: PortalUsersList, status: 200 })
  @ApiResponse({ type: ErrorInfo, status: 500 })
  @ApiOperation({ operationId: 'find' })
  @ApiQuery({
    name: 'filter',
    required: false,
    style: 'deepObject',
    schema: {
      $ref: getSchemaPath(PortalUserEntity),
    },
  })
  @ApiQuery(ApiPropertyParams.LIMIT)
  @ApiQuery(ApiPropertyParams.SKIP)
  @ApiQuery(ApiPropertyParams.SORT)
  async find(
    @Query() query?: FilterQueryOptions<PortalUser>
  ): Promise<EntityMetadata<PortalUser[]>> {
    const options = BaseController.getFindModelOptions(query);
    const result = await this.service.find(query?.filter, options);
    return BaseController.handleResponse(result);
  }

  @Get('single')
  @Public()
  @UseInterceptors(new EntityTransformInterceptor(PortalUserEntity))
  @ApiResponse({ type: PortalUserEntity, status: 200 })
  @ApiResponse({ type: ErrorInfo, status: 500 })
  @ApiOperation({ operationId: 'findOne' })
  @ApiQuery({
    name: 'filter',
    required: false,
    schema: {
      $ref: getSchemaPath(PortalUserEntity),
    },
  })
  async findOne(
    @Query() query: FilterQuery<PortalUser>
  ): Promise<EntityMetadata<PortalUser>> {
    const result = await this.service.findOne(query);
    return BaseController.handleResponse(result);
  }

  @Get(':id')
  @Public()
  @UseInterceptors(new EntityTransformInterceptor(PortalUserEntity))
  @ApiResponse({ type: PortalUserEntity, status: 200 })
  @ApiResponse({ type: ErrorInfo, status: 500 })
  @ApiOperation({ operationId: 'findById' })
  async findById(@Param('id') id: string): Promise<EntityMetadata<PortalUser>> {
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
  @UseInterceptors(new EntityTransformInterceptor(PortalUserEntity))
  @ApiResponse({ type: PortalUserEntity, status: 200 })
  @ApiResponse({ type: ErrorInfo, status: 500 })
  @ApiOperation({ operationId: 'create' })
  @ApiBearerAuth()
  @UsePipes(
    new ValidationPipe({
      exceptionFactory: throwValidationErrors,
    })
  )
  async create(
    @Body() model: PortalUserEntity
  ): Promise<EntityMetadata<PortalUser>> {
    return super.create(model as PortalUser);
  }

  @Patch(':id')
  @UseInterceptors(
    new EntityTransformInterceptor(PortalUserEntity, {
      ignoreDecorators: true,
    })
  )
  @ApiResponse({ type: PortalUserEntity, status: 200 })
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
    @Body() model: UpdatePortalUserRequest
  ): Promise<EntityMetadata<PortalUser>> {
    const result = await this.service.update(id, model);
    return BaseController.handleResponse(result);
  }
}
