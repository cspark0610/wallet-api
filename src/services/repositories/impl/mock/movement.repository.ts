import { Movement } from '../../domain/movement';
import { MovementRepository } from '../../movement.repository';
import { mock_db } from '../../../../common/persistence/mock.persistence';

export class MovementMockRepository implements MovementRepository {
	public async find(id: number): Promise<Movement | null> {
		const table = mock_db.movements as Movement[];
		const result = table.find((row) => row.id === id.toString());
		if (result) {
			//porque quiero deshacer la mutabilidad del object de movements
			return Object.assign({}, { ...result });
		}
		return null;
	}
	public async all(): Promise<Movement[]> {
		const table = mock_db.movements as Movement[];
		return Object.assign([], [...table]);
	}

	public async store(entry: Movement): Promise<void> {
		const now = new Date();
		const table = mock_db.movements as Movement[];

		mock_db._movementId++;
		table.push({
			id: mock_db._movementId,
			user_id: entry.user_id,
			type: entry.type,
			amount: entry.amount,
			created_at: now,
			updated_at: null,
		} as unknown as Movement);
	}
	public async update(entry: Movement): Promise<void> {
		const table = mock_db.movements as Movement[];
		const now = new Date();
		const originalEntry = table.find((row) => row.id === entry.id);

		if (originalEntry) {
			// actualizacion campo a campo
			originalEntry.user_id = entry.user_id;
			originalEntry.type = entry.type;
			originalEntry.amount = entry.amount;
			originalEntry.updated_at = now;
		}
	}

	public async remove(id: number): Promise<void> {
		const table = mock_db.movements as Movement[];
		// el filter no es mutable!! por eso debo pisar mock_db.movements!! con el producto de lo operacion del filter
		mock_db.movements = table.filter((row) => row.id !== id.toString()) as any;
	}
}
