import express, { NextFunction, Request, Response } from 'express';
import { createContactController, lisContactsController, editContactController, deleteContactController } from '../controllers/contact.controller';
import { contactSchema } from '../domain/entities/contact.entity';
import { ZodError } from 'zod';

const router = express.Router();

router.post(
  '/',
  (req: Request, response: Response, next: NextFunction) => {
    try {
      contactSchema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.errors.map((issue: any) => ({
          message: `${issue.path.join('.')} is ${issue.message}`,
        }))
        response.status(404).json({ error: 'Invalid data', details: errorMessages });
      } else {
        response.status(500).json({ error: 'Internal Server Error' });
      }
    }
  },
  createContactController
);

router.get('/', lisContactsController);

router.patch(
  '/:id',
  (req: Request, response: Response, next: NextFunction) => {
    try {
      contactSchema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.errors.map((issue: any) => ({
          message: `${issue.path.join('.')} is ${issue.message}`,
        }))
        response.status(404).json({ error: 'Invalid data', details: errorMessages });
      } else {
        response.status(500).json({ error: 'Internal Server Error' });
      }
    }
  },
  editContactController
);

router.delete('/:id', deleteContactController);

export default router