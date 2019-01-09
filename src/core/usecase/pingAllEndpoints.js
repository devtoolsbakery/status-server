module.exports = ({ EndpointStatusRepository, savePingResult, ping }) => async () => {
  
  const iterator = async endpointStatus => {
    const pingResult = await ping(endpointStatus.getHost());
    return savePingResult({ endpointStatus, pingResult })
  };

  const endpoints = await EndpointStatusRepository.findAll();
  return Promise.all(endpoints.map(iterator));

}
