import { Router } from 'express';
import * as pessengerController from '../controller/passengerController';
import validateRequest from '../middlewares/validateRequest';
import { PassengerSchema } from '../middlewares/passenger.validation';

const pessengerRouter = Router();

pessengerRouter.post(
  '/',
  validateRequest(PassengerSchema),
  pessengerController.createPassenger
);

pessengerRouter.get('/', pessengerController.getAllPassenger);

pessengerRouter.get('/:id', pessengerController.getPassengerById);

pessengerRouter.put(
  '/:id',
  validateRequest(PassengerSchema),
  pessengerController.updatePassenger
);

export default pessengerRouter;
