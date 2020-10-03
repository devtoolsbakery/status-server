import EndpointStatusRepository from '../domain/Endpoint/EndpointStatusRepository';
import PingMeasurer from '../domain/HealthCheck/PingMeasurer'
import EventPublisher from '../domain/Shared/event/EventPublisher';
import EndpointUpdatedEvent from '../domain/Endpoint/EndpointUpdatedEvent';
import Endpoint from '../domain/Endpoint/Endpoint';

export default class PingAllEndpoints {
  private PingMeasurer: PingMeasurer;
  private endpointStatusRepository: EndpointStatusRepository
  private eventPublisher: EventPublisher

  constructor(
      endpointStatusRepository: EndpointStatusRepository,
      PingMeasurer: PingMeasurer,
      eventPublisher: EventPublisher
    ) {
    this.endpointStatusRepository = endpointStatusRepository;
    this.PingMeasurer = PingMeasurer;
    this.eventPublisher = eventPublisher;
  }

  async execute() {
    const iterator = async (endpointStatus: Endpoint) => {
      const pingResult = await this.PingMeasurer.ping(endpointStatus);
      this.eventPublisher.publish(EndpointUpdatedEvent.from(endpointStatus.getId().getValue(), pingResult));
    };

    const endpoints = await this.endpointStatusRepository.findAll();
    return await Promise.all(endpoints.map(iterator));
  }
}
