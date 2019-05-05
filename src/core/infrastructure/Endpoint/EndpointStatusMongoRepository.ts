import EndpointStatusRepository from "../../domain/Endpoint/EndpointStatusRepository";
import EndpointStatus from "../../domain/Endpoint/EndpointStatus";
import EndpointMongoDocument from "./EndpointMongoDocument";

export default class EndpointStatusMongoRepository implements EndpointStatusRepository {
  
  save(endpoint: EndpointStatus): Promise<void> {
    const doc = new EndpointMongoDocument({
      _id: endpoint.getId(),
      host: endpoint.getHost(),
      userId: endpoint.getUserId(),
      uptime: endpoint.getUptime(),
      latestHealthChecks: endpoint.getLatestHealthChecks(),
      updated: endpoint.getUpdated()
    })
    return EndpointMongoDocument.findOneAndUpdate({ _id: doc._id }, doc);
  }
  
  findByUsername(username: string): Promise<EndpointStatus[]> {
    throw new Error("Method not implemented.");
  }

  async findAll(): Promise<EndpointStatus[]> {
    const documents = await EndpointMongoDocument.find({});
    return documents.map(document => new EndpointStatus(
      document._id, 
      document.userId, 
      document.host, 
      document.name, 
      document.updated, 
      document.uptime, 
      document.latestHealthChecks
    ));
  }

}
