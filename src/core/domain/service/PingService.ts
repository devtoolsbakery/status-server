import PingResult from '../PingResult';
import EndpointStatus from '../EndpointStatus';

export default interface PingService {
  ping(endpointStatus: EndpointStatus): Promise<PingResult>
}
