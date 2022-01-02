import { asClass, createContainer } from 'awilix';
import { TestService } from './src/services/test.service';
import express = require('express');
import { scopePerRequest } from 'awilix-express';
import { SubscriptionMySQLRepository } from './src/services/repositories/impl/mysql/subscription.repository';
import { MovementMySQLRepository } from './src/services/repositories/impl/mysql/movement.repository';
import { BalanceMySQLRepository } from './src/services/repositories/impl/mysql/balance.repository';
import { SubscriptionService } from './src/services/subscription.service';
import { MovementService } from './src/services/movement.service';
import { SubscriptionMSSQLRepository } from './src/services/repositories/impl/mssql/subscription.repository';
import { MovementMSSQLRepository } from './src/services/repositories/impl/mssql/movement.repository';
import { BalanceMSSQLRepository } from './src/services/repositories/impl/mssql/balance.repository';
//debo exportar el container para usar

export default (app: express.Application) => {
	const container = createContainer({
		injectionMode: 'CLASSIC',
	});

	//registrar las depencencias, es decir los repositorios y los services
	container.register({
		// // register repositories
		// subscriptionRepository: asClass(SubscriptionMySQLRepository).scoped(),
		// movementRepository: asClass(MovementMySQLRepository).scoped(),
		// balanceRepository: asClass(BalanceMySQLRepository).scoped(),

		subscriptionRepository: asClass(SubscriptionMSSQLRepository).scoped(),
		movementRepository: asClass(MovementMSSQLRepository).scoped(),
		balanceRepository: asClass(BalanceMSSQLRepository).scoped(),
		// register your services here
		testService: asClass(TestService).scoped(),
		subscriptionService: asClass(SubscriptionService).scoped(),
		movementService: asClass(MovementService).scoped(),
	});

	// use services
	app.use(scopePerRequest(container));
};

//export { container };
