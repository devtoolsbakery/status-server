import EndpointStatusRepository from '../domain/EndpointStatusRepository';
import PingService from '../domain/service/PingService'
export default (endpointStatusRepository: EndpointStatusRepository, savePingResult, pingService: PingService) => async () => {
  
  const iterator = async endpointStatus => {
    const pingResult = await pingService.ping(endpointStatus.getHost());
    return savePingResult({ endpointStatus, pingResult })
  };

  const endpoints = await endpointStatusRepository.findAll();
  return Promise.all(endpoints.map(iterator));

}
