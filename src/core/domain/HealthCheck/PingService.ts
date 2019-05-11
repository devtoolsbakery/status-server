import PingResult from './PingResult';
import Endpoint from '../Endpoint/Endpoint';

export default interface PingService {
  ping(endpointStatus: Endpoint): Promise<PingResult>
}
