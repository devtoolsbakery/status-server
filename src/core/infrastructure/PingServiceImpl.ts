/* eslint-disable no-console */

import PingService from '../domain/service/PingService';
import PingResult from '../domain/PingResult';
import * as ping from 'ping';
import EndpointStatus from '../domain/EndpointStatus';

export default class PingServiceImpl implements PingService {

  async ping(endpointStatus: EndpointStatus): Promise<PingResult> {
    const config = {};
    const host = endpointStatus.getHost();
    const result = await ping.promise.probe(host, config);
  
    const pingResult = new PingResult(result.host, result.numeric_host, result.time);
  
    if (result.alive) {
      console.log(`✅ ${pingResult.getTimeInMilliseconds()}ms \t ${host}`);
    } else console.log(`🔴 failed \t ${host}`);
  
    return pingResult;
  }

}
