import EndpointStatusRepository from '../domain/Endpoint/EndpointStatusRepository';
import HealthChecker from '../domain/HealthCheck/HealthChecker'
import EventPublisher from '../domain/Shared/event/EventPublisher';
import HealthCheckCreated from '../domain/HealthCheck/HealthCheckCreated';
import Endpoint from '../domain/Endpoint/Endpoint';
import EndpointUpdatedEventRepository from '../domain/HealthCheck/HealthCheckRepository';

export default class PingAllEndpoints {
  private healthChecker: HealthChecker;
  private endpointStatusRepository: EndpointStatusRepository
  private healthCheckRepository: EndpointUpdatedEventRepository
  private eventPublisher: EventPublisher

  constructor(
      endpointStatusRepository: EndpointStatusRepository,
      healthChecker: HealthChecker,
      eventPublisher: EventPublisher,
      healthCheckRepository: EndpointUpdatedEventRepository
    ) {
    this.endpointStatusRepository = endpointStatusRepository;
    this.healthChecker = healthChecker;
    this.eventPublisher = eventPublisher;
    this.healthCheckRepository = healthCheckRepository
  }

  async execute() {
    const iterator = async (endpointStatus: Endpoint) => {
      const healthCheck = await this.healthChecker.check(endpointStatus);
      const event = HealthCheckCreated.from(healthCheck)
      await this.healthCheckRepository.save(healthCheck);
      this.eventPublisher.publish(event);
    };

    const endpoints = await this.endpointStatusRepository.findAll();
    return await Promise.all(endpoints.map(iterator));
  }
}
