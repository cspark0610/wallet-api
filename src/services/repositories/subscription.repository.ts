import { Subscription } from './domain/subscription';

//expongo la interfaz como contrato y hago el implements en la clase del repositorio correspondiente
export interface SubscriptionRepository {
	all(): Promise<Subscription[]>;
	find(id: Number): Promise<Subscription | null>;
	store(entry: Subscription): Promise<void>;
	update(entry: Subscription): Promise<void>;
	remove(id: Number): Promise<void>;
	findByUserAndCode(user_id: Number, code: string): Promise<Subscription | null>;
}
