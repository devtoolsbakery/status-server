import * as should from 'should';
import { mock, verify, instance, anything, when } from "ts-mockito";
import SaveHealthCheck from '../../../src/core/usecase/SaveHealthCheck';
import EndpointUpdatedEvent from '../../../src/core/domain/Endpoint/EndpointUpdatedEvent';
import Endpoint from '../../../src/core/domain/Endpoint/Endpoint';
import HealthCheckMongoRepository from '../../../src/core/infrastructure/HealthCheck/HealthCheckMongoRepository';
import EndpointStatusMongoRepository from '../../../src/core/infrastructure/Endpoint/EndpointStatusMongoRepository';
import PingResult from '../../../src/core/domain/HealthCheck/PingResult';
import UserId from '../../../src/core/domain/Shared/UserId';
import EndpointUrl from '../../../src/core/domain/Endpoint/EndpointUrl';
import EndpointName from '../../../src/core/domain/Endpoint/EndpointName';

describe('Scenario: Saved endpoint updated event', () => {
  
  const mockHealthCheckMongoRepository = mock(HealthCheckMongoRepository)
  const mockEndpointStatusMongoRepository = mock(EndpointStatusMongoRepository)
  const username = UserId.generate();
  const url = new EndpointUrl('test.com');
  const name = new EndpointName('Test Site');

  it('should save the event in the collection', async () => {
    const healthCheckMongoRepository = instance(mockHealthCheckMongoRepository);
    const endpointRepository = instance(mockEndpointStatusMongoRepository);
    const endpointStatus = Endpoint.create(username, url, name);
    const pingResult = new PingResult('test.com', '127.0.0.1', 120, new Date());
    const event = EndpointUpdatedEvent.from(endpointStatus.getId().getValue(), pingResult);
    
    const saveHealthCheck = new SaveHealthCheck(healthCheckMongoRepository, endpointRepository);
    await saveHealthCheck.execute(event);
  
    verify(mockHealthCheckMongoRepository.save(event.getData())).once();
  })

  it('should add the check to the EndpointStatus latestHealthChecks', async () => {
    const endpointStatus = Endpoint.create(username, url, name);
    const healthCheckMongoRepository = instance(mockHealthCheckMongoRepository);
    const endpointRepository = instance(mockEndpointStatusMongoRepository);
    const pingResult = new PingResult('test.com', '127.0.0.1', 120, new Date());
    const event = EndpointUpdatedEvent.from(endpointStatus.getId().getValue(), pingResult);
    when(mockEndpointStatusMongoRepository.findById(anything())).thenResolve(endpointStatus);
    
    const saveHealthCheck = new SaveHealthCheck(healthCheckMongoRepository, endpointRepository);
    await saveHealthCheck.execute(event);

    should(endpointStatus.getDailyStatuses()).not.be.empty();
    verify(mockEndpointStatusMongoRepository.save(anything())).once();
  })

})
