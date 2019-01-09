const { ping } = require('../domain/service');
const { savePingResult } = require('../domain/service');
const { EndpointStatusRepository } = require('../domain/repository');

module.exports = {
  pingAllEndpoints: require('./pingAllEndpoints')({ EndpointStatusRepository, savePingResult, ping })
}
