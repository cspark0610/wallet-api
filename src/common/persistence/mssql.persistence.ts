import { ConnectionPool } from 'mssql';

//usar createPool en vez de usar createConnection que solo se comporta como un singleton

//instancia a la conexion a la db
let config = {
	server: process.env.db_mssql_server as string,
	database: process.env.db_mssql_database as string,
	user: process.env.db_mssql_user as string,
	password: process.env.db_mssql_password as string,
	options: {
		enableArithAbort: true,
	},
};

export default new ConnectionPool(config).connect();
