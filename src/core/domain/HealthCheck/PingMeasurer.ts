import Endpoint from '../Endpoint/Endpoint';
import HealthCheck from './HealthCheck';

export default interface PingMeasurer {
  ping(endpointStatus: Endpoint): Promise<HealthCheck>
}
