import PingAllEndpointsUnitTest from './PingAllEdnpointsUnitTest';

describe('Scenario: Ping all endpoints usecase', () => {

  context('When all endpoints return ok', async () => {

    it('should persist the health check', async () => {
      const testCase = new PingAllEndpointsUnitTest();
      testCase.givenMultipleSuccessfullEndpoints();
      const pingAllEndpoints = testCase.buildPingAllEndpointsUseCase();

      await pingAllEndpoints.execute();

      testCase.healthCheckRepositoryShouldSave();
    });

    it('should emit the endpoint_updated event', async () => {
      const testCase = new PingAllEndpointsUnitTest();
      testCase.givenMultipleSuccessfullEndpoints();
      const pingAllEndpoints = testCase.buildPingAllEndpointsUseCase();

      await pingAllEndpoints.execute();

      testCase.eventPublisherShouldEmitEvent();
    });


  });

  context('When an endpoint fails', async () => {

    it('should emit an event', async () => {
      const testCase = new PingAllEndpointsUnitTest();
      testCase.givenSomeFailedEndpoint();
      const pingAllEndpoints = testCase.buildPingAllEndpointsUseCase();

      await pingAllEndpoints.execute();

      testCase.eventPublisherShouldEmitEvent();
    });

  });

})
