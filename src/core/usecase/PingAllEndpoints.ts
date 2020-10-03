import EndpointStatusRepository from '../domain/Endpoint/EndpointStatusRepository';
import PingMeasurer from '../domain/HealthCheck/PingMeasurer'
import EventPublisher from '../domain/Shared/event/EventPublisher';
import HealthCheckCreated from '../domain/HealthCheck/HealthCheckCreated';
import Endpoint from '../domain/Endpoint/Endpoint';
import EndpointUpdatedEventRepository from '../domain/HealthCheck/HealthCheckRepository';

export default class PingAllEndpoints {
  private PingMeasurer: PingMeasurer;
  private endpointStatusRepository: EndpointStatusRepository
  private healthCheckRepository: EndpointUpdatedEventRepository
  private eventPublisher: EventPublisher

  constructor(
      endpointStatusRepository: EndpointStatusRepository,
      PingMeasurer: PingMeasurer,
      eventPublisher: EventPublisher,
      healthCheckRepository: EndpointUpdatedEventRepository
    ) {
    this.endpointStatusRepository = endpointStatusRepository;
    this.PingMeasurer = PingMeasurer;
    this.eventPublisher = eventPublisher;
    this.healthCheckRepository = healthCheckRepository
  }

  async execute() {
    const iterator = async (endpointStatus: Endpoint) => {
      const healthCheck = await this.PingMeasurer.ping(endpointStatus);
      const event = HealthCheckCreated.from(healthCheck)
      await this.healthCheckRepository.save(healthCheck);
      this.eventPublisher.publish(event);
    };

    const endpoints = await this.endpointStatusRepository.findAll();
    return await Promise.all(endpoints.map(iterator));
  }
}
