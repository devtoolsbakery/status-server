import * as should from 'should';
import EndpointStatus from '../../../../src/core/domain/Endpoint/EndpointStatus';
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

  context('Update from a health check', () => {
    it('should add a health check information', () => {
      const endpoint = EndpointStatus.create('1234', 'test.com', 'Test website');
      endpoint.updateWithHealthCheck(new EndpointUpdatedEventData('id', 'ip', 'host', 123, new Date()));
      should(endpoint.getLatestHealthChecks()).not.be.empty();
    })
    
    it('should keep the latest 50 health checks', () => {
      const initialLastChecks = new Array(50);
      initialLastChecks.fill({}, 0, 49);
      const endpoint = new EndpointStatus('id', 'userID', 'host', 'name', 'updated', 'uptime', initialLastChecks, new Date(), 0, null);
      endpoint.updateWithHealthCheck(new EndpointUpdatedEventData('id', 'ip', 'host', 123, new Date()));
      should(endpoint.getLatestHealthChecks()).have.lengthOf(50);
    })

    it('should update the first health check date', () => {
      const endpoint = EndpointStatus.create('userId', 'test.com', 'Test website');
      endpoint.updateWithHealthCheck(new EndpointUpdatedEventData('id', 'ip', 'host', 123, new Date()));
      should.exist(endpoint.getFirstHealthCheckDate());
    })

    it('should set the service down date', () => {
      const endpoint = EndpointStatus.create('userId', 'test.com', 'Test website');
      endpoint.updateWithHealthCheck(new EndpointUpdatedEventData('id', null, 'host', 0, new Date()));
      should.exist(endpoint.getServiceDownDate());
    })

    it('should increase the downtime minutes after the first fail', () => {
      const now = Date.now();
      const lastFailedDate = new Date(now - (60 * 1000));
      const initialMinutesDown = 10;
      const endpoint = new EndpointStatus('id', 'userID', 'host', 'name', 'updated', 'uptime', [], new Date(), initialMinutesDown, lastFailedDate);
      endpoint.updateWithHealthCheck(new EndpointUpdatedEventData('id', null, 'host', 1, new Date()));
      
      endpoint.getDowntimeMinutes().should.be.greaterThan(initialMinutesDown);
      endpoint.getServiceDownDate().getTime().should.be.greaterThanOrEqual(now);
    })

    it('should restore the service down date when the API is OK again', () => {
      const now = Date.now();
      const lastFailedDate = new Date(now - (60 * 1000));
      const initialMinutesDown = 10;
      const endpoint = new EndpointStatus('id', 'userID', 'host', 'name', 'updated', 'uptime', [], new Date(), initialMinutesDown, lastFailedDate);
      endpoint.updateWithHealthCheck(new EndpointUpdatedEventData('id', 'ip', 'host', 100, new Date()));
      
      endpoint.getDowntimeMinutes().should.be.greaterThan(initialMinutesDown);
      should.not.exist(endpoint.getServiceDownDate());
    });
  });

  context('Availability calculation', () => {
    it('should return 0 if there is not first health check date', () => {
      const endpoint = EndpointStatus.create('1', 'test.com', 'Test site');
      const availability = endpoint.getAvailability();

      should(availability).be.eql(0);
    })

    it('should calculate the availability from the first health check', () => {
      const from = new Date(Date.now() - 3600*24*1000);
      const downtimeMinutes = 1;
      const endpoint = new EndpointStatus('id', 'userID', 'host', 'name', 'updated', 'uptime', [], from, downtimeMinutes, null);
      const availability = endpoint.getAvailability();

      should(availability).be.eql(99.9306);
    })

  })
})
