import {EventEmitter} from 'events';
import Event from '../domain/model/event/Event';
import EventPublisher from "../domain/model/event/EventPublisher";
import EventSubscriber from '../domain/model/event/EventSubscriber';


export default class PubSub implements EventPublisher, EventSubscriber {
    
    emitter: EventEmitter;

    constructor() {
        this.emitter = new EventEmitter();
    }

    publish(event: Event): void {
        const json = event.getJSON();
        this.emitter.emit(json.event, json);
    }

    subscribe(eventName: string, fn: (data: any) => void): void {
        this.emitter.addListener(eventName, fn);
    }

    removeAllListeners() {
        this.emitter = new EventEmitter();
    }

}
