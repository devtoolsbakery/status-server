import EndpointStatus from './EndpointStatus';

export default interface EndpointStatusRepository {
  save(endpoint: EndpointStatus): Promise<void>;
  findByUsername(username: string): Promise<EndpointStatus[]>
  findAll(): Promise<EndpointStatus[]>;
  findById(id: string): Promise<EndpointStatus>;
}
