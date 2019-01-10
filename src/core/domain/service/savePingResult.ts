import EndpointStatusRepository from '../EndpointStatusRepository';

export default (endpointStatusRepository: EndpointStatusRepository) => ({ endpointStatus, pingResult }) => {
  const address = pingResult.getIp();
  const time = pingResult.getTimeInMilliseconds();
  endpointStatus.updateFromPing({ address, time });
  return endpointStatusRepository.save(endpointStatus);
}
