import Application from './Application';
import container from '../DependencyInjection';
import PubSub from '../PubSub';
import EndpointUpdatedEvent, { EndpointUpdatedEventData } from '../../domain/Endpoint/EndpointUpdatedEvent';
import SaveHealthCheck from '../../usecase/SaveHealthCheck';
import PingAllEndpoints from '../../usecase/PingAllEndpoints';
import { connect } from 'mongoose';
import Configuration from '../configuration/Configuration';

const saveHealthCheck = container.getAs('core.usecase.SaveHealthCheck', SaveHealthCheck);
const listener = container.getAs('core.infrastructure.PubSub', PubSub);
const pingAllEndpoints = container.getAs('core.usecase.PingAllEndpoints', PingAllEndpoints);
const config: Configuration = container.get('app.configuration');

const MINUTE_MS = 60000;

export default class Standalone implements Application {

  async run() {

    const dbConnectionString = config.pingService.dbConnectionString;
    connect(dbConnectionString, { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: false });

    listener.subscribe(EndpointUpdatedEvent.eventName, (message) => {
      const data = message.data;
      const eventData = new EndpointUpdatedEventData(data.id, data.ip, data.host, data.time, data.date);
      saveHealthCheck.execute(EndpointUpdatedEvent.fromData(eventData));
    });

    this.loop();
  }

  async loop() {
    try {
      await pingAllEndpoints.execute();
      setTimeout(() => this.loop(), config.pingService.minutesBetweenPings * MINUTE_MS);
    }
    catch(e) {
      console.error(e);
    }
  }
}



