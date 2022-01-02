import { app } from './app';

//aca se levanta el servidor
const PORT = Number(process.env.PORT) || 3000;
app.listen(PORT, () => {
	console.log(`Servidor corriendo en el puerto ${PORT}`);
});
