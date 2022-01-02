// vamos a crear un objeto que simule ser nuestar base de datos que persista en nuestra memoria

export const mock_db = {
	balance: [
		{ id: 1, user_id: 1, amount: 100 },
		{ id: 2, user_id: 2, amount: 100 },
		{ id: 2, user_id: 3, amount: 100 },
	],
	movements: [],
	subscriptions: [],
	_balanceId: 0,
	_movementId: 0,
	_subscriptionId: 0,
};

mock_db._balanceId = mock_db.balance.length;

console.log('mock_db', mock_db);
