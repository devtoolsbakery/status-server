export default class Configuration {
  pingService = new PingServiceConfiguration();
  api = new ApiConfiguration();
}

class PingServiceConfiguration {
  dbConnectionString: string = process.env.DB_CONNECTION_STRING;
  minutesBetweenPings: number = 1;
}

class ApiConfiguration {
  port: number = Number(process.env.API_PORT);
}
