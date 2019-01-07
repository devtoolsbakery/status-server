/* eslint-disable no-console */

const ping = require('ping');
const PingResult = require('../domain/value/PingResult');

module.exports =  async ({ host, timeout }) => {
  const config = {
    timeout
  };

  const result = await ping.promise.probe(host, config);

  const pingResult = new PingResult(result.host, result.numeric_host, result.time);

  if (pingResult.isAlive() === true) {
    console.log(`✅ ${pingResult.getTimeInMilliseconds()}ms \t ${host}`);
  } else console.log(`🔴 failed \t ${host}`);

  return pingResult;
}
