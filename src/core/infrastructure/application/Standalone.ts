import Application from './Application';
import container from '../DependencyInjection';
import PubSub from '../PubSub';
import EndpointUpdatedEvent, { EndpointUpdatedEventData } from '../../domain/Endpoint/EndpointUpdatedEvent';
import SaveHealthCheck from '../../usecase/SaveHealthCheck';
import PingAllEndpoints from '../../usecase/PingAllEndpoints';
import { connect } from 'mongoose';

const saveHealthCheck = container.get('core.usecase.SaveHealthCheck', SaveHealthCheck);
const listener = container.get('core.infrastructure.PubSub', PubSub);
const pingAllEndpoints = container.get('core.usecase.PingAllEndpoints', PingAllEndpoints);

export default class Standalone implements Application {
  
  async run() {
    
    connect('mongodb://localhost:27017/endpoint', { useNewUrlParser: true });

    listener.subscribe(EndpointUpdatedEvent.eventName, (message) => {
      const data = message.data;
      const eventData = new EndpointUpdatedEventData(data.id, data.ip, data.host, data.time);
      saveHealthCheck.execute(EndpointUpdatedEvent.fromData(eventData));
    });
    
    this.loop(); 
  }

  async loop() {
    try {
      await pingAllEndpoints.execute();
      setTimeout(() => this.loop(), 60000);
    }
    catch(e) {
      console.error(e);
    }
  }
}



