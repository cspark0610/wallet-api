import { Subscription } from './repositories/domain/subscription';
import { SubscriptionRepository } from './repositories/subscription.repository';
import { ApplicationException } from '../common/exceptions/application.exception';

import { SubscriptionCreateDto, SubscriptionUpdateDto } from '../dtos/subscription.dto';

export class SubscriptionService {
	//PARA EL TIPADO USAR LA INTERFAZ CREADA NO LA CLASE !!!
	constructor(private readonly subscriptionRepository: SubscriptionRepository) {}
	public async find(id: number): Promise<Subscription | null> {
		return await this.subscriptionRepository.find(id);
	}
	public async all(): Promise<Subscription[]> {
		return await this.subscriptionRepository.all();
	}

	public async store(entry: SubscriptionCreateDto): Promise<void> {
		const originalEntry = await this.subscriptionRepository.findByUserAndCode(entry.user_id, entry.code);
		if (!originalEntry) {
			// OJO EL PARAMETRO DE ENTRY TIENE Q SER CASTEADO SEGUN EL METODO DEL REPOSITORIO STORE
			await this.subscriptionRepository.store(entry as Subscription);
		} else {
			//lanzar una excepcion segun las reglas del negocio
			throw new ApplicationException('User already subscribed');
		}
	}
	public async update(id: Number, entry: SubscriptionUpdateDto): Promise<void> {
		let originalEntry = await this.subscriptionRepository.find(id);
		if (originalEntry) {
			//pisar el entry encontrado con los nuevios valores provenientes del updateDto
			originalEntry.code = entry.code;
			originalEntry.amount = entry.amount;
			originalEntry.cron = entry.cron;
		} else {
			throw new ApplicationException('Subscription not found');
		}
	}
	public async remove(id: Number): Promise<void> {}
}
