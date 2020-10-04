export default class Configuration {
  healthChecker = new HealthCheckerConfiguration();
  api = new ApiConfiguration();
}

class HealthCheckerConfiguration {
  dbConnectionString: string = process.env.DB_CONNECTION_STRING;
  minutesBetweenChecks: number = 1;
}

class ApiConfiguration {
  port: number = Number(process.env.API_PORT);
}
