import EndpointId from './EndpointId';
import UserId from '../Shared/UserId';
import { strict as assert } from 'assert';
import EndpointUrl from './EndpointUrl';
import EndpointName from './EndpointName';
import HealthCheck from '../HealthCheck/HealthCheck';

const HEALCHECK_INTERVAL_MINUTES = 1;
const TOTAL_LATEST_CHECKS = 90;

const AVAILABILITY_DECIMALS = 4;

type Incident = {
  incidentDate: Date,
  duration: number,
  reason: string
}

type Status = {
  date: Date
  incidents: Incident[]
  averageResponseTime: number
  totalSuccessfulHealthChecks: number
};

export default class Endpoint {
  private id: EndpointId;
  private userId: UserId;
  private url: EndpointUrl;
  private name: EndpointName;

  private updated: Date;
  private dailyStatuses: Status[];
  private firstHealthCheckDate: Date;
  private downtimeMinutes: number;
  private serviceDownDate: Date;

  constructor(id: EndpointId, userId: UserId, url: EndpointUrl, name: EndpointName, updated: Date, dailyStatuses, firstHealthCheckDate, downtimeMinutes, serviceDownDate) {
    this.id = id;
    this.userId = userId;
    this.url = url;
    this.name = name;
    this.updated = updated;
    this.dailyStatuses = dailyStatuses;
    this.firstHealthCheckDate = firstHealthCheckDate;
    this.downtimeMinutes = downtimeMinutes;
    this.serviceDownDate = serviceDownDate || null;
  }

  static create(userId: UserId, url: EndpointUrl, name: EndpointName) {
    assert(userId, 'The userId is mandatory');
    assert(url, 'The url is mandatory');
    assert(name, 'The name is mandatory');

    return new Endpoint(EndpointId.generate(), userId, url, name, new Date(), [], null, 0, null);
  }

  getId() { return this.id; }
  getUserId() { return this.userId; }
  getUrl() { return this.url; }
  getName() { return this.name; }
  getUpdated() { return this.updated; }
  getDailyStatuses() { return this.dailyStatuses; }
  getFirstHealthCheckDate() { return this.firstHealthCheckDate }
  getServiceDownDate() { return this.serviceDownDate; }
  getDowntimeMinutes() { return this.downtimeMinutes }

  updateWithHealthCheck(healthCheck: HealthCheck) {
    this.updateLastHealthChecks(healthCheck);
    this.updateFirstHealthCheckDate();
    this.updateServiceDown(healthCheck);
    this.updated = new Date();
  }

  private updateServiceDown(healthCheck: HealthCheck) {
    this.increaseDowntimeMinutes();

    if (healthCheck.hasFailed()) {
      if (this.serviceDownDate === null) {
        this.serviceDownDate = healthCheck.createdAt;
      }
    }
    else this.serviceDownDate = null;
  }

  private increaseDowntimeMinutes() {
    if (this.serviceDownDate) {
      this.downtimeMinutes += HEALCHECK_INTERVAL_MINUTES;
    }
  }

  private updateLastHealthChecks(healthCheck: HealthCheck) {

    const isNewIncident = (status) => {
      return this.getServiceDownDate() === null || status.incidents.length === 0;
    }

    const addIncident = (status: Status) => {
      status.incidents.push({
        incidentDate: healthCheck.createdAt,
        duration: 0,
        reason: ''
      });
    }

    const updateLastIncident = (status: Status) => {
      const lastIncident = status.incidents[0];
      const diffInMs = healthCheck.createdAt.getTime() - this.getServiceDownDate().getTime();
      lastIncident.duration = diffInMs / (60 * 1000);
    }

    const updateStatusIncident = (healthCheck: HealthCheck, status: Status) => {
      if (healthCheck.hasFailed()) {
        if (isNewIncident(status)) {
          addIncident(status);
        }
        else {
          updateLastIncident(status)
        }
      }
    }

    const shoudAggregateStatus = () => {
      return this.dailyStatuses.length > 0 &&
        this.isSameDay(this.getLastStatus().date, healthCheck.createdAt)
    }

    if (shoudAggregateStatus()) {
      const lastStatus = this.getLastStatus();
      if (!healthCheck.hasFailed()) {
        lastStatus.averageResponseTime = ((lastStatus.averageResponseTime * lastStatus.totalSuccessfulHealthChecks) + healthCheck.time) / (lastStatus.totalSuccessfulHealthChecks + 1);
        lastStatus.totalSuccessfulHealthChecks += 1;
      }
      updateStatusIncident(healthCheck, lastStatus);
    }
    else {
      const lastStatus = this.createStatus(healthCheck);
      updateStatusIncident(healthCheck, lastStatus);
      this.dailyStatuses.unshift(lastStatus);
      this.dailyStatuses.splice(TOTAL_LATEST_CHECKS);
    }
  }


  private createStatus(healthCheck: HealthCheck): Status {
    return {
      date: healthCheck.createdAt,
      averageResponseTime: healthCheck.hasFailed()? 0 : healthCheck.time,
      incidents: [] as Incident[],
      totalSuccessfulHealthChecks: healthCheck.hasFailed()? 0 : 1
    };
  }

  private getLastStatus(): Status {
    return this.dailyStatuses[0];
  }

  private isSameDay(date1: Date, date2: Date): boolean {
    return  date1.getUTCDate() === date2.getUTCDate() &&
            date1.getUTCMonth() === date2.getUTCMonth() &&
            date1.getUTCFullYear() === date2.getUTCFullYear();
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


