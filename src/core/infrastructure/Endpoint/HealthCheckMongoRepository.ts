import EndpointUpdatedEventRepository from "../../domain/Endpoint/EndpointUpdatedEventRepository";
import { EndpointUpdatedEventData } from "../../domain/Endpoint/EndpointUpdatedEvent";
import HealthCheckMongoDocument from "./HealthCheckMongoDocument";

export default class HealthCheckMongoRepository implements EndpointUpdatedEventRepository {
  
  save(event: EndpointUpdatedEventData): Promise<void> {
    return HealthCheckMongoDocument.create(new HealthCheckMongoDocument({
      endpointId: '1',
      host: event.host,
      address: event.ip,
      statusCode: 0,
      time: event.time,
      body: '',
      createdAt: new Date()
    }))
  }  
  
  findAll(endpointStatusId: string): Promise<EndpointUpdatedEventData[]> {
    return HealthCheckMongoDocument.find({});
  }

}
