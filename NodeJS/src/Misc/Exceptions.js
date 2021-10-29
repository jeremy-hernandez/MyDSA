export { InvalidArgumentException };

class InvalidArgumentException extends Error {
  constructor(message, arg = '') {
    super(message);
    this.name = 'InvalidArgumentException';
    this.invalid_argument = arg;
  }
}
