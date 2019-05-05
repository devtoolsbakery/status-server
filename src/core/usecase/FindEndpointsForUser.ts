import EndpointStatusRepository from "../domain/Endpoint/EndpointStatusRepository";
import HealthCheckRepository from "../domain/HealthCheck/HealthCheckRepository";


export default class FindEndpointsForUser {
  
  endpointStatusRepository: EndpointStatusRepository;
  healthCheckRepository: HealthCheckRepository;

  constructor(endpointStatusRepository: EndpointStatusRepository, 
    healthCheckRepository: HealthCheckRepository) {
    this.endpointStatusRepository = endpointStatusRepository;
    this.healthCheckRepository = healthCheckRepository;
  }

  async execute(username: string): Promise<any> {
    const endpoints = await this.endpointStatusRepository.findByUsername(username);
    const pingResults = await Promise.all(endpoints.map(endpoint => 
      this.healthCheckRepository.findAll(endpoint.getId()))
    );
  }
}
