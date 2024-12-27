/**
 * Gets list or a value of allowed origins
 * @param envValue Comma-delimited string of allowed origins
 */

export default () => ({
  swagger: {
    title: process.env.SWAGGER_TITLE,
    description: process.env.SWAGGER_DESCRIPTION,
    version: process.env.SWAGGER_VERSION,
    enabled: process.env.SWAGGER_ENABLED === 'true',
  },
  database: {
    uri: process.env.WELLBE_DATABASE_CONNECTION_STRING,
    name: 'wellbe',
  },
  logging: {
    appName: process.env.APP_NAME,
    sentry: {
      dsn: process.env.SENTRY_DSN,
      environment: process.env.SENTRY_ENVIRONMENT,
    },
  },
  mailer: {
    fromName: process.env.MAILER_FROM_NAME,
    fromEmail: process.env.MAILER_FROM_EMAIL,
    sendgridKey: process.env.SENDGRID_KEY,
    newSurveyTemplateId: process.env.SENDGRID_NEW_SURVEY_TEMPLATE_ID,
    baseAppUrl: process.env.BASE_APP_URL,
  },
  storage: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    region: process.env.S3_REGION,
    bucketName: process.env.S3_BUCKET_NAME,
  },
  rabbitMQ: {
    uri: process.env.RABBITMQ_URI,
  },
  cognito: {
    userPoolId: process.env.COGNITO_USERPOOL_ID,
    clientId: process.env.COGNITO_CLIENT_ID,
    region: process.env.COGNITO_REGION,
  },
  aws: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});
