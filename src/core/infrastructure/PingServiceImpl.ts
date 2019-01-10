/* eslint-disable no-console */

import PingService from '../domain/service/PingService';
import PingResult from '../domain/PingResult';
import * as ping from 'ping';

export default class PingServiceImpl implements PingService {

  async ping(host: string): Promise<PingResult> {
    const config = {};
  
    const result = await ping.promise.probe(host, config);
  
    const pingResult = new PingResult(result.host, result.numeric_host, result.time);
  
    if (result.alive) {
      console.log(`✅ ${pingResult.getTimeInMilliseconds()}ms \t ${host}`);
    } else console.log(`🔴 failed \t ${host}`);
  
    return pingResult;
  }

}
