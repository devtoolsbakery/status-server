import Endpoint from './Endpoint';
import EndpointId from './EndpointId';
import UserId from '../Shared/UserId';

export default interface EndpointStatusRepository {
  save(endpoint: Endpoint): Promise<void>;
  findByUserId(userId: UserId): Promise<Endpoint[]>
  findAll(): Promise<Endpoint[]>;
  findById(id: EndpointId): Promise<Endpoint>;
}
