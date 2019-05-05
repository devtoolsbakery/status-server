import * as should from 'should';
import EndpointStatus from '../../../../src/core/domain/Endpoint/EndpointStatus';
import { Statuses } from '../../../../src/core/domain/Endpoint/EndpointStatus';
import { EndpointUpdatedEventData } from '../../../../src/core/domain/Endpoint/EndpointUpdatedEvent';

describe('EndpointStatus entity', () => {
  
  it('should generate an id', () => {
    const endpoint1 = EndpointStatus.create('userId', 'test.com', 'Test site');
    const endpoin2 = EndpointStatus.create('userId', 'test.com', 'Test site');
    should(endpoint1.getId()).be.not.eql(endpoin2.getId());
  });

  it('should fail if the userId is missing', () => {
    should.throws(() => {
      EndpointStatus.create(null, 'test.com', 'Test site');
    })

    should.throws(() => {
      EndpointStatus.create('', 'test.com', 'Test site');
    })
  });

  it('should fail if the host is missing', () => {
    should.throws(() => {
      EndpointStatus.create('1234', null, 'Test site');
    })

    should.throws(() => {
      EndpointStatus.create('1234', '', 'Test site');
    })
  });

  it('should fail if the name is missing', () => {
    should.throws(() => {
      EndpointStatus.create('1234', 'test.com', null);
    })

    should.throws(() => {
      EndpointStatus.create('1234', 'test.com', '');
    })
  });

  it('should add a health check information', () => {
    const endpoint = EndpointStatus.create('1234', 'test.com', 'Test website');
    endpoint.updateWithHealthCheck(new EndpointUpdatedEventData('id', 'ip', 'host', 123));
    should(endpoint.getLatestHealthChecks()).not.be.empty();
  })
  
  it('should keep the latest 50 health checks', () => {
    const initialLastChecks = new Array(50);
    initialLastChecks.fill({}, 0, 49)
    const endpoint = new EndpointStatus('id', 'userID', 'host', 'name', 'updated', 'uptime', initialLastChecks);
    endpoint.updateWithHealthCheck(new EndpointUpdatedEventData('id', 'ip', 'host', 123));
    should(endpoint.getLatestHealthChecks()).have.lengthOf(50);
  })
})
