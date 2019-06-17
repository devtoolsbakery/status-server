export default interface Configuration {
  pingService: PingServiceConfiguration;
  api: ApiConfiguration
}

export interface PingServiceConfiguration {
  dbUser: string;
  dbPassword: string;
  dbHost: string;
  dbPort: number;
  dbName: string;
  dbUseSSL: boolean;
  dbReplicasetName: string;
  minutesBetweenPings: number;
}

export interface ApiConfiguration {
  port: number;
  dbHost: string;
  dbPort: number;
  dbName: string;  
}
