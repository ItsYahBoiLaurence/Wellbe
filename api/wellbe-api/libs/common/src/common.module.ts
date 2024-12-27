import { APP_INTERCEPTOR, APP_FILTER } from '@nestjs/core';
import { Module, DynamicModule, Provider } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { LoggerInterceptor } from './interceptors/logger.interceptor';
import { ExceptionInterceptor } from './interceptors/exception.interceptor';
import { RequestSanitizerInterceptor } from './interceptors/request-sanitizer.interceptor';
import { AppExceptionFilter } from './filters';
import {
  CommonConfigOptions,
  CommonModulePlatform,
} from './common-config-options';
import { HELPERS_CONFIG_OPTIONS } from './constants';
import { AppHttpService } from './services/app-http.service';

@Module({})
export class CommonModule {
  static register(
    options: CommonConfigOptions = {
      platform: CommonModulePlatform.EXPRESS,
      applyFilters: false,
      applyInterceptors: false,
    }
  ): DynamicModule {
    let providers: Provider[] = [
      { provide: HELPERS_CONFIG_OPTIONS, useValue: options },
      AppHttpService,
    ];
    if (options.applyFilters) {
      providers = [
        ...providers,
        { provide: APP_FILTER, useClass: AppExceptionFilter },
      ];
    }
    if (options.applyInterceptors) {
      providers = [
        ...providers,
        { provide: APP_INTERCEPTOR, useClass: LoggerInterceptor },
        { provide: APP_INTERCEPTOR, useClass: ExceptionInterceptor },
        { provide: APP_INTERCEPTOR, useClass: RequestSanitizerInterceptor },
      ];
    }

    return {
      module: CommonModule,
      imports: [
        HttpModule.register({
          timeout: 20000,
          maxRedirects: 5,
        }),
      ],
      providers,
      exports: [AppHttpService],
    };
  }
}
