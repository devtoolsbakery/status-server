import EndpointStatusRepository from '../domain/EndpointStatusRepository';
import PingService from '../domain/service/PingService'

export default class PingAllEndpoints {
  pingService: PingService;
  endpointStatusRepository: EndpointStatusRepository
  savePingResult;

  constructor(endpointStatusRepository: EndpointStatusRepository, savePingResult, pingService: PingService) {
    this.endpointStatusRepository = endpointStatusRepository;
    this.savePingResult = savePingResult;
    this.pingService = pingService;
  }

  async execute() {
    const iterator = async endpointStatus => {
      const pingResult = await this.pingService.ping(endpointStatus.getHost());
      return this.savePingResult.save({ endpointStatus, pingResult })
    };
  
    const endpoints = await this.endpointStatusRepository.findAll();
    return Promise.all(endpoints.map(iterator));
  }
}
