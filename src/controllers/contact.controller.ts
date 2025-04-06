import { Request, Response } from "express";
import { createContactService, editContactService, listContactsService, deleteContactService } from '../services/contact.service';
import { contactSchema } from "../domain/entities/contact.entity";
import { ZodError } from "zod";

export const createContactController = async (request: Request, response: Response): Promise<void> => {
  try {
    const { nome, telefone } = contactSchema.parse(request.body);
    const result = await createContactService({ nome, telefone });
    response.status(201).json(result);
  } catch (error) {
    if (error instanceof ZodError) {
      response.status(400).json({ errors: error.errors });
      return;
    }
    if (error instanceof Error) {
      response.status(409).json({ message: error.message });
      return;
    }
    response.status(500).json({ message: 'Erro ao criar contato' });
    return;
  }
}

export const lisContactsController = async (request: Request, response: Response) => {
  try {
    const result = await listContactsService();
    response.status(200).json(result);
  } catch (error) {
    if (error instanceof ZodError) {
      response.status(400).json({ errors: error.errors });
      return;
    }
    response.status(500).json({ message: 'Erro ao listar contatos' });
    return;
  }
}

export const editContactController = async (request: Request, response: Response): Promise<void> => {
  const { id } = request.params;

  try {
    const { nome, telefone } = contactSchema.parse(request.body);
    const result = await editContactService({
      id: Number(id),
      data: {
        nome,
        telefone
      }
    });
    response.status(200).json(result);
    return;
  } catch (error) {
    if (error instanceof ZodError) {
      response.status(400).json({ errors: error.errors })
      return;
    };
    if (error instanceof Error) {
      response.status(409).json({ message: error.message });
      return;
    }
    response.status(500).json({ message: 'Erro ao editar contato' });
    return;
  }
}

export const deleteContactController = async (request: Request, response: Response): Promise<void> => {
  const { id } = request.params;

  try {
    await deleteContactService(Number(id));
    response.status(204).send();
    return;
  } catch (error) {
    if (error instanceof ZodError) {
      response.status(400).json({ errors: error.errors })
      return;
    };
    if (error instanceof Error) {
      response.status(409).json({ message: error.message });
      return;
    }
    response.status(500).json({ message: 'Erro ao deletar contato' });
    return;
  }
}
