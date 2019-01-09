const assert = require('assert');

module.exports = class EndpointStatus {

  id: string;
  host: string;
  address: string;
  name: string;
  time: number;
  updated: Date;

  constructor(id, host, address, name, time, updated) {
    assert(id, 'The id is mandatory');
    assert(host, 'The host is mandatory');
    assert(name, 'The name is mandatory');

    this.id = id;
    this.host = host;
    this.address = address || '';
    this.name = name;
    this.time = time;
    this.updated = updated;
  }

  getId() { return this.id; }
  getHost() { return this.host; }
  getAddress() { return this.address; }
  getName() { return this.name; }
  getTime() { return this.time; }
  getUpdated() { return this.updated; }

  getStatus() { 
    return this.time ? Statuses.UP : Statuses.DOWN;
  }

  isAlive() {
    return this.getStatus() === Statuses.UP;
  }

  updateFromPing({ time, address }) {
    this.address = address || '';
    this.time = time;
    this.updated = new Date();
  }

}

const Statuses = {
  UP: Symbol('up'),
  DOWN: Symbol('down')
};

module.exports.Statuses = Statuses;
