import EndpointStatusRepository from '../domain/Endpoint/EndpointStatusRepository';
import PingService from '../domain/HealthCheck/PingService'
import EventPublisher from '../domain/Shared/event/EventPublisher';
import EndpointUpdatedEvent from '../domain/Endpoint/EndpointUpdatedEvent';
import EndpointStatus from '../domain/Endpoint/EndpointStatus';

export default class PingAllEndpoints {
  private pingService: PingService;
  private endpointStatusRepository: EndpointStatusRepository
  private eventPublisher: EventPublisher

  constructor(
      endpointStatusRepository: EndpointStatusRepository, 
      pingService: PingService,
      eventPublisher: EventPublisher
    ) {
    this.endpointStatusRepository = endpointStatusRepository;
    this.pingService = pingService;
    this.eventPublisher = eventPublisher;
  }

  async execute() {
    const iterator = async (endpointStatus: EndpointStatus) => {
      const pingResult = await this.pingService.ping(endpointStatus);
      this.eventPublisher.publish(EndpointUpdatedEvent.from(endpointStatus.getId().getValue(), pingResult));
    };
  
    const endpoints = await this.endpointStatusRepository.findAll();
    return await Promise.all(endpoints.map(iterator));
  }
}
