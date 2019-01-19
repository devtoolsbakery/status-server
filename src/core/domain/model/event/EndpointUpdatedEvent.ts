import Event from './Event';
import EndpointStatus from "../EndpointStatus";

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

    static from(endpointStatus: EndpointStatus): EndpointUpdatedEvent {
        return new EndpointUpdatedEvent(
            new EndpointUpdatedEventData(
                endpointStatus.getId(),
                endpointStatus.getAddress(),
                endpointStatus.getHost(),
                endpointStatus.getTime()
            )
        );
    }

    static fromData(data: EndpointUpdatedEventData): EndpointUpdatedEvent {
      return new EndpointUpdatedEvent(data);
    }
}
