export default class PingResult {
  host: string;
  ip: string;
  timeInMilliseconds: number;
  date: Date;

  constructor(host, ip, timeMs, date) {
    this.host = host || '';
    this.ip = ip || '';
    this.timeInMilliseconds = parseInt(timeMs || 0);
    this.date = date;
  }

  getHost(): string { return this.host }
  getIp(): string { return this.ip }
  getTimeInMilliseconds(): number { return this.timeInMilliseconds }
  getDate(): Date { return this.date }
}
