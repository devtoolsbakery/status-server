module.exports = class EndpointStatus {

  constructor(id, address, name, status, time, updated) {
    this.id = id;
    this.address = address;
    this.name = name;
    this.status = status;
    this.time = time;
    this.updated = updated;
  }

  getId() { return this.id; }
  getAddress() { return this.address; }
  getName() { return this.name; }
  getStatus() { return this.status; }
  getTime() { return this.time; }
  getUpdated() { return this.updated; }

  updateFromPing({ status, time, address }) {
    this.status = status;
    this.address = address;
    this.time = time;
    this.updated = new Date();
  }

}