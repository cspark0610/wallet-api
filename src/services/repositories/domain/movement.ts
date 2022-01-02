import { MovementType } from '../../../common/enums/movement.type';

export interface Movement {
	id: string;
	user_id: string;
	type: MovementType;
	amount: number;
	created_at: Date | null;
	updated_at: Date | null;
}

// type voy a usar un enum
