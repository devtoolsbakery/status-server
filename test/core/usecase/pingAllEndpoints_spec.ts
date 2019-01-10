const should = require('should');
const EndpointStatus = require('../../../src/core/domain/EndpointStatus');
const endpointStatusRepository = require('../../../src/core/infrastructure/repository/EndpointStatusFirebaseRepository').getInstance();
import { pingAllEndpoints } from '../../../src/core/usecase';

describe('Scenario: Ping all endpoints usecase', () => {

  context('When all endpoints return ok', () => {
    
    const web1 = new EndpointStatus('1', 'adrianmato.com', '', 'Adrian Mato Web', 0, null);
    const web2 = new EndpointStatus('2', 'ivanguardado.com', '', 'Ivan Guardado Web', 0, null);

    before(async () => await endpointStatusRepository.deleteAll());
    before(() => endpointStatusRepository.save(web1));
    before(() => endpointStatusRepository.save(web2));

    it('should save the statuses', async () => {
      await pingAllEndpoints();
      const statuses = await endpointStatusRepository.findAll();
      should(statuses.length).be.eql(2);
    });
  })

  context('When some endpoint fails', () => {
    const web1 = new EndpointStatus('1', 'adrianmato.com', '', 'Adrian Mato Web', 0, null);
    const web2 = new EndpointStatus('2', 'invalid.ivanguardado.com', '', 'Ivan Guardado Web', 100, null);
    
    before(async () => {
      await endpointStatusRepository.deleteAll()
      await endpointStatusRepository.save(web1);
      await endpointStatusRepository.save(web2);
      const endpoints = [
        web1,
        web2        
      ]
      await pingAllEndpoints();
    });

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

})
