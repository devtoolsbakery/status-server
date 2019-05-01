import EndpointStatusRepository from '../domain/Endpoint/EndpointStatusRepository';
import PingService from '../domain/HealthCheck/PingService'
import EventPublisher from '../domain/Shared/event/EventPublisher';
import EndpointUpdatedEvent from '../domain/Endpoint/event/EndpointUpdatedEvent';
import EndpointStatus from '../domain/Endpoint/EndpointStatus';
import PingResult from '../domain/HealthCheck/PingResult';

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
      const result = await this.savePingResult(endpointStatus, pingResult);
      this.eventPublisher.publish(EndpointUpdatedEvent.from(endpointStatus));
      return result;
    };
  
    const endpoints = await this.endpointStatusRepository.findAll();
    return Promise.all(endpoints.map(iterator));
  }

  private savePingResult(endpointStatus: EndpointStatus, pingResult: PingResult) {
    const address = pingResult.getIp();
    const time = pingResult.getTimeInMilliseconds();
    endpointStatus.updateFromPing({ address, time });
    return this.endpointStatusRepository.save(endpointStatus);
  }
}
