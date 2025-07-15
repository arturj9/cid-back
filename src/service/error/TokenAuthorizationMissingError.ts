export class TokenAuthorizationMissingError extends Error {
  constructor() {
    super('Sem o token de autorização');
    this.name = 'TokenAuthorizationMissingError';
  }
}