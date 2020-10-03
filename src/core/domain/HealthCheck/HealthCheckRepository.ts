import EndpointId from "../Endpoint/EndpointId";
import HealthCheck from "./HealthCheck";


export default interface EndpointUpdatedEventRepository {
  save(healthCheck: HealthCheck): Promise<void>;
  findAll(endpointId: EndpointId): Promise<HealthCheck[]>;
}
