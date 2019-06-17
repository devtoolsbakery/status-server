import Configuration, { PingServiceConfiguration, ApiConfiguration } from "./Configuration";

export default class DevelopmentConfiguration implements Configuration {
  pingService: PingServiceConfiguration = new PingServiceDevelopmentConfiguration();
  api: ApiConfiguration = new ApiDevelopmentConfiguration();
}

class PingServiceDevelopmentConfiguration implements PingServiceConfiguration {
  dbUser = 'root';
  dbPassword = '';
  dbHost = 'localhost';
  dbPort = 27017;
  dbName = 'endpoint';
  dbUseSSL = false;
  dbReplicasetName = '';
  minutesBetweenPings = 1;
}

class ApiDevelopmentConfiguration implements ApiConfiguration {
  port = 3001;
  dbHost = 'localhost';
  dbPort = 27017;
  dbName ='endpoint';
}
