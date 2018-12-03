let ping = require("ping");

module.exports = async function pingAll(endpoints) {
  const promises = endpoints.map(host => pingEndpoint(host.address)); // returns an array of promises [p1,p2,p3]
  await Promise.all(promises);

  return promises;
}

async function pingEndpoint(host) {
  let config = {
    timeout: 1
  };
  let result = await ping.promise.probe(host, config);
  if (result.alive === true) {
    console.log(`✅ ${result.time}ms \t ${host}`);
  } else console.log(`🔴 failed \t ${host}`);

  return result;
}