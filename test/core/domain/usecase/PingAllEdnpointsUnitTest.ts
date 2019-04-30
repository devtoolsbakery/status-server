import { mock, verify, when, instance, anyOfClass, anything } from "ts-mockito";
import EndpointStatusRepository from "../../../../src/core/domain/model/EndpointStatusRepository";
import EndpointStatusFirebaseRepository from "../../../../src/core/infrastructure/repository/EndpointStatusFirebaseRepository";
import PingService from "../../../../src/core/domain/model/service/PingService";
import EventPublisher from "../../../../src/core/domain/model/event/EventPublisher";
import PingServiceImpl from "../../../../src/core/infrastructure/PingService";
import PubSub from "../../../../src/core/infrastructure/PubSub";
import EndpointStatus from "../../../../src/core/domain/model/EndpointStatus";
import PingResult from "../../../../src/core/domain/model/PingResult";
import PingAllEndpoints from "../../../../src/core/domain/usecase/PingAllEndpoints";

const endpoint = new EndpointStatus('1', 'ivangc', 'ivanguardado.com', '', 'Ivan Site', 0, null);

export default class PingAllEndpointsUnitTest {

  private mockedEndpointStatusRepository: EndpointStatusRepository = mock(EndpointStatusFirebaseRepository);
  private mockedPingService: PingService = mock(PingServiceImpl);
  private mockedPubSub: PubSub = mock(PubSub);

  givenMultipleSuccessfullEndpoints(): void {
    this.whenRepositoryFind([endpoint, endpoint]);
    this.whenSuccessfulPing(new PingResult('', '', 100));
  }

  givenSomeFailedEndpoint() {
    this.whenRepositoryFind([endpoint, endpoint]);
    this.whenFailedfulPing();
  }
  
  whenFailedfulPing() {
    const pingResult = new PingResult('error.com', null, 0);
    when(this.mockedPingService.ping(anyOfClass(EndpointStatus))).thenResolve(pingResult);
  }

  eventPublisherShouldEmitEvent() {
    verify(this.mockedPubSub.publish(anything())).twice();
  }

  repositoryShouldSave() {
    verify(this.mockedEndpointStatusRepository.save(anyOfClass(EndpointStatus))).twice();
  }

  buildPingAllEndpointsUseCase(): PingAllEndpoints {
    return new PingAllEndpoints(
      this.getEndpointStatusRepository(),
      this.getPingService(),
      this.getEventPublisher()
    );
  }

  private getEndpointStatusRepository(): EndpointStatusRepository {
    return instance(this.mockedEndpointStatusRepository);
  }

  private getPingService(): PingService {
    return instance(this.mockedPingService);
  }

  private getEventPublisher(): EventPublisher {
    return instance(this.mockedPubSub);
  }

  private whenRepositoryFind(endpoints: EndpointStatus[]) {
    when(this.mockedEndpointStatusRepository.findAll()).thenResolve(endpoints);
  }

  private whenSuccessfulPing(pingResult: PingResult) {
    when(this.mockedPingService.ping(anyOfClass(EndpointStatus))).thenResolve(pingResult);
  }
}
