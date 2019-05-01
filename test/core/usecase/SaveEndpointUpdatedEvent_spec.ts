import * as should from 'should';
import container from '../../../src/core/infrastructure/DependencyInjection';
import SaveEndpointUpdatedEvent from '../../../src/core/usecase/SaveEndpointUpdatedEvent';
import EndpointUpdatedEvent from '../../../src/core/domain/Endpoint/EndpointUpdatedEvent';
import EndpointStatus from '../../../src/core/domain/Endpoint/EndpointStatus';
import EndpointUpdatedEventFirebaseRepository from '../../../src/core/infrastructure/repository/EndpointUpdatedEventFirebaseRepository';
import PingResult from '../../../src/core/domain/HealthCheck/PingResult';

const saveEndpointUpdatedEvent = container.get('core.usecase.SaveEndpointUpdatedEvent', SaveEndpointUpdatedEvent);
const endpointUpdatedEventRepository = container.get('core.infrastructure.repository.EndpointUpdatedEventRepository', EndpointUpdatedEventFirebaseRepository);

describe('Scenario: Saved endpoint updated event', () => {
  
  before(_clean);
  after(_clean);

  it('should save the event in the collection', async () => {
    const endpointStatus = EndpointStatus.create('testUsername', 'test.com', 'Test');
    const pingResult = new PingResult('test.com', '127.0.0.1', 120);
    const event = EndpointUpdatedEvent.from(endpointStatus.getId(), pingResult);
    
    saveEndpointUpdatedEvent.execute(event);

    const data = await endpointUpdatedEventRepository.findAll(endpointStatus.getId());
    should(data.length).be.eql(1);

  })

  async function _clean() {
    return await endpointUpdatedEventRepository.deleteAll('id');
  }
})
