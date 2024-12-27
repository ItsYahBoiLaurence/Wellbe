import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
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
import { SurveysList } from './surveys-list.entity';
import { SurveysRepository } from './surveys.repository';
import { Survey, SurveyEntity } from './survey.schema';
import { SurveysService } from './surveys.service';
import { UpdateSurveyRequest } from './update-survey-request.entity';
import { AuthenticationGuard, CognitoUser } from '@nestjs-cognito/auth';

@ApiTags('Surveys')
@Controller('surveys')
export class SurveysController extends BaseController<
  Survey,
  SurveysRepository,
  SurveysService
> {
  constructor(service: SurveysService) {
    super(service);
  }

  @Get()
  @Public()
  @UseInterceptors(new EntityTransformInterceptor(SurveysList))
  @ApiResponse({ type: SurveysList, status: 200 })
  @ApiResponse({ type: ErrorInfo, status: 500 })
  @ApiOperation({ operationId: 'find' })
  @ApiQuery({
    name: 'filter',
    required: false,
    style: 'deepObject',
    schema: {
      $ref: getSchemaPath(SurveyEntity),
    },
  })
  @ApiQuery(ApiPropertyParams.LIMIT)
  @ApiQuery(ApiPropertyParams.SKIP)
  @ApiQuery(ApiPropertyParams.SORT)
  async find(
    @Query() query?: FilterQueryOptions<Survey>
  ): Promise<EntityMetadata<Survey[]>> {
    const options = BaseController.getFindModelOptions(query);
    const result = await this.service.find(query?.filter, options);
    return BaseController.handleResponse(result);
  }

  @Get('single')
  @Public()
  @UseInterceptors(new EntityTransformInterceptor(SurveyEntity))
  @ApiResponse({ type: SurveyEntity, status: 200 })
  @ApiResponse({ type: ErrorInfo, status: 500 })
  @ApiOperation({ operationId: 'findOne' })
  @ApiQuery({
    name: 'filter',
    required: false,
    schema: {
      $ref: getSchemaPath(SurveyEntity),
    },
  })
  async findOne(
    @Query() query: FilterQuery<Survey>
  ): Promise<EntityMetadata<Survey>> {
    const result = await this.service.findOne(query);
    return BaseController.handleResponse(result);
  }

  @Get('latest')
  @UseGuards(AuthenticationGuard)
  @UseInterceptors(new EntityTransformInterceptor(SurveyEntity))
  @ApiResponse({ type: SurveyEntity, status: 200 })
  @ApiResponse({ type: ErrorInfo, status: 500 })
  @ApiOperation({ operationId: 'getLatest' })
  async getLatest(
    @CognitoUser('username') cognitoSub: string
  ): Promise<EntityMetadata<Survey>> {
    const result = await this.service.getLatestSurveyForEmployee(cognitoSub);
    return BaseController.handleResponse(result);
  }

  @Get(':id')
  @Public()
  @UseInterceptors(new EntityTransformInterceptor(SurveyEntity))
  @ApiResponse({ type: SurveyEntity, status: 200 })
  @ApiResponse({ type: ErrorInfo, status: 500 })
  @ApiOperation({ operationId: 'findById' })
  async findById(@Param('id') id: string): Promise<EntityMetadata<Survey>> {
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
  @UseInterceptors(new EntityTransformInterceptor(SurveyEntity))
  @ApiResponse({ type: SurveyEntity, status: 200 })
  @ApiResponse({ type: ErrorInfo, status: 500 })
  @ApiOperation({ operationId: 'create' })
  @ApiBearerAuth()
  @UsePipes(
    new ValidationPipe({
      exceptionFactory: throwValidationErrors,
    })
  )
  async create(@Body() model: SurveyEntity): Promise<EntityMetadata<Survey>> {
    return super.create(model as Survey);
  }

  @Patch(':id')
  @UseInterceptors(
    new EntityTransformInterceptor(SurveyEntity, {
      ignoreDecorators: true,
    })
  )
  @ApiResponse({ type: SurveyEntity, status: 200 })
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
    @Body() model: UpdateSurveyRequest
  ): Promise<EntityMetadata<Survey>> {
    const result = await this.service.update(id, model);
    return BaseController.handleResponse(result);
  }

  @Post(':id/submit')
  @UseGuards(AuthenticationGuard)
  @UseInterceptors(
    new EntityTransformInterceptor(SurveyEntity, {
      ignoreDecorators: true,
    })
  )
  @ApiResponse({ type: SurveyEntity, status: 200 })
  @ApiResponse({ type: ErrorInfo, status: 500 })
  @ApiOperation({ operationId: 'post' })
  @ApiBearerAuth()
  @UsePipes(
    new ValidationPipe({
      exceptionFactory: throwValidationErrors,
      transformOptions: { ignoreDecorators: true },
    })
  )
  async submit(
    @Param('id') id: string,
    @Body() model: UpdateSurveyRequest,
    @CognitoUser('username') cognitoSub: string
  ): Promise<EntityMetadata<Survey>> {
    const result = await this.service.submitAnswers(cognitoSub, id, model);
    return BaseController.handleResponse(result);
  }
}
