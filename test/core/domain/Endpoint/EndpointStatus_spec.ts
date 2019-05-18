import * as should from 'should';
import Endpoint from '../../../../src/core/domain/Endpoint/Endpoint';
import { EndpointUpdatedEventData } from '../../../../src/core/domain/Endpoint/EndpointUpdatedEvent';
import EndpointId from '../../../../src/core/domain/Endpoint/EndpointId';
import UserId from '../../../../src/core/domain/Shared/UserId';
import EndpointUrl from '../../../../src/core/domain/Endpoint/EndpointUrl';
import EndpointName from '../../../../src/core/domain/Endpoint/EndpointName';

describe('EndpointStatus entity', () => {
  const randomEndpointId = EndpointId.generate();
  const userId = UserId.generate();
  const url = new EndpointUrl('test.com');
  const endpointName = new EndpointName('Test Site');

  it('should generate an id', () => {
    const endpoint1 = Endpoint.create(userId, url, endpointName);
    const endpoin2 = Endpoint.create(userId, url, endpointName);
    should(endpoint1.getId()).be.not.eql(endpoin2.getId());
  });

  it('should fail if the userId is missing', () => {
    should.throws(() => {
      Endpoint.create(null, url, endpointName);
    })
  });

  it('should fail if the host is missing', () => {
    should.throws(() => {
      Endpoint.create(userId, null, endpointName);
    })
  });

  it('should fail if the name is missing', () => {
    should.throws(() => {
      Endpoint.create(userId, url, null);
    })
  });

  context('Update from a health check', () => {
    it('should add a health check information', () => {
      const endpoint = Endpoint.create(userId, url, endpointName);
      endpoint.updateWithHealthCheck(new EndpointUpdatedEventData('id', 'ip', 'host', 123, new Date()));
      should(endpoint.getDailyStatuses()).not.be.empty();
    })
    
    it('should keep the latest 90 daily statuses', () => {
      const now = Date.now();
      const day = 3600 * 24 * 1000;
      const initialDailyStatuses = Array.from({length: 90}).map((o, i) => {
        const d = new Date(now - (i * day));
        return {
          date: d
        }
      });
      const tomorrow = new Date(now + day);
      const endpoint = new Endpoint(randomEndpointId, userId, url, endpointName, tomorrow, initialDailyStatuses, new Date(), 0, null);
      const eventData = new EndpointUpdatedEventData('id', 'ip', 'host', 123, new Date());
      
      endpoint.updateWithHealthCheck(eventData);
      
      should(endpoint.getDailyStatuses()).have.lengthOf(90);
    })

    it('should aggregate the health checks in the same day', () => {
      const today = new Date();
      const endpoint = new Endpoint(randomEndpointId, userId, url, endpointName, new Date(), [], new Date(), 0, null);
      endpoint.updateWithHealthCheck(new EndpointUpdatedEventData('id', 'ip', 'host', 123, today));
      endpoint.updateWithHealthCheck(new EndpointUpdatedEventData('id', 'ip', 'host', 321, today));
      should(endpoint.getDailyStatuses()).have.lengthOf(1);
    })

    it('should add the incident for the day', () => {
      const endpoint = Endpoint.create(userId, url, endpointName);
      const failedHealthCheckEvent = new EndpointUpdatedEventData('id', null, 'host', 0, new Date());      
      endpoint.updateWithHealthCheck(failedHealthCheckEvent);

      const todayStatus = endpoint.getDailyStatuses().shift();

      should(todayStatus.incidents).have.lengthOf(1);
      should(todayStatus.totalSuccessfulHealthChecks).be.eql(0);
    });

    it('should add the incident to an existing aggregated day', () => {
      const today = new Date();
      const initialDailyStatuses = [{
        date: today,
        incidents: [],
        averageResponseTime: 0,
        totalSuccessfulHealthChecks: 0
      }]
      const endpoint = new Endpoint(randomEndpointId, userId, url, endpointName, new Date(), initialDailyStatuses, new Date(), 0, null);
      const failedHealthCheckEvent = new EndpointUpdatedEventData('id', null, 'host', 0, new Date());      
      endpoint.updateWithHealthCheck(failedHealthCheckEvent);

      const todayStatus = endpoint.getDailyStatuses().shift();
      
      should(todayStatus.incidents).have.lengthOf(1);
      should(todayStatus.totalSuccessfulHealthChecks).be.eql(0);
    })

    it('should accumulate multiple failed health checks', () => {
      const endpoint = Endpoint.create(userId, url, endpointName);
      const now = new Date();
      const aMinuteAgo = new Date(now.getTime() - 60*1000);
      const failedHealthCheckEvent1 = new EndpointUpdatedEventData('id', null, 'host', 0, aMinuteAgo);
      const failedHealthCheckEvent2 = new EndpointUpdatedEventData('id', null, 'host', 0, now);
      endpoint.updateWithHealthCheck(failedHealthCheckEvent1);
      endpoint.updateWithHealthCheck(failedHealthCheckEvent2);

      const todayStatus = endpoint.getDailyStatuses().shift();
      should(todayStatus.incidents).have.lengthOf(1);
      should(todayStatus.incidents[0].duration).greaterThanOrEqual(1).and.below(2);
    });

    it('should recaculate the AVG response time on every update', () => {
      const endpoint = Endpoint.create(userId, url, endpointName);
      const now = new Date();
      const successfullHealthCheckEvent1 = new EndpointUpdatedEventData('id', 'ip', 'host', 200, now);
      const successfullHealthCheckEvent2 = new EndpointUpdatedEventData('id', 'ip', 'host', 150, now);
      const successfullHealthCheckEvent3 = new EndpointUpdatedEventData('id', 'ip', 'host', 160, now);
      endpoint.updateWithHealthCheck(successfullHealthCheckEvent1);
      endpoint.updateWithHealthCheck(successfullHealthCheckEvent2);
      endpoint.updateWithHealthCheck(successfullHealthCheckEvent3);

      const todayStatus = endpoint.getDailyStatuses().shift();
      should(todayStatus.averageResponseTime).be.eql(170)
    });

    it('should update the first health check date', () => {
      const endpoint = Endpoint.create(userId, url, endpointName);
      endpoint.updateWithHealthCheck(new EndpointUpdatedEventData('id', 'ip', 'host', 123, new Date()));
      should.exist(endpoint.getFirstHealthCheckDate());
    })

    it('should set the service down date', () => {
      const endpoint = Endpoint.create(userId, url, endpointName);
      endpoint.updateWithHealthCheck(new EndpointUpdatedEventData('id', null, 'host', 0, new Date()));
      should.exist(endpoint.getServiceDownDate());
    })

    it('should increase the downtime minutes after the first fail', () => {
      const now = Date.now();
      const lastFailedDate = new Date(now - (60 * 1000));
      const initialMinutesDown = 10;
      const endpoint = new Endpoint(randomEndpointId, userId, url, endpointName, new Date(), [], new Date(), initialMinutesDown, lastFailedDate);
      
      endpoint.updateWithHealthCheck(new EndpointUpdatedEventData('id', null, 'host', 1, new Date()));
      
      endpoint.getDowntimeMinutes().should.be.greaterThan(initialMinutesDown);
    })

    it('should restore the service down date when the API is OK again', () => {
      const now = Date.now();
      const lastFailedDate = new Date(now - (60 * 1000));
      const initialMinutesDown = 10;
      const endpoint = new Endpoint(randomEndpointId, userId, url, endpointName, new Date(), [], new Date(), initialMinutesDown, lastFailedDate);
      endpoint.updateWithHealthCheck(new EndpointUpdatedEventData('id', 'ip', 'host', 100, new Date()));
      
      endpoint.getDowntimeMinutes().should.be.greaterThan(initialMinutesDown);
      should.not.exist(endpoint.getServiceDownDate());
    });

    it('should keep the service down date after multiple failed checks', () => {
      const now = Date.now();
      const lastFailedDate = new Date(now - (60 * 1000));
      const initialMinutesDown = 10;
      const endpoint = new Endpoint(randomEndpointId, userId, url, endpointName, new Date(), [], new Date(), initialMinutesDown, lastFailedDate);
      endpoint.updateWithHealthCheck(new EndpointUpdatedEventData('id', null, null, 0, new Date()));
      
      should(endpoint.getServiceDownDate()).be.eql(lastFailedDate);
    })
  });

  context('Availability calculation', () => {
    it('should return 0 if there is not first health check date', () => {
      const endpoint = Endpoint.create(userId, url, endpointName);
      const availability = endpoint.getAvailability();

      should(availability).be.eql(0);
    })

    it('should calculate the availability from the first health check', () => {
      const from = new Date(Date.now() - 3600*24*1000);
      const downtimeMinutes = 1;
      const endpoint = new Endpoint(randomEndpointId, userId, url, endpointName, new Date(), [], from, downtimeMinutes, null);
      const availability = endpoint.getAvailability();

      should(availability).be.eql(99.9306);
    })

  })
})
