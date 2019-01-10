import PingResult from '../PingResult';

export default interface PingService {
  ping(host: string): Promise<PingResult>
}
