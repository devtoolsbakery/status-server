import EndpointStatusRepository from '../EndpointStatusRepository';

module.exports = (endpointStatusRepository: EndpointStatusRepository) => ({ endpointStatus, pingResult }) => {
  const address = pingResult.getIp();
  const time = pingResult.getTimeInMilliseconds();
  endpointStatus.updateFromPing({ address, time });
  return endpointStatusRepository.save(endpointStatus);
}
