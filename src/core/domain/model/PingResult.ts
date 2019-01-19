export default class PingResult {
  host: string;
  ip: string;
  timeInMilliseconds: number;

  constructor(host, ip, timeMs) {
    this.host = host;
    this.ip = ip;
    this.timeInMilliseconds = parseInt(timeMs);
  }

  getHost(): string { return this.host }
  getIp(): string { return this.ip }
  getTimeInMilliseconds(): number { return this.timeInMilliseconds }
}
