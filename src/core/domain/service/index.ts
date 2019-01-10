const EndpointStatusRepository = require('../../infrastructure/repository/EndpointStatusFirebaseRepository');

module.exports = {
  savePingResult: require('./savePingResult')(EndpointStatusRepository.getInstance())
}
