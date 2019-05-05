import * as should from 'should';
import { mock, verify, instance } from "ts-mockito";
import container from '../../../src/core/infrastructure/DependencyInjection';
import SaveEndpointUpdatedEvent from '../../../src/core/usecase/SaveEndpointUpdatedEvent';
import EndpointUpdatedEvent from '../../../src/core/domain/Endpoint/EndpointUpdatedEvent';
import EndpointStatus from '../../../src/core/domain/Endpoint/EndpointStatus';
import EndpointUpdatedEventRepository from '../../../src/core/infrastructure/Endpoint/HealthCheckMongoRepository';
import PingResult from '../../../src/core/domain/HealthCheck/PingResult';

describe('Scenario: Saved endpoint updated event', () => {
  
  const mockEndpointUpdatedEventRepository = mock(EndpointUpdatedEventRepository)

  it('should save the event in the collection', async () => {
    const endpointUpdatedEventRepository = instance(mockEndpointUpdatedEventRepository);
    const endpointStatus = EndpointStatus.create('testUsername', 'test.com', 'Test');
    const pingResult = new PingResult('test.com', '127.0.0.1', 120);
    const event = EndpointUpdatedEvent.from(endpointStatus.getId(), pingResult);
    
    const saveEndpointUpdatedEvent = new SaveEndpointUpdatedEvent(endpointUpdatedEventRepository);
    await saveEndpointUpdatedEvent.execute(event);
  
    verify(mockEndpointUpdatedEventRepository.save(event.getData())).once();
  })

})
