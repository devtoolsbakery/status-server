import Event from '../Shared/event/Event';
import EndpointStatus from "./EndpointStatus";
import PingResult from '../HealthCheck/PingResult';

export class EndpointUpdatedEventData {
    private _id: string;
    private _ip: string;
    private _host: string;
    private _time: number;

    constructor(id, ip, host, time) {
        this._id = id;
        this._ip = ip;
        this._host = host;
        this._time = time;
    }

    public get id(): string {
        return this._id;
    }
    public get ip(): string {
        return this._ip;
    }
    public get host(): string {
        return this._host;
    }
    public get time(): number {
        return this._time;
    }
}

export default class EndpointUpdatedEvent extends Event {
    public static eventName = 'endpoint_updated';

    private constructor(data: EndpointUpdatedEventData) {
        super();
        this.data = data;
    }

    static from(endpointId: string, pingResult: PingResult): EndpointUpdatedEvent {
        return new EndpointUpdatedEvent(
            new EndpointUpdatedEventData(
                endpointId,
                pingResult.getIp(),
                pingResult.getHost(),
                pingResult.getTimeInMilliseconds()
            )
        );
    }

    static fromData(data: EndpointUpdatedEventData): EndpointUpdatedEvent {
      return new EndpointUpdatedEvent(data);
    }
}
