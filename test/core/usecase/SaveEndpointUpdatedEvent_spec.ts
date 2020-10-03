import { mock, verify, instance } from "ts-mockito";
import SaveHealthCheck from '../../../src/core/usecase/SaveHealthCheck';
import EndpointUpdatedEvent from '../../../src/core/domain/Endpoint/EndpointUpdatedEvent';
import Endpoint from '../../../src/core/domain/Endpoint/Endpoint';
import HealthCheckMongoRepository from '../../../src/core/infrastructure/HealthCheck/HealthCheckMongoRepository';
import PingResult from '../../../src/core/domain/HealthCheck/PingResult';
import UserId from '../../../src/core/domain/Shared/UserId';
import EndpointUrl from '../../../src/core/domain/Endpoint/EndpointUrl';
import EndpointName from '../../../src/core/domain/Endpoint/EndpointName';

describe('SaveHealthCheck usecase', () => {

  const mockHealthCheckMongoRepository = mock(HealthCheckMongoRepository)
  const username = UserId.generate();
  const url = new EndpointUrl('test.com');
  const name = new EndpointName('Test Site');

  it('should save the event in the collection', async () => {
    const healthCheckMongoRepository = instance(mockHealthCheckMongoRepository);
    const endpointStatus = Endpoint.create(username, url, name);
    const pingResult = new PingResult('test.com', '127.0.0.1', 120, new Date());
    const event = EndpointUpdatedEvent.from(endpointStatus.getId().getValue(), pingResult);

    const saveHealthCheck = new SaveHealthCheck(healthCheckMongoRepository);
    await saveHealthCheck.execute(event.getData());

    verify(mockHealthCheckMongoRepository.save(event.getData())).once();
  })
})
