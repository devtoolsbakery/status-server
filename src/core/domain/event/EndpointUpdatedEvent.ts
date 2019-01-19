import PingResult from "../PingResult";
import Event from './Event';
import EndpointStatus from "../EndpointStatus";

class EndpointUpdatedEventData {
    id: string;
    ip: string;
    host: string;
    time: number;
}

export default class EndpointUpdatedEvent extends Event {
    public static eventName = 'endpoint_updated';

    private constructor(data: EndpointUpdatedEventData) {
        super();
        this.data = data;
    }

    static from(endpointStatus: EndpointStatus): EndpointUpdatedEvent {
        return new EndpointUpdatedEvent({
            id: endpointStatus.getId(),
            ip: endpointStatus.getAddress(),
            host: endpointStatus.getHost(),
            time: endpointStatus.getTime()
        });
    }
}
