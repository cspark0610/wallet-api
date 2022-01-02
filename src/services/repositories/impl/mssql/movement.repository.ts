import { Movement } from '../../domain/movement';
import { MovementRepository } from '../../movement.repository';
import connector from '../../../../common/persistence/mssql.persistence';

export class MovementMSSQLRepository implements MovementRepository {
	public async find(id: number): Promise<Movement | null> {
		const pool = await connector;
		//para evitar inyection sql llamrlo asi sanitiza las variables
		const result = await pool.query`SELECT * FROM wallet_movement WHERE id = ${id}`;
		if (result.rowsAffected) {
			return result.recordset[0] as Movement;
		}
		return null;
	}
	public async all(): Promise<Movement[]> {
		const pool = await connector;
		const result = await pool.query`SELECT * FROM wallet_movement ORDER BY id DESC`;
		return result.recordset;
	}

	public async store(entry: Movement): Promise<void> {
		const pool = await connector;
		const now = new Date();
		await pool.query`INSERT INTO wallet_movement(user_id, type, amount, created_at) 
					VALUES(${entry.user_id}, ${entry.type}, ${entry.amount}, ${now})`;
	}
	public async update(entry: Movement): Promise<void> {
		const pool = await connector;
		const now = new Date();
		await pool.query`UPDATE wallet_movement 
		SET user_id = ${entry.user_id}, 
				type = ${entry.type}, 
				amount = ${entry.amount}, 
				created_at = ${now} 
		WHERE id = ${entry.id}`;
	}

	public async remove(id: number): Promise<void> {
		const pool = await connector;
		await pool.query`DELETE FROM wallet_movement WHERE id = ${id}`;
	}
}
