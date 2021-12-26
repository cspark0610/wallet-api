import mysql from 'mysql2';
import { createPool } from 'mysql2/promise';
//para user await query() sin pasar una cb dentro de la funcoin

//usar createPool en vez de usar createConnection que solo se comporta como un singleton

//instancia a la conexion a la db
export default mysql.createPool({
	host: process.env.db_mysql_host,
	user: process.env.db_mysql_user,
	password: process.env.db_mysql_password,
	database: process.env.db_mysql_kodoti_wallet,
	port: Number(process.env.db_mysql_port),
	decimalNumbers: true,
});
