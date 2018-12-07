/* eslint-disable no-console */

module.exports = ({ ping }) => {

  return async (host) => {
    let config = {
      timeout: 1
    };
    let result = await ping.promise.probe(host, config);
    if (result.alive === true) {
      console.log(`✅ ${result.time}ms \t ${host}`);
    } else console.log(`🔴 failed \t ${host}`);
  
    return result;
  }

};