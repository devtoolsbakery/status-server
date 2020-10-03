import { mock, verify, when, instance, anyOfClass, anything } from "ts-mockito";
import EndpointStatusRepository from "../../../src/core/domain/Endpoint/EndpointStatusRepository";
import PingMeasurer from "../../../src/core/domain/HealthCheck/PingMeasurer";
import EventPublisher from "../../../src/core/domain/Shared/event/EventPublisher";
import PingMeasurerImpl from "../../../src/core/infrastructure/SystemPingMeasurer";
import PubSub from "../../../src/core/infrastructure/event/InProcessPubSub";
import Endpoint from "../../../src/core/domain/Endpoint/Endpoint";
import PingAllEndpoints from "../../../src/core/usecase/PingAllEndpoints";
import EndpointStatusMongoRepository from "../../../src/core/infrastructure/repository/Endpoint/EndpointStatusMongoRepository";
import EndpointId from "../../../src/core/domain/Endpoint/EndpointId";
import UserId from "../../../src/core/domain/Shared/UserId";
import EndpointUrl from "../../../src/core/domain/Endpoint/EndpointUrl";
import EndpointName from "../../../src/core/domain/Endpoint/EndpointName";
import EndpointUpdatedEventRepository from "../../../src/core/domain/HealthCheck/HealthCheckRepository";
import HealthCheckMongoRepository from "../../../src/core/infrastructure/repository/HealthCheck/HealthCheckMongoRepository";
import HealthCheck from "../../../src/core/domain/HealthCheck/HealthCheck";

const endpointId = EndpointId.generate();
const userId = new UserId('userId');
const url = new EndpointUrl('ivanguardado.com');
const name = new EndpointName('Test website');
const endpoint = new Endpoint(endpointId, userId, url, name, new Date(), [], new Date(), 0, null);

export default class PingAllEndpointsUnitTest {

  private mockedEndpointStatusRepository : EndpointStatusRepository = mock(EndpointStatusMongoRepository);
  private mockedHealthCheckRepository : EndpointUpdatedEventRepository = mock(HealthCheckMongoRepository);
  private mockedPingMeasurer: PingMeasurer = mock(PingMeasurerImpl);
  private mockedPubSub: PubSub = mock(PubSub);

  givenMultipleSuccessfullEndpoints(): void {
    const healthCheck = HealthCheck.create(endpoint.getId(), 'success.com', "0.0.0.0", 100);
    this.whenRepositoryFind([endpoint, endpoint]);
    this.whenSuccessfulPing(healthCheck);
  }

  givenSomeFailedEndpoint() {
    this.whenRepositoryFind([endpoint, endpoint]);
    this.whenFailedfulPing();
  }

  whenFailedfulPing() {
    const healthCheck = HealthCheck.create(endpoint.getId(), 'error.com', null, 0);
    when(this.mockedPingMeasurer.ping(anyOfClass(Endpoint))).thenResolve(healthCheck);
  }

  eventPublisherShouldEmitEvent() {
    return verify(this.mockedPubSub.publish(anything()))
  }

  healthCheckRepositoryShouldSave() {
    return verify(this.mockedHealthCheckRepository.save(anyOfClass(HealthCheck)))
  }

  buildPingAllEndpointsUseCase(): PingAllEndpoints {
    return new PingAllEndpoints(
      this.getEndpointStatusRepository(),
      this.getPingMeasurer(),
      this.getEventPublisher(),
      this.healthCheckRepository(),
    );
  }

  private getEndpointStatusRepository(): EndpointStatusRepository {
    return instance(this.mockedEndpointStatusRepository);
  }

  private getPingMeasurer(): PingMeasurer {
    return instance(this.mockedPingMeasurer);
  }

  private getEventPublisher(): EventPublisher {
    return instance(this.mockedPubSub);
  }

  private healthCheckRepository(): EndpointUpdatedEventRepository {
    return instance(this.mockedHealthCheckRepository);
  }

  private whenRepositoryFind(endpoints: Endpoint[]) {
    when(this.mockedEndpointStatusRepository.findAll()).thenResolve(endpoints);
  }

  private whenSuccessfulPing(healthCheck: HealthCheck) {
    when(this.mockedPingMeasurer.ping(anyOfClass(Endpoint))).thenResolve(healthCheck);
  }
}
