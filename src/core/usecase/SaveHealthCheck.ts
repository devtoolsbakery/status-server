import HealthCheckRepository from "../domain/HealthCheck/HealthCheckRepository";
import EndpointUpdatedEvent, { EndpointUpdatedEventData } from "../domain/Endpoint/EndpointUpdatedEvent";
import EndpointStatusRepository from "../domain/Endpoint/EndpointStatusRepository";

export default class SaveEndpointUpdatedEvent {

  private healthCheckRepository: HealthCheckRepository;
  private endpointStatusRepository: EndpointStatusRepository;

  constructor(healthCheckRepository: HealthCheckRepository, endpointRepository: EndpointStatusRepository) {
    this.healthCheckRepository = healthCheckRepository;
    this.endpointStatusRepository = endpointRepository;
  }
  
  async execute(endpointUpdatedEvent: EndpointUpdatedEvent) {
    const eventData = endpointUpdatedEvent.getData() as EndpointUpdatedEventData;
    
    if (eventData.time > 0) {
      console.log(`✅ ${eventData.time}ms \t ${eventData.host}`);
    } else console.log(`🔴 failed \t ${eventData.host}`);

    try {
      await this.healthCheckRepository.save(eventData);

      const endpoint = await this.endpointStatusRepository.findById(eventData.id);
      if (endpoint) {
        endpoint.updateWithHealthCheck(eventData);
        this.endpointStatusRepository.save(endpoint);
      }
    }
    catch (error) {
      console.log(error);
    }
  }

}
