import { DynamicModule, Module } from '@nestjs/common';
import { CompaniesModule } from '../companies';
import { ConfigOptions } from '../config-options';
import { EmployeesModule } from '../employees';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AUTH_SERVICE_OPTIONS } from './constants';

@Module({})
export class AuthModule {
  static register(config: ConfigOptions): DynamicModule {
    return {
      module: AuthModule,
      controllers: [AuthController],
      imports: [CompaniesModule.register(), EmployeesModule.register()],
      providers: [
        AuthService,
        {
          provide: AUTH_SERVICE_OPTIONS,
          useValue: config.cognito,
        },
      ],
    };
  }
}
