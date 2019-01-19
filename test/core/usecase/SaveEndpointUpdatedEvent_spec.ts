import * as should from 'should';
import container from '../../../src/core/infrastructure/DependencyInjection';
import SaveEndpointUpdatedEvent from '../../../src/core/usecase/SaveEndpointUpdatedEvent';
import EndpointUpdatedEvent from '../../../src/core/domain/event/EndpointUpdatedEvent';
import EndpointStatus from '../../../src/core/domain/EndpointStatus';
import EndpointUpdatedEventFirebaseRepository from '../../../src/core/infrastructure/repository/EndpointUpdatedEventFirebaseRepository';

const saveEndpointUpdatedEvent = container.get('app.usecase.SaveEndpointUpdatedEvent') as SaveEndpointUpdatedEvent;
const endpointUpdatedEventRepository = container.get('app.infrastructure.repository.EndpointUpdatedEventRepository') as EndpointUpdatedEventFirebaseRepository

describe('Scenario: Saved endpoint updated event', () => {
  
  before(_clean);
  after(_clean);

  it('should save the event in the collection', async () => {
    const endpointStatus = new EndpointStatus('id', 'test.com', '10.0.0.1', 'Test', 100, new Date());
    const event = EndpointUpdatedEvent.from(endpointStatus);
    
    saveEndpointUpdatedEvent.execute(event);

    const data = await endpointUpdatedEventRepository.findAll(endpointStatus.getId());
    should(data.length).be.eql(1);

  })

  async function _clean() {
    return await endpointUpdatedEventRepository.deleteAll('id');
  }
})
