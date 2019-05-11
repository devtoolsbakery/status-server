import EndpointStatus from './EndpointStatus';
import EndpointId from './EndpointId';
import UserId from '../Shared/UserId';

export default interface EndpointStatusRepository {
  save(endpoint: EndpointStatus): Promise<void>;
  findByUserId(userId: UserId): Promise<EndpointStatus[]>
  findAll(): Promise<EndpointStatus[]>;
  findById(id: EndpointId): Promise<EndpointStatus>;
}
