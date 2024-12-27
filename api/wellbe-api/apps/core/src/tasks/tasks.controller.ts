import { AuthorizationGuard } from '@nestjs-cognito/auth';
import { Controller, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  AppResponse,
  BaseController,
  EntityMetadata,
  ErrorInfo,
} from '@x/common';
import { TasksService } from './tasks.service';

@ApiTags('Tasks')
@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Post()
  @UseGuards(AuthorizationGuard(['admin', 'client']))
  @ApiResponse({ type: AppResponse, status: 200 })
  @ApiResponse({ type: ErrorInfo, status: 500 })
  @ApiOperation({ operationId: 'createSurveysForEmployees' })
  async createSurveysForEmployees(): Promise<EntityMetadata<AppResponse>> {
    await this.tasksService.handleSendEmployeeSurveys();
    return BaseController.handleResponse(
      new EntityMetadata<AppResponse>(AppResponse.success())
    );
  }
}
