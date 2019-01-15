import EndpointStatusRepository from '../EndpointStatusRepository';

export default class SavePingResult {
  endpointStatusRepository: EndpointStatusRepository;

  constructor(endpointStatusRepository: EndpointStatusRepository) {
    this.endpointStatusRepository = endpointStatusRepository;
  }

  save({ endpointStatus, pingResult }) {
    const address = pingResult.getIp();
    const time = pingResult.getTimeInMilliseconds();
    endpointStatus.updateFromPing({ address, time });
    return this.endpointStatusRepository.save(endpointStatus);
  }

}
