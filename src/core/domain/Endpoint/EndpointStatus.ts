import { EndpointUpdatedEventData } from './EndpointUpdatedEvent';

const assert = require('assert');
const uuid = require('uuid/v4');

const TOTAL_LATEST_CHECKS = 50;
const FAILURE = 'FAILURE';
const OK = 'OK';

const AVAILABILITY_DECIMALS = 4;

export default class EndpointStatus {
  id: string;
  userId: string;
  host: string;
  name: string;
  updated: Date;
  uptime: number;
  latestHealthChecks: [{ date: Date, status: string, timeInMs: number }];
  firstHealthCheckDate: Date;
  downtimeMinutes: number;

  constructor(id, userId, host, name, updated, uptime, lastHealthChecks, firstHealthCheckDate, downtimeMinutes) {
    this.id = id;
    this.userId = userId;
    this.host = host;
    this.name = name;
    this.updated = updated;
    this.uptime = uptime;
    this.latestHealthChecks = lastHealthChecks;
    this.firstHealthCheckDate = firstHealthCheckDate;
    this.downtimeMinutes = downtimeMinutes;
  }

  static create(userId, host, name) {
    assert(userId, 'The userId is mandatory');
    assert(host, 'The host is mandatory');
    assert(name, 'The name is mandatory');

    return new EndpointStatus(uuid(), userId, host, name, new Date(), 100, [], null, 0);
  }

  getId() { return this.id; }
  getUserId() { return this.userId; }
  getHost() { return this.host; }
  getName() { return this.name; }
  getUpdated() { return this.updated; }
  getLatestHealthChecks() { return this.latestHealthChecks; }
  getUptime() { return this.uptime; }

  updateWithHealthCheck(eventData: EndpointUpdatedEventData) {
    this.latestHealthChecks.unshift({
      date: eventData.date,
      status: eventData.time === 0? FAILURE : OK,
      timeInMs: eventData.time
    });
    this.latestHealthChecks.splice(TOTAL_LATEST_CHECKS);
    this.updated = new Date();
  }

  getAvailability(): number {    
    if(!this.firstHealthCheckDate) return 0;
    
    const diffSeconds = Date.now() - this.firstHealthCheckDate.getTime();
    const diffMinutes = diffSeconds / 60;
    const availabilityRatio = (diffMinutes - this.downtimeMinutes) / diffMinutes;
    const percent = availabilityRatio * 100;

    return parseFloat(percent.toFixed(AVAILABILITY_DECIMALS));
  }

}

export enum Statuses {
  UP, 
  DOWN
}
