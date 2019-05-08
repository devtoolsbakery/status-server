import EndpointStatusRepository from "../../domain/Endpoint/EndpointStatusRepository";
import EndpointStatus from "../../domain/Endpoint/EndpointStatus";
import EndpointMongoDocument from "./EndpointMongoDocument";

export default class EndpointStatusMongoRepository implements EndpointStatusRepository {
  
  async save(endpoint: EndpointStatus): Promise<void> {
    const doc = new EndpointMongoDocument({
      _id: endpoint.getId(),
      host: endpoint.getHost(),
      userId: endpoint.getUserId(),
      uptime: endpoint.getUptime(),
      latestHealthChecks: endpoint.getLatestHealthChecks(),
      updated: endpoint.getUpdated(),
      firstHealthCheckDate: endpoint.getFirstHealthCheckDate(),
      serviceDownDate: endpoint.getServiceDownDate(),
      downtimeMinutes: endpoint.getDowntimeMinutes()
    })
    await EndpointMongoDocument.findOneAndUpdate({ _id: doc._id }, doc);
  }
  
  async findByUsername(username: string): Promise<EndpointStatus[]> {
    const documents = await EndpointMongoDocument.find({ userId: username });
    return documents.map(document => new EndpointStatus(
      document._id, 
      document.userId, 
      document.host, 
      document.name, 
      document.updated, 
      document.uptime, 
      document.latestHealthChecks,
      document.firstHealthCheckDate,
      document.downtimeMinutes,
      document.serviceDownDate
    ));
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
      document.latestHealthChecks,
      document.firstHealthCheckDate,
      document.downtimeMinutes,
      document.serviceDownDate
    ));
  }

  async findById(id: string): Promise<EndpointStatus> {
    const document = await EndpointMongoDocument.findById(id);
    if (document == null) return null;

    return new EndpointStatus(
      document._id, 
      document.userId, 
      document.host, 
      document.name, 
      document.updated, 
      document.uptime, 
      document.latestHealthChecks,
      document.firstHealthCheckDate,
      document.downtimeMinutes,
      document.serviceDownDate
    )
  }

}
