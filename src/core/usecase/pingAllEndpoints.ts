import EndpointStatusRepository from '../domain/EndpointStatusRepository';
import PingService from '../domain/service/PingService'
import EventPublisher from '../domain/event/EventPublisher';
import SavePingResult from '../domain/service/savePingResult';
import EndpointUpdatedEvent from '../domain/event/EndpointUpdatedEvent';

export default class PingAllEndpoints {
  pingService: PingService;
  endpointStatusRepository: EndpointStatusRepository
  savePingResult: SavePingResult;
  eventPublisher: EventPublisher

  constructor(endpointStatusRepository: EndpointStatusRepository, savePingResult, pingService: PingService,
    eventPublisher: EventPublisher) {
    this.endpointStatusRepository = endpointStatusRepository;
    this.savePingResult = savePingResult;
    this.pingService = pingService;
    this.eventPublisher = eventPublisher;
  }

  async execute() {
    const iterator = async endpointStatus => {
      const pingResult = await this.pingService.ping(endpointStatus.getHost());
      const result = await this.savePingResult.save({ endpointStatus, pingResult });
      this.eventPublisher.publish(EndpointUpdatedEvent.from(pingResult));
      return result;
    };
  
    const endpoints = await this.endpointStatusRepository.findAll();
    return Promise.all(endpoints.map(iterator));
  }
}
