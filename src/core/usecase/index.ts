import pingAllEndpointsBuilder from './pingAllEndpoints';
import PingImpl from '../infrastructure/PingServiceImpl';
import { savePingResult } from '../domain/service';
import EndpointStatusFirebaseRepository from '../infrastructure/repository/EndpointStatusFirebaseRepository';

const pingAllEndpoints = pingAllEndpointsBuilder(EndpointStatusFirebaseRepository.getInstance(), savePingResult, new PingImpl());

export { pingAllEndpoints };
