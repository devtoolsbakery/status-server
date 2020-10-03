import EndpointId from "../domain/Endpoint/EndpointId";
import EndpointStatusRepository from "../domain/Endpoint/EndpointStatusRepository";
import { EndpointUpdatedEventData } from "../domain/Endpoint/EndpointUpdatedEvent";

export default class UpdateEndpointStatus {

  private endpointStatusRepository: EndpointStatusRepository;

  constructor(endpointRepository: EndpointStatusRepository) {
    this.endpointStatusRepository = endpointRepository
  }

  async execute(eventData: EndpointUpdatedEventData) {
    const endpointId = new EndpointId(eventData.id);
    const endpoint = await this.endpointStatusRepository.findById(endpointId);
    if (endpoint) {
      endpoint.updateWithHealthCheck(eventData);
      this.endpointStatusRepository.save(endpoint);
    }
  }
}
