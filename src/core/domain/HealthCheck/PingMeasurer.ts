import PingResult from './PingResult';
import Endpoint from '../Endpoint/Endpoint';

export default interface PingMeasurer {
  ping(endpointStatus: Endpoint): Promise<PingResult>
}
