import EndpointStatusRepository from '../../infrastructure/repository/EndpointStatusFirebaseRepository';
import savePingResultBuilder from './savePingResult';

const savePingResult = savePingResultBuilder(EndpointStatusRepository.getInstance());

export {
  savePingResult
};
