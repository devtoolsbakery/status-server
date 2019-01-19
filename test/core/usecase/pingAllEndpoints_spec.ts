import * as should from 'should';
import EndpointStatus from '../../../src/core/domain/model/EndpointStatus';
import EndpointUpdatedEvent from '../../../src/core/domain/model/event/EndpointUpdatedEvent';
import container from '../../../src/core/infrastructure/DependencyInjection';

const pingAllEndpoints = container.get('app.usecase.PingAllEndpoints');
const PubSub = container.get('app.domain.PubSub');
const endpointStatusRepository = container.get('app.domain.EndpointStatusRepository');

describe('Scenario: Ping all endpoints usecase', () => {

  context('When all endpoints return ok', () => {
    
    const web1 = new EndpointStatus('1', 'adrianmato.com', '', 'Adrian Mato Web', 0, null);

    before(_clean);
    before(() => _insertEndpointStatuses([web1]));
    after(_clean)

    it('should save the status', async () => {
      await pingAllEndpoints.execute();
      const statuses = await endpointStatusRepository.findAll();
      should(statuses.length).be.eql(1);
    });

    it('should emit the endpoint_updated event', (done) => {
      PubSub.subscribe(EndpointUpdatedEvent.eventName, data => {
        done();
      });
      pingAllEndpoints.execute();
    });
  });

  context('When some endpoint fails', () => {
    const web1 = new EndpointStatus('1', 'adrianmato.com', '', 'Adrian Mato Web', 0, null);
    const web2 = new EndpointStatus('2', 'invalid.ivanguardado.com', '', 'Ivan Guardado Web', 100, null);
    
    before(_clean);
    before(async () => {
      await _insertEndpointStatuses([web1, web2]);
      await pingAllEndpoints.execute();
    });
    after(_clean);

    it('should save the failed status', async() => {
      const statusWeb2 = await endpointStatusRepository.get(web2.getId());
      should(statusWeb2.getId()).be.eql('2');
      should(statusWeb2.isAlive()).be.eql(false);
    });

    it('should save successful status', async() => {
      const statusWeb1 = await endpointStatusRepository.get(web1.getId());
      should(statusWeb1.getId()).be.eql('1');
      should(statusWeb1.isAlive()).be.eql(true);
    });
  })

  async function _clean() {
    await endpointStatusRepository.deleteAll();
    PubSub.removeAllListeners()
  }

  async function _insertEndpointStatuses(list) {
    return Promise.all(list.map(endpoint => endpointStatusRepository.save(endpoint)));
  }

})
