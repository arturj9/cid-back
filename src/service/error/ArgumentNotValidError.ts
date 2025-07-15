export class ArgumentNotValidError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ArgumentNotValidError';
  }
}