import { GET, route } from 'awilix-express';
import { Request, Response } from 'express';
import { TestService } from '../services/test.service';

@route('/')
export class DefaultController {
	constructor(private readonly testService: TestService) {}
	@GET()
	public index(req: Request, res: Response): void {
		res.send({
			NODE_ENV: process.env.NODE_ENV,
			APP_ENV: process.env.APP_ENV,
		});
	}
}
