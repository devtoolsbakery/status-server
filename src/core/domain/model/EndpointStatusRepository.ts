import EndpointStatus from './EndpointStatus';

export default interface EndpointStatusRepository {
  save(endpoint: EndpointStatus): Promise<void>;
  findAll(): Promise<[EndpointStatus]>;
}
