const uuid = require('uuid/v4');

export default class Uuid {
  
  private value: string;

  constructor(value: string) {
    this.value = value;
  }

  getValue(): string {
    return this.value;
  }

  static generate(): Uuid {
    return new Uuid(uuid());
  }

}
