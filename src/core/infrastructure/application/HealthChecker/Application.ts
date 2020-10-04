import { default as BaseApplication } from "../Application";
import container from '../../di';
import HealthCheckCreated, { HealthCheckCreatedData } from '../../../domain/HealthCheck/HealthCheckCreated';
import PingAllEndpoints from '../../../usecase/PingAllEndpoints';
import { connect } from 'mongoose';
import Configuration from '../../configuration/Configuration';
import UpdateEndpointStatus from '../../../usecase/UpdateEndpointStatus';
import InProcessPubSub from '../../event/InProcessPubSub';

const updateEndpointStatus = container.getAs('core.usecase.UpdateEndpointStatus', UpdateEndpointStatus)
const listener = container.getAs('core.infrastructure.InProcessPubSub', InProcessPubSub);
const pingAllEndpoints = container.getAs('core.usecase.PingAllEndpoints', PingAllEndpoints);
const config: Configuration = container.get('app.configuration');

const MINUTE_MS = 60000;

export default class Application implements BaseApplication {

  async run() {

    const dbConnectionString = config.healthChecker.dbConnectionString;
    connect(dbConnectionString, { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: false });

    listener.subscribe(HealthCheckCreated, async (message: HealthCheckCreated) => {
      const eventData: HealthCheckCreatedData = message.getData();

      updateEndpointStatus.execute(eventData.healthCheckId)
    })

    this.loop();
  }

  async loop() {
    try {
      await pingAllEndpoints.execute();
      setTimeout(() => this.loop(), config.healthChecker.minutesBetweenChecks * MINUTE_MS);
    }
    catch(e) {
      console.error(e);
    }
  }
}



