process.env.NODE_ENV = process.env.NODE_ENV || 'development';
process.env.APP_ENV = process.env.APP_ENV || 'development';
//import { TestService } from './src/services/test.service';
//const testService = container.resolve<TestService>('testService');
//console.log('testService', testService.get());

import express = require('express');
import dotenv = require('dotenv');
import { loadControllers } from 'awilix-express';
import loadContainer from './container';
import cors = require('cors');

dotenv.config({
	path: `${__dirname}/../config/${process.env.APP_ENV}.env`,
});

const app: express.Application = express();
//json support
app.use(express.json());
//cors support
app.use(cors());

// LOAD container
loadContainer(app);

// LOAD controllers
app.use(loadControllers('src/controllers/*.ts', { cwd: __dirname }));

export { app };
