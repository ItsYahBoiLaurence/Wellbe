import { DynamicModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule, CommonModulePlatform } from '@x/common';
import { LoggingModule } from '@x/logging';
import { MailerModule } from '@x/mailer';
import { MessageQueueModule } from '@x/messaging';
import { AdminUsersModule } from '../admin-users';
import { AuthModule } from '../auth';
import { CompaniesModule } from '../companies';
import { ConfigOptions } from '../config-options';
import { DepartmentsModule } from '../departments';
import { EmployeesModule } from '../employees';
import { MediaModule } from '../media';
import { NotificationsModule } from '../notifications';
import { PortalUsersModule } from '../portal-users';
import { QuestionsModule } from '../questions';
import { SurveysModule } from '../surveys';
import { AppController } from './app.controller';
import { CognitoAuthModule } from '@nestjs-cognito/auth';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TasksModule } from '../tasks';

@Module({})
export class AppModule {
  static register(config: ConfigOptions): DynamicModule {
    return {
      module: AppModule,
      controllers: [AppController],
      imports: [
        MongooseModule.forRoot(config.database.uri),
        LoggingModule.register(config.logging),
        MessageQueueModule.register(config?.rabbitMQ, true),
        CommonModule.register({
          platform: CommonModulePlatform.EXPRESS,
          applyFilters: true,
          applyInterceptors: true,
        }),
        CognitoAuthModule.registerAsync({
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: async (_: ConfigService) => ({
            jwtVerifier: {
              userPoolId: config.cognito.userPoolId,
              clientId: config.cognito.clientId,
              tokenUse: 'id',
            },
            identityProvider: {
              region: config.cognito.region,
              credentials: {
                accessKeyId: config.aws.accessKeyId,
                secretAccessKey: config.aws.secretAccessKey,
              },
            },
          }),
        }),
        MediaModule.register({ storage: config.storage }),
        MailerModule.register(config.mailer, true),
        AuthModule.register(config),
        AdminUsersModule.register(),
        CompaniesModule.register(),
        DepartmentsModule.register(),
        EmployeesModule.register(),
        PortalUsersModule.register(),
        QuestionsModule.register(),
        SurveysModule.register(),
        MediaModule.register({ storage: config.storage }),
        NotificationsModule.register(),
        TasksModule.register(config),
      ],
    };
  }
}
