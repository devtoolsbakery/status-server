module.exports = ({ savePingResult, ping }) => (endpoints) => {
  
  const iterator = async endpointStatus => {
    const pingResult = await ping(endpointStatus.getHost());
    return savePingResult({ endpointStatus, pingResult })
  };

  return Promise.all(endpoints.map(iterator));

}
