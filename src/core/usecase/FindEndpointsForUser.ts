import EndpointStatusRepository from "../domain/Endpoint/EndpointStatusRepository";

export default class FindEndpointsForUser {

  endpointStatusRepository: EndpointStatusRepository;

  constructor(endpointStatusRepository: EndpointStatusRepository) {
    this.endpointStatusRepository = endpointStatusRepository;
  }

  async execute(username: string): Promise<any> {
    const endpoints = await this.endpointStatusRepository.findByUsername(username);
    return {
      status: 'HEALTH',
      endpoints
    }
    
  }
}
