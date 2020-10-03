import HealthCheckRepository from "../../../domain/HealthCheck/HealthCheckRepository";
import HealthCheckMongoDocument from "./HealthCheckMongoDocument";
import HealthCheck from "../../../domain/HealthCheck/HealthCheck";
import EndpointId from "../../../domain/Endpoint/EndpointId";

export default class HealthCheckMongoRepository implements HealthCheckRepository {

  save(healthCheck: HealthCheck): Promise<void> {
    return HealthCheckMongoDocument.create(new HealthCheckMongoDocument({
      endpointId: healthCheck.id.getValue(),
      host: healthCheck.host,
      address: healthCheck.address,
      time: healthCheck.time,
      createdAt: healthCheck.createdAt
    }))
  }

  findAll(endpointId: EndpointId): Promise<HealthCheck[]> {
    return HealthCheckMongoDocument.find({});
  }

}
