import EndpointStatusRepository from "../domain/Endpoint/EndpointStatusRepository";
import HealthCheckId from "../domain/HealthCheck/HealthCheckId";
import HealthCheckRepository from "../domain/HealthCheck/HealthCheckRepository";

export default class UpdateEndpointStatus {

  private endpointStatusRepository: EndpointStatusRepository;
  private healthCheckRepository: HealthCheckRepository

  constructor(endpointRepository: EndpointStatusRepository, healthCheckRepository: HealthCheckRepository) {
    this.endpointStatusRepository = endpointRepository
    this.healthCheckRepository = healthCheckRepository
  }

  async execute(healthCheckId: string) {
    const healthCheck = await this.healthCheckRepository.findById(new HealthCheckId(healthCheckId))
    const endpoint = await this.endpointStatusRepository.findById(healthCheck.endpointId);

    if (healthCheck.hasFailed()) {
      console.log(`🔴 failed \t ${healthCheck.host}`);
    }
    else console.log(`✅ ${healthCheck.time}ms \t ${healthCheck.host}`);

    if (endpoint) {
      endpoint.updateWithHealthCheck(healthCheck);
      this.endpointStatusRepository.save(endpoint);
    }
  }
}
