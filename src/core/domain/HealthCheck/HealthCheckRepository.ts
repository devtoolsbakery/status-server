import EndpointId from "../Endpoint/EndpointId";
import HealthCheck from "./HealthCheck";
import HealthCheckId from "./HealthCheckId";


export default interface HealthCheckRepository {
  save(healthCheck: HealthCheck): Promise<void>;
  findById(endpointId: HealthCheckId): Promise<HealthCheck>;
  findAll(endpointId: EndpointId): Promise<HealthCheck[]>;
}
