import { z } from "zod";

export const contactSchema = z.object({
  nome: z.string({
    message: "Nome deve ser uma string valida"
  }).refine((value) => {
    const words = value.split(" ");

    if (words.length < 2) return false;

    return words.every(word => word.length >= 3);
  }, {
    message: "Nome deve conter nome e sobrenome (mínimo 3 letras)",
  }),
  telefone: z.string({
    description: "Telefone deve conter DDD + 9 digitos, exemplo: 5567999999999"
  }).min(13, {
    message: "Telefone deve conter no mínimo 13 digitos (DDD + 9 digitos)",
  }).max(13, {
    message: "Telefone deve conter no máximo 13 digitos (DDD + 9 digitos)"
  }),
})

export type Contact = z.infer<typeof contactSchema>