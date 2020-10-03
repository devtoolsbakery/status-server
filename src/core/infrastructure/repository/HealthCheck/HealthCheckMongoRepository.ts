import HealthCheckRepository from "../../../domain/HealthCheck/HealthCheckRepository";
import { EndpointUpdatedEventData } from "../../../domain/Endpoint/EndpointUpdatedEvent";
import HealthCheckMongoDocument from "./HealthCheckMongoDocument";

export default class HealthCheckMongoRepository implements HealthCheckRepository {

  save(event: EndpointUpdatedEventData): Promise<void> {
    return HealthCheckMongoDocument.create(new HealthCheckMongoDocument({
      endpointId: '1',
      host: event.host,
      address: event.ip,
      statusCode: 0,
      time: event.time,
      body: '',
      createdAt: event.date
    }))
  }

  findAll(endpointStatusId: string): Promise<EndpointUpdatedEventData[]> {
    return HealthCheckMongoDocument.find({});
  }

}
