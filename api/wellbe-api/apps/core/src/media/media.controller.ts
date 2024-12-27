import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  BaseController,
  EntityMetadata,
  FailedToCreateResourceError,
  InvalidArgumentsError,
} from '@x/common';
import { StorageService } from '@x/storage';
import { FileValidationGuard } from './file-validation.guard';

@ApiTags('Media')
@Controller('media')
export class MediaController {
  constructor(private storageService: StorageService) {}

  @Post('upload')
  @ApiBearerAuth()
  @ApiOperation({ operationId: 'upload' })
  @UseGuards(FileValidationGuard('file', { limits: { fileSize: 524288000 } }))
  async upload(
    @Body() req: any,
    @UploadedFile() file: any
  ): Promise<EntityMetadata<string>> {
    if (!file)
      return BaseController.handleResponse(
        new InvalidArgumentsError('File missing')
      );
    const url = await this.storageService.upload(
      file.buffer,
      req.directory,
      req.fileName
    );
    return url
      ? BaseController.handleResponse(new EntityMetadata(url))
      : BaseController.handleResponse(
          new FailedToCreateResourceError('Failed to upload file')
        );
  }
}
