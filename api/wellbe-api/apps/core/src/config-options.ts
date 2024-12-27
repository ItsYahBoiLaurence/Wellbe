import { LoggerOptions } from '@x/logging';
import { MailerConfigOptions } from '@x/mailer';
import { MessageQueueConfigOptions } from '@x/messaging';
import { StorageConfigOptions } from '@x/storage';

export interface DatabaseOptions {
  uri: string;
  name: string;
}

export interface SwaggerOptions {
  title: string;
  description: string;
  version: string;
}

export interface CognitoOptions {
  userPoolId: string;
  clientId: string;
  region: string;
}

export interface AwsConfigOptions {
  accessKeyId: string;
  secretAccessKey: string;
}

export interface ConfigOptions {
  database: DatabaseOptions;
  rabbitMQ: MessageQueueConfigOptions;
  mailer: MailerConfigOptions;
  storage: StorageConfigOptions;
  logging: LoggerOptions;
  cognito: CognitoOptions;
  aws: AwsConfigOptions;
}
