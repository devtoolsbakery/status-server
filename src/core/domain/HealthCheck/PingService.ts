import PingResult from './PingResult';
import EndpointStatus from '../Endpoint/EndpointStatus';

export default interface PingService {
  ping(endpointStatus: EndpointStatus): Promise<PingResult>
}
