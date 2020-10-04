import Endpoint from '../Endpoint/Endpoint';
import HealthCheck from './HealthCheck';

export default interface HealthChecker {
  check(endpointStatus: Endpoint): Promise<HealthCheck>
}
