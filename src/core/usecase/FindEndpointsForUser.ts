import EndpointStatusRepository from "../domain/Endpoint/EndpointStatusRepository";
import EndpointUpdatedEventRepository from "../domain/Endpoint/EndpointUpdatedEventRepository";


export default class FindEndpointsForUser {
  
  endpointStatusRepository: EndpointStatusRepository;
  endpointUpdatedEventRepository: EndpointUpdatedEventRepository;

  constructor(endpointStatusRepository: EndpointStatusRepository, 
    endpointUpdatedEventRepository: EndpointUpdatedEventRepository) {
    this.endpointStatusRepository = endpointStatusRepository;
    this.endpointUpdatedEventRepository = endpointUpdatedEventRepository;
  }

  async execute(username: string): Promise<any> {
    const endpoints = await this.endpointStatusRepository.findByUsername(username);
    const pingResults = await Promise.all(endpoints.map(endpoint => 
      this.endpointUpdatedEventRepository.findAll(endpoint.getId()))
    );
  }
}
