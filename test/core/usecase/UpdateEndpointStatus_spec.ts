import * as should from 'should';
import { mock, verify, instance, anything, when } from "ts-mockito";
import EndpointUpdatedEvent from '../../../src/core/domain/Endpoint/EndpointUpdatedEvent';
import Endpoint from '../../../src/core/domain/Endpoint/Endpoint';
import EndpointStatusMongoRepository from '../../../src/core/infrastructure/repository/Endpoint/EndpointStatusMongoRepository';
import PingResult from '../../../src/core/domain/HealthCheck/PingResult';
import UserId from '../../../src/core/domain/Shared/UserId';
import EndpointUrl from '../../../src/core/domain/Endpoint/EndpointUrl';
import EndpointName from '../../../src/core/domain/Endpoint/EndpointName';
import UpdateEndpointStatus from '../../../src/core/usecase/UpdateEndpointStatus';

describe('UpdatedEndpointStatus usecase', () => {
  const mockEndpointStatusMongoRepository = mock(EndpointStatusMongoRepository)
  const username = UserId.generate();
  const url = new EndpointUrl('test.com');
  const name = new EndpointName('Test Site');

  it('should add the check to the EndpointStatus latestHealthChecks', async () => {
    const endpointStatus = Endpoint.create(username, url, name);
    const endpointRepository = instance(mockEndpointStatusMongoRepository);
    const pingResult = new PingResult('test.com', '127.0.0.1', 120, new Date());
    const event = EndpointUpdatedEvent.from(endpointStatus.getId().getValue(), pingResult);
    when(mockEndpointStatusMongoRepository.findById(anything())).thenResolve(endpointStatus);

    const updatedEndpointStatus = new UpdateEndpointStatus(endpointRepository);
    await updatedEndpointStatus.execute(event.getData());

    should(endpointStatus.getDailyStatuses()).not.be.empty();
    verify(mockEndpointStatusMongoRepository.save(anything())).once();
  })
})
