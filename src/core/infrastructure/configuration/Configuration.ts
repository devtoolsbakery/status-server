export default interface Configuration {
  pingService: PingServiceConfiguration;
  api: ApiConfiguration
}

export interface PingServiceConfiguration {
  dbHost: string;
  dbPort: number;
  dbName: string;
  minutesBetweenPings: number;  
}

export interface ApiConfiguration {
  port: number;
  dbHost: string;
  dbPort: number;
  dbName: string;  
}
