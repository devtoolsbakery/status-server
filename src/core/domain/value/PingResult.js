module.exports = class PingResult {
  constructor(host, ip, timeMs) {
    this.host = host;
    this.ip = ip;
    this.timeInMilliseconds = parseInt(timeMs);
  }

  getHost() { return this.host }
  getIp() { return this.ip }
  getTimeInMilliseconds() { return this.timeInMilliseconds }
}
