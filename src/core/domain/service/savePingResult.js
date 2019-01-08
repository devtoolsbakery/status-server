module.exports = ({ EndpointStatusRepository }) => ({ endpointStatus, pingResult }) => {
  const address = pingResult.getIp();
  const time = pingResult.getTimeInMilliseconds();
  endpointStatus.updateFromPing({ address, time });
  return EndpointStatusRepository.save(endpointStatus);
}
