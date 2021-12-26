process.env.NODE_ENV = process.env.NODE_ENV || 'development';
process.env.APP_ENV = process.env.APP_ENV || 'development';

import express = require('express');
import dotenv = require('dotenv');
import { loadControllers } from 'awilix-express';
import loadContainer from './container';
//import { TestService } from './src/services/test.service';
dotenv.config({
	path: `${__dirname}/../config/${process.env.APP_ENV}.env`,
});

//console.log(process.env.APP_FOO);

const app: express.Application = express();

//const testService = container.resolve<TestService>('testService');
//console.log('testService', testService.get());

// LOAD container
loadContainer(app);

// LOAD controllers
app.use(loadControllers('src/controllers/*.ts', { cwd: __dirname }));

export { app };
