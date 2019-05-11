import { EndpointUpdatedEventData } from './EndpointUpdatedEvent';
import EndpointId from './EndpointId';
import UserId from '../Shared/UserId';

const assert = require('assert');

const TOTAL_LATEST_CHECKS = 50;
const FAILURE = 'FAILURE';
const OK = 'OK';

const AVAILABILITY_DECIMALS = 4;

class EndpointHost {}
class EndpointName {}

export default class EndpointStatus {
  private id: EndpointId;
  private userId: UserId;
  private host: EndpointHost;
  private name: EndpointName;
  
  private updated: Date;
  private latestHealthChecks: [{ date: Date, status: string, timeInMs: number }];
  private firstHealthCheckDate: Date;
  private downtimeMinutes: number;
  private serviceDownDate: Date;

  constructor(id: EndpointId, userId: UserId, host: EndpointHost, name: EndpointName, updated: Date, lastHealthChecks, firstHealthCheckDate, downtimeMinutes, serviceDownDate) {
    this.id = id;
    this.userId = userId;
    this.host = host;
    this.name = name;
    this.updated = updated;
    this.latestHealthChecks = lastHealthChecks;
    this.firstHealthCheckDate = firstHealthCheckDate;
    this.downtimeMinutes = downtimeMinutes;
    this.serviceDownDate = serviceDownDate || null;
  }

  static create(userId: UserId, host: EndpointHost, name: EndpointName) {
    assert(userId, 'The userId is mandatory');
    assert(host, 'The host is mandatory');
    assert(name, 'The name is mandatory');

    return new EndpointStatus(EndpointId.generate(), userId, host, name, new Date(), [], null, 0, null);
  }

  getId() { return this.id; }
  getUserId() { return this.userId; }
  getHost() { return this.host; }
  getName() { return this.name; }
  getUpdated() { return this.updated; }
  getLatestHealthChecks() { return this.latestHealthChecks; }
  getFirstHealthCheckDate() { return this.firstHealthCheckDate }
  getServiceDownDate() { return this.serviceDownDate; }
  getDowntimeMinutes() { return this.downtimeMinutes }

  updateWithHealthCheck(eventData: EndpointUpdatedEventData) {
    this.updateLastHealthChecks(eventData);
    this.updateFirstHealthCheckDate();
    this.updateServiceDown(eventData);
    this.updated = new Date();
  }

  private updateServiceDown(eventData: EndpointUpdatedEventData) {
    this.increaseDowntimeMinutes();

    if (eventData.isFailed()) {
      this.serviceDownDate = new Date();
    }
    else this.serviceDownDate = null;
  }

  private increaseDowntimeMinutes() {
    if (this.serviceDownDate) {
      const diffSeconds = (Date.now() - this.serviceDownDate.getTime()) / 1000;
      const diffMinutes = diffSeconds / 60;
      this.downtimeMinutes += diffMinutes;
    }
  }

  private updateLastHealthChecks(eventData: EndpointUpdatedEventData) {
    this.latestHealthChecks.unshift({
      date: eventData.date,
      status: eventData.time === 0 ? FAILURE : OK,
      timeInMs: eventData.time
    });
    this.latestHealthChecks.splice(TOTAL_LATEST_CHECKS);
  }

  private updateFirstHealthCheckDate() {
    if (!this.firstHealthCheckDate) {
      this.firstHealthCheckDate = new Date();
    }
  }

  getAvailability(): number {    
    if(!this.firstHealthCheckDate) return 0;
    
    const diffSeconds = (Date.now() - this.firstHealthCheckDate.getTime()) / 1000;
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
