const ping = require('ping');
const { EndpointStatusRepository } = require('../repository')

module.exports = {
  ping: require('./ping')({ ping }),
  savePingResult: require('./savePingResult')({ EndpointStatusRepository })
}