// Recently stumbled upon some articles about if exceptions are even really necessary.
// I will use them here, but is an interesting take

export default class InvalidArgumentException extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
  }
}
