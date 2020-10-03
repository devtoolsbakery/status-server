export default class Configuration {
  PingMeasurer = new PingMeasurerConfiguration();
  api = new ApiConfiguration();
}

class PingMeasurerConfiguration {
  dbConnectionString: string = process.env.DB_CONNECTION_STRING;
  minutesBetweenPings: number = 1;
}

class ApiConfiguration {
  port: number = Number(process.env.API_PORT);
}
