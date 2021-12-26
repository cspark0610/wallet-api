import { asClass, createContainer } from 'awilix';
import { TestService } from './src/services/test.service';
import express = require('express');
import { scopePerRequest } from 'awilix-express';
import { SubscriptionMySQLRepository } from './src/services/repositories/impl/mysql/subscription.repository';
import { SubscriptionService } from './src/services/subscription.service';
//debo exportar el container para usar

export default (app: express.Application) => {
	const container = createContainer({
		injectionMode: 'CLASSIC',
	});

	container.register({
		// register repositories
		subscriptionRepository: asClass(SubscriptionMySQLRepository).scoped(),
		// register your services here
		testService: asClass(TestService).scoped(),
		subscriptionService: asClass(SubscriptionService).scoped(),
	});

	// use services
	app.use(scopePerRequest(container));
};

//export { container };
