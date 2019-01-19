import Application from './Application';
import container from '../DependencyInjection';
import PubSub from '../PubSub';
import EndpointUpdatedEvent, { EndpointUpdatedEventData } from '../../domain/model/event/EndpointUpdatedEvent';
import { lookup } from 'dns';

const saveEndpointUpdatedEvent = container.get('app.usecase.SaveEndpointUpdatedEvent');
const pingAllEndpoints = container.get('app.usecase.PingAllEndpoints');
const listener = container.get('app.domain.PubSub') as PubSub;

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



