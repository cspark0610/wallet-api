import { BalanceRepository } from '../../balance.repository';
import { Balance } from '../../domain/balance';
import connector from '../../../../common/persistence/mssql.persistence';

export class BalanceMSSQLRepository implements BalanceRepository {
	public async find(id: number): Promise<Balance | null> {
		const pool = await connector;
		const result = await pool.query`SELECT * FROM wallet_balance WHERE id = ${id}`;
		if (result.rowsAffected) {
			return result.recordset[0] as Balance;
		}
		return null;
	}
	public async findByUserId(userId: number): Promise<Balance | null> {
		const pool = await connector;

		const result = await pool.query`SELECT * FROM wallet_balance WHERE user_id = ${userId}`;
		if (result.rowsAffected) {
			return result.recordset[0] as Balance;
		}
		return null;
	}
	public async all(): Promise<Balance[]> {
		const pool = await connector;
		const result = await pool.query`SELECT * FROM wallet_balance ORDER BY id DESC`;
		return result.recordset[0];
	}
	public async store(entry: Balance): Promise<void> {
		const now = new Date();
		const pool = await connector;
		await pool.query`INSERT INTO wallet_balance(user_id, amount, created_at) 
		VALUES(${entry.user_id}, ${entry.amount}, ${now})`;
	}

	public async update(entry: Balance): Promise<void> {
		const now = new Date();
		const pool = await connector;
		await pool.query`UPDATE wallet_balance 
		SET user_id = ${entry.user_id}, 
				amount = ${entry.amount}, 
				created_at = ${now} WHERE id = ${entry.id}`;
	}
	public async remove(id: number): Promise<void> {
		const pool = await connector;
		await pool.query`DELETE FROM wallet_balance WHERE id = ${id}`;
	}
}
