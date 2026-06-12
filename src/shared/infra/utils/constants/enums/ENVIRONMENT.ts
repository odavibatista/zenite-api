/**
 * Enum que representa os ambientes suportados pela aplicação.
 *
 * Utilizado para tipar e validar a variável de ambiente `NODE_ENV`.
 */
export enum Environment {
  DEVELOPMENT = 'development',
  PRODUCTION = 'production',
  TEST = 'test',
  LOCAL = 'local',
}
