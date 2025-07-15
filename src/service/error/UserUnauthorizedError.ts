export class UserUnauthorizedError extends Error {
  constructor(message = 'Usuario não é autorizado a realizar essa ação') {
    super(message);
    this.name = 'UserUnauthorizedError';
  }
}