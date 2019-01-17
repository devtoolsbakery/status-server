import PingResult from "../PingResult";
import Event from './Event';

class EndpointUpdatedEventData {
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

    static from(result: PingResult): EndpointUpdatedEvent {
        return new EndpointUpdatedEvent({
            ip: result.getIp(),
            host: result.getHost(),
            time: result.getTimeInMilliseconds()
        });
    }
}
