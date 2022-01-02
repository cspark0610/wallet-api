import { MovementType } from '../common/enums/movement.type';
import { ApplicationException } from '../common/exceptions/application.exception';
import { MovementCreateDto } from '../dtos/movement.dto';
import { BalanceRepository } from './repositories/balance.repository';
import { Balance } from './repositories/domain/balance';
import { Movement } from './repositories/domain/movement';
import { MovementRepository } from './repositories/movement.repository';
export class MovementService {
	constructor(private movementRepository: MovementRepository, private balanceRepository: BalanceRepository) {}

	public async find(id: number): Promise<Movement | null> {
		return await this.movementRepository.find(id);
	}
	public async all(): Promise<Movement[]> {
		return await this.movementRepository.all();
	}

	public async store(entry: MovementCreateDto): Promise<void> {
		// la logica para guardar un movimiento dependera de su enum MovementType
		// si es un income se debe sumar al balance, es decir actualizarlo
		// si es un outcome se debe restar al balance, es decir actualizarlo

		//1. trare mi balance actual asociado al user_id
		const currentBalance = await this.balanceRepository.findByUserId(entry.user_id);
		//2. crear un nuevo movimiento de acuerdo al enum MovementType
		if (entry.type === MovementType.income) {
			this.income(entry, currentBalance);
		} else if (entry.type === MovementType.outcome) {
			this.outcome(entry, currentBalance);
		} else {
			throw new ApplicationException('Invalid movement type supplied');
		}
	}

	private async income(entry: MovementCreateDto, balance: Balance | null) {
		//si no tenemos balance, entonces seteamos uno de acurde a su entry
		if (balance === null) {
			await this.balanceRepository.store({
				user_id: entry.user_id,
				amount: entry.amount,
			} as unknown as Balance);
		} else {
			//incrementar nuestro monto actual
			balance.amount += entry.amount;
			//luego hacer el update
			await this.balanceRepository.update(balance);

			//finalmente guardamos el movimiento usando movementRepository
			await this.movementRepository.store(entry as unknown as Movement);
		}
	}

	private async outcome(entry: MovementCreateDto, balance: Balance | null) {
		if (balance === null || balance.amount < entry.amount) {
			//si es user quiere hacer un retiro de dinero hay que chequear primero que tenga balance o saldo suficiente O si lo que quiere retirar es decir entry.amount es mayor al balance o saldo disponible se lanzara un error
			throw new ApplicationException('Not enough balance');
		} else {
			//decrementar nuestro saldo o balance actual
			balance.amount -= entry.amount;
			//luego hacer el update
			await this.balanceRepository.update(balance);

			//finalmente guardamos el movimiento usando movementRepository, se crea un nuevo movimiento aqui
			await this.movementRepository.store(entry as unknown as Movement);
		}
	}
}
