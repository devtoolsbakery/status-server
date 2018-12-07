const EndpointStatusFirebaseRepository = require('../../infrastructure/repository/EndpointStatusFirebaseRepository');

module.exports = {
  EndpointStatusRepository: require('./EndpointStatusRepository')({ 
    EndpointStatusRepositoryImpl: EndpointStatusFirebaseRepository 
  })
}