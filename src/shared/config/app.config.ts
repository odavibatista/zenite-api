import 'dotenv/config';

import z, { ZodError } from 'zod';
import { EnvironmentException } from '../domain/errors/Environment.exception';
import { Environment } from '../infra/utils/constants/enums/ENVIRONMENT';

const appConfigurationsSchema = z.object({
  // Configurações de conexão com banco de dados (principal e shadow).
  DATABASE_URL: z.string().min(1),

  // Porta de execução da API e ambiente (NODE_ENV).
  PORT: z.number(),

  // Ambiente da aplicação
  NODE_ENV: z.enum(Environment).default(Environment.DEVELOPMENT),

  // Chave de API para autenticação e autorização (exemplo, pode ser JWT_SECRET ou similar).
  API_KEY: z.string(),
});

let appConfigurations: z.infer<typeof appConfigurationsSchema>;

try {
  appConfigurations = appConfigurationsSchema.parse({
    DATABASE_URL: process.env.DATABASE_URL,

    PORT: Number(process.env.PORT),

    NODE_ENV: process.env.NODE_ENV,

    API_KEY: process.env.API_KEY,
  });
} catch (error) {
  // Em caso de erro durante o parse/validação:
  //  - loga o erro no console;
  //  - se for um ZodError, encapsula em EnvironmentException para tratamento mais explícito.
  console.log(error);
  // Se o erro for de validação do Zod, lança uma exceção específica de ambiente inválido.
  if (error instanceof ZodError) {
    throw new EnvironmentException(error);
  }
}

export { appConfigurations };
