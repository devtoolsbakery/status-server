import HealthCheckRepository from "../domain/HealthCheck/HealthCheckRepository";
import { EndpointUpdatedEventData } from "../domain/Endpoint/EndpointUpdatedEvent";

export default class SaveEndpointUpdatedEvent {

  private healthCheckRepository: HealthCheckRepository;

  constructor(healthCheckRepository: HealthCheckRepository) {
    this.healthCheckRepository = healthCheckRepository;
  }

  async execute(eventData: EndpointUpdatedEventData) {
    await this.healthCheckRepository.save(eventData);
  }

}
