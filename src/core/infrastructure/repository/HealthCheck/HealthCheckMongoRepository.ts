import HealthCheckRepository from "../../../domain/HealthCheck/HealthCheckRepository";
import HealthCheckMongoDocument from "./HealthCheckMongoDocument";
import HealthCheck from "../../../domain/HealthCheck/HealthCheck";
import EndpointId from "../../../domain/Endpoint/EndpointId";
import HealthCheckId from "../../../domain/HealthCheck/HealthCheckId";

export default class HealthCheckMongoRepository implements HealthCheckRepository {

  async save(healthCheck: HealthCheck): Promise<void> {
    return HealthCheckMongoDocument.create(new HealthCheckMongoDocument({
      _id: healthCheck.id.getValue(),
      endpointId: healthCheck.endpointId.getValue(),
      host: healthCheck.host,
      address: healthCheck.address,
      time: healthCheck.time,
      createdAt: healthCheck.createdAt
    }))
  }

  async findById(healthCheckId: HealthCheckId): Promise<HealthCheck> {
    const document = await HealthCheckMongoDocument.findById(healthCheckId.getValue())
    return new HealthCheck(
      new HealthCheckId(document._id),
      new EndpointId(document.endpointId),
      document.host,
      document.address,
      document.time,
      document.createdAt
    )
  }

  findAll(endpointId: EndpointId): Promise<HealthCheck[]> {
    return HealthCheckMongoDocument.find({});
  }

}
