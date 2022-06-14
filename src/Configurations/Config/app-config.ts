import * as Joi from 'joi';
import { ConfigRegisterAs } from './config-register-as';

export default ConfigRegisterAs({
  token: 'app',
  configFactory: () => ({
    name: process.env.APP_NAME || 'Xanpool Assignment',
    coreCount: process.env.APP_CORE || '2',
    host: process.env.HOST,
    port: parseInt(process.env.PORT || '3000'),
    nodeEnv: process.env.NODE_ENV || 'dev',
    swaggerEnabled: process.env.SWAGGER_ENABLED,
    httpTimeout: parseInt(process.env.HTTP_TIMEOUT || '10000'),
    httpRetryAttempts: parseInt(process.env.HTTP_RETRY_ATTEMPTS || '5'),
    fixerApiUrl: process.env.FIXER_API_URL || 'https://api.apilayer.com/fixer/',
    fixerApiKey:
      process.env.FIXER_API_KEY || 'qXHa5NgX88PMoD8tFHP6ygeWOO3cqpK2',
    redisHost: process.env.REDIS_HOST || '127.0.0.1',
    redisPort: parseInt(process.env.REDIS_PORT || '6379'),
  }),
  validationSchema: Joi.object().keys({
    name: Joi.string().required(),
    coreCount: Joi.number().required().min(1).max(4),
    host: Joi.string(),
    port: Joi.number(),
    nodeEnv: Joi.string(),
    swaggerEnabled: Joi.boolean(),
    httpTimeout: Joi.number(),
    httpRetryAttempts: Joi.number(),
    fixerApiUrl: Joi.string(),
    fixerApiKey: Joi.string(),
    redisHost: Joi.string(),
    redisPort: Joi.number(),
  }),
  validationOptions: {
    convert: true,
  },
});
