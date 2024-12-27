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
import { QuestionsList } from './questions-list.entity';
import { QuestionsRepository } from './questions.repository';
import { Question, QuestionEntity } from './question.schema';
import { QuestionsService } from './questions.service';
import { UpdateQuestionRequest } from './update-question-request.entity';

@ApiTags('Questions')
@Controller('questions')
export class QuestionsController extends BaseController<
  Question,
  QuestionsRepository,
  QuestionsService
> {
  constructor(service: QuestionsService) {
    super(service);
  }

  @Get()
  @Public()
  @UseInterceptors(new EntityTransformInterceptor(QuestionsList))
  @ApiResponse({ type: QuestionsList, status: 200 })
  @ApiResponse({ type: ErrorInfo, status: 500 })
  @ApiOperation({ operationId: 'find' })
  @ApiQuery({
    name: 'filter',
    required: false,
    style: 'deepObject',
    schema: {
      $ref: getSchemaPath(QuestionEntity),
    },
  })
  @ApiQuery(ApiPropertyParams.LIMIT)
  @ApiQuery(ApiPropertyParams.SKIP)
  @ApiQuery(ApiPropertyParams.SORT)
  async find(
    @Query() query?: FilterQueryOptions<Question>
  ): Promise<EntityMetadata<Question[]>> {
    const options = BaseController.getFindModelOptions(query);
    const result = await this.service.find(query?.filter, options);
    return BaseController.handleResponse(result);
  }

  @Get('single')
  @Public()
  @UseInterceptors(new EntityTransformInterceptor(QuestionEntity))
  @ApiResponse({ type: QuestionEntity, status: 200 })
  @ApiResponse({ type: ErrorInfo, status: 500 })
  @ApiOperation({ operationId: 'findOne' })
  @ApiQuery({
    name: 'filter',
    required: false,
    schema: {
      $ref: getSchemaPath(QuestionEntity),
    },
  })
  async findOne(
    @Query() query: FilterQuery<Question>
  ): Promise<EntityMetadata<Question>> {
    const result = await this.service.findOne(query);
    return BaseController.handleResponse(result);
  }

  @Get(':id')
  @Public()
  @UseInterceptors(new EntityTransformInterceptor(QuestionEntity))
  @ApiResponse({ type: QuestionEntity, status: 200 })
  @ApiResponse({ type: ErrorInfo, status: 500 })
  @ApiOperation({ operationId: 'findById' })
  async findById(@Param('id') id: string): Promise<EntityMetadata<Question>> {
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
  @UseInterceptors(new EntityTransformInterceptor(QuestionEntity))
  @ApiResponse({ type: QuestionEntity, status: 200 })
  @ApiResponse({ type: ErrorInfo, status: 500 })
  @ApiOperation({ operationId: 'create' })
  @ApiBearerAuth()
  @UsePipes(
    new ValidationPipe({
      exceptionFactory: throwValidationErrors,
    })
  )
  async create(
    @Body() model: QuestionEntity
  ): Promise<EntityMetadata<Question>> {
    return super.create(model as Question);
  }

  @Patch(':id')
  @UseInterceptors(
    new EntityTransformInterceptor(QuestionEntity, {
      ignoreDecorators: true,
    })
  )
  @ApiResponse({ type: QuestionEntity, status: 200 })
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
    @Body() model: UpdateQuestionRequest
  ): Promise<EntityMetadata<Question>> {
    const result = await this.service.update(id, model);
    return BaseController.handleResponse(result);
  }
}
