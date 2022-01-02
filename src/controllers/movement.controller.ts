import { GET, POST, route } from 'awilix-express';
import { Request, Response } from 'express';
import { BaseController } from '../common/controllers/base.controller';
import { MovementCreateDto } from '../dtos/movement.dto';
import { MovementService } from '../services/movement.service';

@route('/movements')
export class MovementController extends BaseController {
	constructor(private readonly movementService: MovementService) {
		//COMO AHORA ESTA CLASE HEREDA LOS METODOS DE BASECONTROLLER SI O SI DEBO PONER SUPER()
		//CON SUPER() ESTOY INCIALIZANDO EL CONSTRUCTOR DE BASECONTROLLER DENTRO DE ESTA CLASE
		super();
	}
	@GET()
	public async all(req: Request, res: Response) {
		try {
			res.send(await this.movementService.all());
		} catch (error) {
			this.handleException(error, res);
		}
	}

	//ex: movements/1
	@route('/:id')
	@GET()
	public async find(req: Request, res: Response) {
		try {
			const id = Number(req.params.id);
			const result = await this.movementService.find(id);
			if (result) {
				res.send(result);
			} else {
				res.status(404).send();
			}
			res.send();
		} catch (error) {
			this.handleException(error, res);
		}
	}

	@POST()
	public async store(req: Request, res: Response) {
		console.log(req.body);
		try {
			await this.movementService.store({
				user_id: req.body.user_id,
				type: req.body.type,
				amount: req.body.amount,
			} as MovementCreateDto);
			res.send();
		} catch (error) {
			this.handleException(error, res);
		}
	}
}
