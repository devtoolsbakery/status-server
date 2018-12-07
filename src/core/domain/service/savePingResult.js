module.exports = ({ EndpointStatusRepository }) => ({ endpointStatus, pingResult }) => {
  const status = pingResult.isAlive();
  const address = pingResult.getIp();
  const time = pingResult.getTimeInMilliseconds();
  endpointStatus.updateFromPing({ status, address, time });
  return EndpointStatusRepository.save(endpointStatus);
}
