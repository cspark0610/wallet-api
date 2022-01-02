import { MovementService } from './movement.service';
import { MovementMockRepository } from './repositories/impl/mock/movement.repository';
import { BalanceMockRepository } from './repositories/impl/mock/balance.repository';
import { MovementCreateDto } from '../dtos/movement.dto';
import assert = require('assert');

// necesito la instancia de la clase MovementService
const movementService = new MovementService(new MovementMockRepository(), new BalanceMockRepository());
const fakeIncome: MovementCreateDto = {
	user_id: 1,
	type: 0,
	amount: 250,
};
const fakeOutcome: MovementCreateDto = {
	user_id: 1,
	type: 1,
	amount: 250,
};
const fakeOutcome2: MovementCreateDto = {
	user_id: 1,
	type: 1,
	amount: 5000,
};
const fakeMovement: MovementCreateDto = {
	user_id: 1,
	type: 999,
	amount: 250,
};
describe('MovementService', () => {
	describe('Store method', () => {
		it('tries to register an income movement', async () => {
			await movementService.store(fakeIncome);
		});
		it('tries to register an outcome movement', async () => {
			await movementService.store(fakeOutcome);
		});
		it('should throw an error if user tries to register an outcome movement with insufficient balance', async () => {
			try {
				await movementService.store(fakeOutcome2);
			} catch (error) {
				console.log(error);
				assert.equal(error, { message: 'Not enough balance' });
			}
		});
		xit('should throw an error tries to register an unexpected movement of type unknwon', async () => {
			try {
				await movementService.store(fakeMovement);
			} catch (error) {
				assert.equal(error, { message: 'Invalid movement type supplied' });
			}
		});
	});
});
