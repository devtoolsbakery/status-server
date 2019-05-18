import EndpointStatusRepository from "../../domain/Endpoint/EndpointStatusRepository";
import Endpoint from "../../domain/Endpoint/Endpoint";
import EndpointMongoDocument from "./EndpointMongoDocument";
import EndpointId from "../../domain/Endpoint/EndpointId";
import UserId from "../../domain/Shared/UserId";
import EndpointUrl from "../../domain/Endpoint/EndpointUrl";
import EndpointName from "../../domain/Endpoint/EndpointName";

export default class EndpointStatusMongoRepository implements EndpointStatusRepository {
  
  async save(endpoint: Endpoint): Promise<void> {
    const doc = new EndpointMongoDocument({
      _id: endpoint.getId().getValue(),
      host: endpoint.getUrl().getValue(),
      userId: endpoint.getUserId().getValue(),
      name: endpoint.getName().getValue(),
      latestDailyStatuses: endpoint.getDailyStatuses(),
      updated: endpoint.getUpdated(),
      firstHealthCheckDate: endpoint.getFirstHealthCheckDate(),
      serviceDownDate: endpoint.getServiceDownDate(),
      downtimeMinutes: endpoint.getDowntimeMinutes()
    })
    await EndpointMongoDocument.findOneAndUpdate({ _id: doc._id }, doc);
  }
  
  async findByUserId(userId: UserId): Promise<Endpoint[]> {
    const documents = await EndpointMongoDocument.find({ userId: userId.getValue() });
    return documents.map(document => new Endpoint(
      new EndpointId(document._id),
      new UserId(document.userId), 
      new EndpointUrl(document.url),
      new EndpointName(document.name),
      document.updated, 
      document.latestDailyStatuses,
      document.firstHealthCheckDate,
      document.downtimeMinutes,
      document.serviceDownDate
    ));
  }

  async findAll(): Promise<Endpoint[]> {
    const documents = await EndpointMongoDocument.find({});
    return documents.map(document => new Endpoint(
      new EndpointId(document._id),
      new UserId(document.userId), 
      new EndpointUrl(document.url),
      new EndpointName(document.name),
      document.updated, 
      document.latestDailyStatuses,
      document.firstHealthCheckDate,
      document.downtimeMinutes,
      document.serviceDownDate
    ));
  }

  async findById(id: EndpointId): Promise<Endpoint> {
    const document = await EndpointMongoDocument.findById(id.getValue());
    if (document == null) return null;

    return new Endpoint(
      new EndpointId(document._id),
      new UserId(document.userId), 
      new EndpointUrl(document.url),
      new EndpointName(document.name),
      document.updated, 
      document.latestDailyStatuses,
      document.firstHealthCheckDate,
      document.downtimeMinutes,
      document.serviceDownDate
    )
  }

}
