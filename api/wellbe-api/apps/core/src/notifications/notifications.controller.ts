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
import { NotificationsList } from './notifications-list.entity';
import { NotificationsRepository } from './notifications.repository';
import { Notification, NotificationEntity } from './notification.schema';
import { NotificationsService } from './notifications.service';
import { UpdateNotificationRequest } from './update-notification-request.entity';

@ApiTags('Notifications')
@Controller('notifications')
export class NotificationsController extends BaseController<
  Notification,
  NotificationsRepository,
  NotificationsService
> {
  constructor(service: NotificationsService) {
    super(service);
  }

  @Get()
  @Public()
  @UseInterceptors(new EntityTransformInterceptor(NotificationsList))
  @ApiResponse({ type: NotificationsList, status: 200 })
  @ApiResponse({ type: ErrorInfo, status: 500 })
  @ApiOperation({ operationId: 'find' })
  @ApiQuery({
    name: 'filter',
    required: false,
    style: 'deepObject',
    schema: {
      $ref: getSchemaPath(NotificationEntity),
    },
  })
  @ApiQuery(ApiPropertyParams.LIMIT)
  @ApiQuery(ApiPropertyParams.SKIP)
  @ApiQuery(ApiPropertyParams.SORT)
  async find(
    @Query() query?: FilterQueryOptions<Notification>
  ): Promise<EntityMetadata<Notification[]>> {
    const options = BaseController.getFindModelOptions(query);
    const result = await this.service.find(query?.filter, options);
    return BaseController.handleResponse(result);
  }

  @Get('single')
  @Public()
  @UseInterceptors(new EntityTransformInterceptor(NotificationEntity))
  @ApiResponse({ type: NotificationEntity, status: 200 })
  @ApiResponse({ type: ErrorInfo, status: 500 })
  @ApiOperation({ operationId: 'findOne' })
  @ApiQuery({
    name: 'filter',
    required: false,
    schema: {
      $ref: getSchemaPath(NotificationEntity),
    },
  })
  async findOne(
    @Query() query: FilterQuery<Notification>
  ): Promise<EntityMetadata<Notification>> {
    const result = await this.service.findOne(query);
    return BaseController.handleResponse(result);
  }

  @Get(':id')
  @Public()
  @UseInterceptors(new EntityTransformInterceptor(NotificationEntity))
  @ApiResponse({ type: NotificationEntity, status: 200 })
  @ApiResponse({ type: ErrorInfo, status: 500 })
  @ApiOperation({ operationId: 'findById' })
  async findById(
    @Param('id') id: string
  ): Promise<EntityMetadata<Notification>> {
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
  @UseInterceptors(new EntityTransformInterceptor(NotificationEntity))
  @ApiResponse({ type: NotificationEntity, status: 200 })
  @ApiResponse({ type: ErrorInfo, status: 500 })
  @ApiOperation({ operationId: 'create' })
  @ApiBearerAuth()
  @UsePipes(
    new ValidationPipe({
      exceptionFactory: throwValidationErrors,
    })
  )
  async create(
    @Body() model: NotificationEntity
  ): Promise<EntityMetadata<Notification>> {
    return super.create(model as Notification);
  }

  @Patch(':id')
  @UseInterceptors(
    new EntityTransformInterceptor(NotificationEntity, {
      ignoreDecorators: true,
    })
  )
  @ApiResponse({ type: NotificationEntity, status: 200 })
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
    @Body() model: UpdateNotificationRequest
  ): Promise<EntityMetadata<Notification>> {
    const result = await this.service.update(id, model);
    return BaseController.handleResponse(result);
  }
}
