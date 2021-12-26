import { DELETE, GET, POST, PUT, route } from 'awilix-express';
import { Request, Response } from 'express';
import { BaseController } from '../common/controllers/base.controller';
import { SubscriptionCreateDto, SubscriptionUpdateDto } from '../dtos/subscription.dto';
import { SubscriptionService } from '../services/subscription.service';

@route('/subscriptions')
export class SubscriptionController extends BaseController {
	constructor(private readonly subscriptionService: SubscriptionService) {
		//COMO AHORA ESTA CLASE HEREDA LOS METODOS DE BASECONTROLLER SI O SI DEBO PONER SUPER()
		//CON SUPER() ESTOY INCIALIZANDO EL CONSTRUCTOR DE BASECONTROLLER DENTRO DE ESTA CLASE
		super();
	}
	@GET()
	public async all(req: Request, res: Response) {
		try {
			res.send(await this.subscriptionService.all());
		} catch (error) {
			this.handleException(error, res);
		}
	}

	//ex: subscriptions/1
	@route('/:id')
	@GET()
	public async find(req: Request, res: Response) {
		try {
			const id = Number(req.params.id);
			const result = await this.subscriptionService.find(id);
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
			await this.subscriptionService.store({
				user_id: req.body.user_id,
				code: req.body.code,
				amount: req.body.amount,
				cron: req.body.cron,
			} as SubscriptionCreateDto);
			res.send();
		} catch (error) {
			this.handleException(error, res);
		}
	}

	@route('/:id')
	@PUT()
	public async update(req: Request, res: Response) {
		try {
			const id = Number(req.params.id);
			await this.subscriptionService.update(id, {
				code: req.body.code,
				amount: req.body.amount,
				cron: req.body.cron,
			} as SubscriptionUpdateDto);
			res.send();
		} catch (error) {
			this.handleException(error, res);
		}
	}

	@route('/:id')
	@DELETE()
	public async remove(req: Request, res: Response) {
		try {
			const id = Number(req.params.id);
			await this.subscriptionService.remove(id);
			res.send();
		} catch (error) {
			this.handleException(error, res);
		}
	}
}
