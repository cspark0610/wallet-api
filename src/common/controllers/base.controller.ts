import { Response } from 'express';
import { ApplicationException } from '../exceptions/application.exception';

export abstract class BaseController {
	// make a generic method that hanldes clients exceptions
	handleException(err: any, res: Response) {
		if (err instanceof ApplicationException) {
			res.status(400);
			res.send();
		} else {
			throw new Error(err);
		}
	}
}

//esta clase va a ser extendidda "extends" por la clase SubscriptionController
