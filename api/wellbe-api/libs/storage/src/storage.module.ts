import { DynamicModule, Module } from '@nestjs/common';
import { STORAGE_CONFIG_OPTIONS } from './constants';
import { StorageConfigOptions } from './storage-config-options';
import { StorageService } from './storage.service';

@Module({})
export class StorageModule {
  static register(options: StorageConfigOptions): DynamicModule {
    return {
      module: StorageModule,
      providers: [
        {
          provide: STORAGE_CONFIG_OPTIONS,
          useValue: options,
        },
        StorageService,
      ],
      exports: [StorageService],
    };
  }
}
