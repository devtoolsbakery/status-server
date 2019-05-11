import EndpointStatusRepository from "../domain/Endpoint/EndpointStatusRepository";
import UserId from "../domain/Shared/UserId";

export default class FindEndpointsForUser {

  endpointStatusRepository: EndpointStatusRepository;

  constructor(endpointStatusRepository: EndpointStatusRepository) {
    this.endpointStatusRepository = endpointStatusRepository;
  }

  async execute(userIdValue: string): Promise<any> {
    const userId = new UserId(userIdValue);
    const endpoints = await this.endpointStatusRepository.findByUserId(userId);
    return endpoints;
  }
}
