import EndpointStatusRepository from '../domain/Endpoint/EndpointStatusRepository';
import PingMeasurer from '../domain/HealthCheck/PingMeasurer'
import EventPublisher from '../domain/Shared/event/EventPublisher';
import EndpointUpdatedEvent from '../domain/Endpoint/EndpointUpdatedEvent';
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
      const pingResult = await this.PingMeasurer.ping(endpointStatus);
      const event = EndpointUpdatedEvent.from(endpointStatus.getId().getValue(), pingResult)
      await this.healthCheckRepository.save(event.getData());
      this.eventPublisher.publish(event);
    };

    const endpoints = await this.endpointStatusRepository.findAll();
    return await Promise.all(endpoints.map(iterator));
  }
}
