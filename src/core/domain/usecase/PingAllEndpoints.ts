import EndpointStatusRepository from '../model/EndpointStatusRepository';
import PingService from '../model/service/PingService'
import EventPublisher from '../model/event/EventPublisher';
import SavePingResult from '../model/service/savePingResult';
import EndpointUpdatedEvent from '../model/event/EndpointUpdatedEvent';
import EndpointStatus from '../model/EndpointStatus';

export default class PingAllEndpoints {
  private pingService: PingService;
  private endpointStatusRepository: EndpointStatusRepository
  private savePingResult: SavePingResult;
  private eventPublisher: EventPublisher

  constructor(endpointStatusRepository: EndpointStatusRepository, savePingResult, pingService: PingService,
    eventPublisher: EventPublisher) {
    this.endpointStatusRepository = endpointStatusRepository;
    this.savePingResult = savePingResult;
    this.pingService = pingService;
    this.eventPublisher = eventPublisher;
  }

  async execute() {
    const iterator = async (endpointStatus: EndpointStatus) => {
      const pingResult = await this.pingService.ping(endpointStatus);
      const result = await this.savePingResult.save({ endpointStatus, pingResult });
      this.eventPublisher.publish(EndpointUpdatedEvent.from(endpointStatus));
      return result;
    };
  
    const endpoints = await this.endpointStatusRepository.findAll();
    return Promise.all(endpoints.map(iterator));
  }
}
