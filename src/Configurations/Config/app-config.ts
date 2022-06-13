import * as Joi from 'joi';
import { ConfigRegisterAs } from './config-register-as';

export default ConfigRegisterAs({
  token: 'app',
  configFactory: () => ({
    name: process.env.APP_NAME || 'Xanpool Assignment',
    coreCount: process.env.APP_CORE || '2',
    port: parseInt(process.env.PORT || '3000'),
    nodeEnv: process.env.NODE_ENV || 'dev',
    swaggerEnabled: process.env.SWAGGER_ENABLED || true,
    fixerApiUrl: process.env.FIXER_API_URL || 'https://api.apilayer.com/fixer/',
    fixerApiKey:
      process.env.FIXER_API_KEY || 'bH5OwqsNom8ECmuPERwzAesYk80sx2pd',
  }),
  validationSchema: Joi.object().keys({
    name: Joi.string().required(),
    coreCount: Joi.number().required().min(1).max(4),
    port: Joi.number(),
    nodeEnv: Joi.string(),
    swaggerEnabled: Joi.boolean(),
    fixerApiUrl: Joi.string(),
    fixerApiKey: Joi.string(),
  }),
  validationOptions: {
    convert: true,
  },
});
