export interface Balance {
	id: string;
	user_id: string;
	amount: number;
	created_at: Date | null;
	updated_at: Date | null;
}
