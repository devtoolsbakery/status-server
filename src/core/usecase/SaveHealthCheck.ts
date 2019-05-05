import HealthCheckRepository from "../domain/HealthCheck/HealthCheckRepository";
import EndpointUpdatedEvent, { EndpointUpdatedEventData } from "../domain/Endpoint/EndpointUpdatedEvent";

export default class SaveEndpointUpdatedEvent {

  private healthCheckRepository: HealthCheckRepository;

  constructor(healthCheckRepository: HealthCheckRepository) {
    this.healthCheckRepository = healthCheckRepository;
  }
  
  async execute(endpointUpdatedEvent: EndpointUpdatedEvent) {
    const eventData = endpointUpdatedEvent.getData() as EndpointUpdatedEventData;
    
    if (eventData.time > 0) {
      console.log(`✅ ${eventData.time}ms \t ${eventData.host}`);
    } else console.log(`🔴 failed \t ${eventData.host}`);

    this.healthCheckRepository.save(eventData);
  }

}
