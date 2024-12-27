import { DynamicModule, Module } from '@nestjs/common';
import { StorageModule } from '@x/storage';
import { MediaController } from './media.controller';
import { MediaConfigOptions } from './media-config-options';
import { MulterModule } from '@nestjs/platform-express';

@Module({})
export class MediaModule {
  static register(config: MediaConfigOptions): DynamicModule {
    return {
      module: MediaModule,
      imports: [
        MulterModule.register(),
        StorageModule.register(config.storage),
      ],
      controllers: [MediaController],
    };
  }
}
