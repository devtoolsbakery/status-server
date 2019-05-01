import Application from './Application';
import container from '../DependencyInjection';
import PubSub from '../PubSub';
import EndpointUpdatedEvent, { EndpointUpdatedEventData } from '../../domain/model/event/EndpointUpdatedEvent';
import SaveEndpointUpdatedEvent from '../../usecase/SaveEndpointUpdatedEvent';
import PingAllEndpoints from '../../usecase/PingAllEndpoints';

const saveEndpointUpdatedEvent = container.get('core.usecase.SaveEndpointUpdatedEvent', SaveEndpointUpdatedEvent);
const listener = container.get('core.infrastructure.PubSub', PubSub);
const pingAllEndpoints = container.get('core.usecase.PingAllEndpoints', PingAllEndpoints);

export default class Standalone implements Application {
  
  async run() {
    listener.subscribe(EndpointUpdatedEvent.eventName, (message) => {
      const data = message.data;
      const eventData = new EndpointUpdatedEventData(data.id, data.ip, data.host, data.time);
      saveEndpointUpdatedEvent.execute(EndpointUpdatedEvent.fromData(eventData));
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



