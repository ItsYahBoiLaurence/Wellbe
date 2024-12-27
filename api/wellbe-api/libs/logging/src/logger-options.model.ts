import {
  ConsoleTransportOptions,
  FileTransportOptions,
} from 'winston/lib/winston/transports';

export type LoggerOptions = {
  file?: FileTransportOptions;
  console?: ConsoleTransportOptions;
  appName: string;
  sentry?: {
    dsn: string;
    environment: string;
  };
};
