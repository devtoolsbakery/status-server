import { strict as assert } from 'assert';
import EndpointId from "../Endpoint/EndpointId";
import HealthCheckId from './HealthCheckId';

export default class HealthCheck {
  readonly id: HealthCheckId;
  readonly endpointId: EndpointId;
  readonly host: string;
  readonly address: string;
  readonly time: number;
  readonly createdAt: Date;

  constructor(id: HealthCheckId, endpointId: EndpointId, host: string, address: string, time: number, createdAt: Date) {
    this.id = id
    this.endpointId = endpointId
    this.host = host
    this.address = address
    this.time = time
    this.createdAt = createdAt
  }

  static create(endpointId: EndpointId, host: string, address: string, time: number) {
    assert(endpointId, 'The endpointId is mandatory');

    return new HealthCheck(HealthCheckId.generate(), endpointId, host, address, time, new Date());
  }

  hasFailed(): boolean {
    return !this.address || this.time === 0;
  }
}
