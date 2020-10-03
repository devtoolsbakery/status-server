import { mock, verify, when, instance, anyOfClass, anything } from "ts-mockito";
import EndpointStatusRepository from "../../../src/core/domain/Endpoint/EndpointStatusRepository";
import PingMeasurer from "../../../src/core/domain/HealthCheck/PingMeasurer";
import EventPublisher from "../../../src/core/domain/Shared/event/EventPublisher";
import PingMeasurerImpl from "../../../src/core/infrastructure/SystemPingMeasurer";
import PubSub from "../../../src/core/infrastructure/event/InProcessPubSub";
import Endpoint from "../../../src/core/domain/Endpoint/Endpoint";
import PingResult from "../../../src/core/domain/HealthCheck/PingResult";
import PingAllEndpoints from "../../../src/core/usecase/PingAllEndpoints";
import EndpointStatusMongoRepository from "../../../src/core/infrastructure/repository/Endpoint/EndpointStatusMongoRepository";
import EndpointId from "../../../src/core/domain/Endpoint/EndpointId";
import UserId from "../../../src/core/domain/Shared/UserId";
import EndpointUrl from "../../../src/core/domain/Endpoint/EndpointUrl";
import EndpointName from "../../../src/core/domain/Endpoint/EndpointName";

const endpointId = EndpointId.generate();
const userId = new UserId('userId');
const url = new EndpointUrl('ivanguardado.com');
const name = new EndpointName('Test website');
const endpoint = new Endpoint(endpointId, userId, url, name, new Date(), [], new Date(), 0, null);

export default class PingAllEndpointsUnitTest {

  private mockedEndpointStatusRepository: EndpointStatusRepository = mock(EndpointStatusMongoRepository);
  private mockedPingMeasurer: PingMeasurer = mock(PingMeasurerImpl);
  private mockedPubSub: PubSub = mock(PubSub);

  givenMultipleSuccessfullEndpoints(): void {
    this.whenRepositoryFind([endpoint, endpoint]);
    this.whenSuccessfulPing(new PingResult('', '', 100, new Date()));
  }

  givenSomeFailedEndpoint() {
    this.whenRepositoryFind([endpoint, endpoint]);
    this.whenFailedfulPing();
  }

  whenFailedfulPing() {
    const pingResult = new PingResult('error.com', null, 0, new Date());
    when(this.mockedPingMeasurer.ping(anyOfClass(Endpoint))).thenResolve(pingResult);
  }

  eventPublisherShouldEmitEvent() {
    verify(this.mockedPubSub.publish(anything())).twice();
  }

  repositoryShouldSave() {
    verify(this.mockedEndpointStatusRepository.save(anyOfClass(Endpoint))).twice();
  }

  buildPingAllEndpointsUseCase(): PingAllEndpoints {
    return new PingAllEndpoints(
      this.getEndpointStatusRepository(),
      this.getPingMeasurer(),
      this.getEventPublisher()
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

  private whenRepositoryFind(endpoints: Endpoint[]) {
    when(this.mockedEndpointStatusRepository.findAll()).thenResolve(endpoints);
  }

  private whenSuccessfulPing(pingResult: PingResult) {
    when(this.mockedPingMeasurer.ping(anyOfClass(Endpoint))).thenResolve(pingResult);
  }
}
