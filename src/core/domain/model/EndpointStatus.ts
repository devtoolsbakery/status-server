const assert = require('assert');

export default class EndpointStatus {

  id: string;
  username: string;
  host: string;
  address: string;
  name: string;
  time: number;
  updated: Date;

  constructor(id, username, host, address, name, time, updated) {
    assert(id, 'The id is mandatory');
    assert(username, 'The username is mandatory');
    assert(host, 'The host is mandatory');
    assert(name, 'The name is mandatory');

    this.id = id;
    this.username = username;
    this.host = host;
    this.address = address || '';
    this.name = name;
    this.time = time;
    this.updated = updated;
  }

  getId() { return this.id; }
  getUsername() { return this.username; }
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

export enum Statuses {
  UP, 
  DOWN
}
