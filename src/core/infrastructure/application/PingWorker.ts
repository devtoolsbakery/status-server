import Application from './Application';
import container from '../di';
import EndpointUpdatedEvent, { EndpointUpdatedEventData } from '../../domain/Endpoint/EndpointUpdatedEvent';
import PingAllEndpoints from '../../usecase/PingAllEndpoints';
import { connect } from 'mongoose';
import Configuration from '../configuration/Configuration';
import UpdateEndpointStatus from '../../usecase/UpdateEndpointStatus';
import InProcessPubSub from '../event/InProcessPubSub';

const updateEndpointStatus = container.getAs('core.usecase.UpdateEndpointStatus', UpdateEndpointStatus)
const listener = container.getAs('core.infrastructure.InProcessPubSub', InProcessPubSub);
const pingAllEndpoints = container.getAs('core.usecase.PingAllEndpoints', PingAllEndpoints);
const config: Configuration = container.get('app.configuration');

const MINUTE_MS = 60000;

export default class Standalone implements Application {

  async run() {

    const dbConnectionString = config.PingMeasurer.dbConnectionString;
    connect(dbConnectionString, { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: false });

    listener.subscribe(EndpointUpdatedEvent, async (message: EndpointUpdatedEvent) => {
      const eventData: EndpointUpdatedEventData = message.getData();

      updateEndpointStatus.execute(eventData)
    })

    listener.subscribe(EndpointUpdatedEvent, (message: EndpointUpdatedEvent) => {
      const eventData: EndpointUpdatedEventData = message.getData();

      if (eventData.time > 0) {
        console.log(`✅ ${eventData.time}ms \t ${eventData.host}`);
      } else console.log(`🔴 failed \t ${eventData.host}`);
    })

    this.loop();
  }

  async loop() {
    try {
      await pingAllEndpoints.execute();
      setTimeout(() => this.loop(), config.PingMeasurer.minutesBetweenPings * MINUTE_MS);
    }
    catch(e) {
      console.error(e);
    }
  }
}



