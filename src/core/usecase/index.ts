import pingAllEndpointsBuilder from './pingAllEndpoints';

import PingImpl from '../infrastructure/PingServiceImpl';
const { savePingResult } = require('../domain/service');
const EndpointStatusFirebaseRepository = require('../infrastructure/repository/EndpointStatusFirebaseRepository');
const pingAllEndpoints = pingAllEndpointsBuilder(EndpointStatusFirebaseRepository.getInstance(), savePingResult, new PingImpl());

export { pingAllEndpoints };
