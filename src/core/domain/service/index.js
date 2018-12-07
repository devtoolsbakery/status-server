const { EndpointStatusRepository } = require('../repository')
const pingImpl = require('../../infrastructure/ping');

module.exports = {
  ping: require('./ping')({ pingImpl }),
  savePingResult: require('./savePingResult')({ EndpointStatusRepository })
}
