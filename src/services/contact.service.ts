import { Contact } from "../domain/entities/contact.entity";
import { prisma } from "../util/prisma.util";

export const createContactService = async ({ nome, telefone }: Contact) => {
  const contactExists = await prisma.contact.findUnique({
    where: {
      telefone: telefone
    },
    select: {
      telefone: true
    }
  });

  if (contactExists) throw new Error("Este contato já foi salvo.");

  const contact = await prisma.contact.create({
    data: {
      nome,
      telefone
    },
    select: {
      id: true,
      nome: true,
      telefone: true
    }
  })

  return contact;
};

export const listContactsService = async () => {
  const contacts = await prisma.contact.findMany({
    orderBy: {
      createdAt: 'desc'
    },
    select: {
      id: true,
      nome: true,
      telefone: true
    }
  })

  return contacts;
};


type editContactServiceProps = {
  id: number;
  data: Contact
}

export const editContactService = async ({ id, data }: editContactServiceProps) => {
  const contactExists = await prisma.contact.findUnique({
    where: {
      id
    },
    select: {
      id: true,
      telefone: true
    }
  });

  if (!contactExists) throw new Error("Este contato não existe.");

  const numberExists = await prisma.contact.findUnique({
    where: {
      telefone: data.telefone
    },
    select: {
      telefone: true
    }
  });

  if(numberExists) throw new Error("Este contato já foi salvo.")

  return await prisma.contact.update({
    where: {
      id
    },
    data,
    select: {
      nome: true,
      telefone: true
    }
  })
};

export const deleteContactService = async (id: number) => {
  const contactExists = await prisma.contact.findUnique({
    where: {
      id
    },
    select: {
      id: true
    }
  });

  if (!contactExists) throw new Error("Este contato não existe.");

  const contact = await prisma.contact.delete({
    where: {
      id
    }
  });

  return contact;
};