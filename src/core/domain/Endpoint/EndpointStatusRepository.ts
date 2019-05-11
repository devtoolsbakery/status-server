import EndpointStatus from './EndpointStatus';
import EndpointId from './EndpointId';

export default interface EndpointStatusRepository {
  save(endpoint: EndpointStatus): Promise<void>;
  findByUsername(username: string): Promise<EndpointStatus[]>
  findAll(): Promise<EndpointStatus[]>;
  findById(id: EndpointId): Promise<EndpointStatus>;
}
