import PingMeasurer from '../domain/HealthCheck/PingMeasurer';
import * as ping from 'ping';
import Endpoint from '../domain/Endpoint/Endpoint';
import HealthCheck from '../domain/HealthCheck/HealthCheck';

export default class implements PingMeasurer {

  async ping(endpointStatus: Endpoint): Promise<HealthCheck> {
    const config = {};
    const host = endpointStatus.getUrl().getValue();
    const result = await ping.promise.probe(host, config);

    return HealthCheck.create(endpointStatus.getId(), host, result.numeric_host, this.getTime(result))
  }

  private getTime(result) {
    if (result.time === 'unknown') {
      return null;
    }

    return result.time;
  }
}
