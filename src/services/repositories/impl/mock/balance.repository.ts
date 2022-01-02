import { BalanceRepository } from '../../balance.repository';
import { Balance } from '../../domain/balance';
import { mock_db } from '../../../../common/persistence/mock.persistence';

export class BalanceMockRepository implements BalanceRepository {
	public async find(id: number): Promise<Balance | null> {
		const table = mock_db.balance as unknown as Balance[];
		const result: Balance | undefined = table.find((row) => row.id === id.toString());
		if (result) {
			return Object.assign({}, { ...result });
		}
		return null;
	}
	public async findByUserId(userId: number): Promise<Balance | null> {
		const table = mock_db.balance as unknown as Balance[];
		const result: Balance | undefined = table.find((row) => row.user_id === userId.toString());
		if (result) {
			return Object.assign({}, { ...result });
		}
		return null;
	}
	public async all(): Promise<Balance[]> {
		const table = mock_db.balance as unknown as Balance[];
		return Object.assign([], [...table]);
	}
	public async store(entry: Balance): Promise<void> {
		const now = new Date();
		const table = mock_db.balance as unknown as Balance[];
		mock_db._balanceId++;
		table.push({
			id: mock_db._balanceId,
			user_id: entry.user_id,
			amount: entry.amount,
			created_at: now,
			updated_at: null,
		} as unknown as Balance);
	}

	public async update(entry: Balance): Promise<void> {
		const now = new Date();
		const table = mock_db.balance as unknown as Balance[];
		const originalEntry = table.find((row) => row.id === entry.id);

		const updatedEntry = {
			user_id: entry.user_id,
			amount: entry.amount,
			updated_at: now,
		};
		if (originalEntry) Object.assign(originalEntry, updatedEntry);
	}
	public async remove(id: number): Promise<void> {
		const table = mock_db.balance as unknown as Balance[];
		mock_db.balance = table.filter((row) => row.id !== id.toString()) as any;
	}
}
