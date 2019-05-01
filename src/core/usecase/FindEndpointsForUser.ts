import EndpointStatusRepository from "../domain/model/EndpointStatusRepository";
import EndpointUpdatedEventRepository from "../domain/model/EndpointUpdatedEventRepository";
import EndpointCollection from "../domain/model/EndpointCollection";


export default class FindEndpointsForUser {
  
  endpointStatusRepository: EndpointStatusRepository;
  endpointUpdatedEventRepository: EndpointUpdatedEventRepository;

  constructor(endpointStatusRepository: EndpointStatusRepository, 
    endpointUpdatedEventRepository: EndpointUpdatedEventRepository) {
    this.endpointStatusRepository = endpointStatusRepository;
    this.endpointUpdatedEventRepository = endpointUpdatedEventRepository;
  }

  async execute(username: string): Promise<EndpointCollection> {
    const endpoints = await this.endpointStatusRepository.findByUsername(username);
    const pingResults = await Promise.all(endpoints.map(endpoint => 
      this.endpointUpdatedEventRepository.findAll(endpoint.getId()))
    );
    return new EndpointCollection(endpoints, pingResults);
  }
}
