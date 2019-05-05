import * as should from 'should';
import { mock, verify, instance } from "ts-mockito";
import container from '../../../src/core/infrastructure/DependencyInjection';
import SaveHealthCheck from '../../../src/core/usecase/SaveHealthCheck';
import EndpointUpdatedEvent from '../../../src/core/domain/Endpoint/EndpointUpdatedEvent';
import EndpointStatus from '../../../src/core/domain/Endpoint/EndpointStatus';
import HealthCheckMongoRepository from '../../../src/core/infrastructure/HealthCheck/HealthCheckMongoRepository';
import PingResult from '../../../src/core/domain/HealthCheck/PingResult';

describe('Scenario: Saved endpoint updated event', () => {
  
  const mockHealthCheckMongoRepository = mock(HealthCheckMongoRepository)

  it('should save the event in the collection', async () => {
    const healthCheckMongoRepository = instance(mockHealthCheckMongoRepository);
    const endpointStatus = EndpointStatus.create('testUsername', 'test.com', 'Test');
    const pingResult = new PingResult('test.com', '127.0.0.1', 120);
    const event = EndpointUpdatedEvent.from(endpointStatus.getId(), pingResult);
    
    const saveHealthCheck = new SaveHealthCheck(healthCheckMongoRepository);
    await saveHealthCheck.execute(event);
  
    verify(mockHealthCheckMongoRepository.save(event.getData())).once();
  })

})
