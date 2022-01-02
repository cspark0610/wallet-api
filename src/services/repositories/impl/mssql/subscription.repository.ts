import connector from '../../../../common/persistence/mssql.persistence';
import { Subscription } from '../../domain/subscription';
import { SubscriptionRepository } from '../../subscription.repository';

export class SubscriptionMSSQLRepository implements SubscriptionRepository {
	public async all(): Promise<Subscription[]> {
		const pool = await connector;
		const result = await pool.query`SELECT * FROM wallet_subscription ORDER BY id DESC`;
		return result.recordsets[0] as Subscription[];
	}

	public async find(id: Number): Promise<Subscription | null> {
		const pool = await connector;
		const result = await pool.query`SELECT * FROM wallet_subscription WHERE id = ${id}`;
		if (result.rowsAffected) {
			return result.recordset[0] as Subscription;
		}
		return null;
	}

	public async store(entry: Subscription): Promise<void> {
		const now = new Date();
		const pool = await connector;
		await pool.query`
		INSERT INTO wallet_subscription(user_id, code, amount, cron, created_at) 
		VALUES(${entry.user_id}, ${entry.code}, ${entry.amount}, ${entry.cron}, ${now})`;
	}

	public async update(entry: Subscription): Promise<void> {
		const now = new Date();
		const pool = await connector;

		await pool.query`
		UPDATE wallet_subscription 
		SET user_id = ${entry.user_id}, 
				code = ${entry.code}, 
				amount = ${entry.amount}, 
				cron = ${entry.cron}, 
				updated_at = ${now} 
		WHERE id = ${entry.id}`;
	}

	public async remove(id: Number): Promise<void> {
		const pool = await connector;
		await pool.query`DELETE wallet_subscription WHERE id = ${id}`;
	}

	public async findByUserAndCode(user_id: Number, code: string): Promise<Subscription | null> {
		const pool = await connector;
		const result = await pool.query`SELECT * FROM wallet_subscription WHERE user_id = ${user_id} AND code = ${code}`;
		if (result.rowsAffected) {
			return result.recordset[0] as Subscription;
		}
		return null;
	}
}
