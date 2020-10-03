import Event from '../Shared/event/Event';
import HealthCheck from './HealthCheck';

export class HealthCheckCreatedData {
  readonly healthCheckId: string;

  constructor(healthCheckId) {
    this.healthCheckId = healthCheckId;
  }
}

export default class HealthCheckCreated extends Event {
  public static eventName = 'endpoint_updated';

  private constructor(data: HealthCheckCreatedData) {
      super();
      this.data = data;
  }

  static from(healthCheck: HealthCheck): HealthCheckCreated {
      return new HealthCheckCreated(
        new HealthCheckCreatedData(healthCheck.id.getValue())
      );
  }
}
