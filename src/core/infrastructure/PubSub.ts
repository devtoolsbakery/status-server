import {EventEmitter} from 'events';
import Event from '../domain/event/Event';
import EventPublisher from "../domain/event/EventPublisher";
import EventSubscriber from '../domain/event/EventSubscriber';


export default class PubSub implements EventPublisher, EventSubscriber {
    
    emitter: EventEmitter;

    constructor() {
        this.emitter = new EventEmitter();
    }

    publish(event: Event): void {
        const json = event.getJSON();
        this.emitter.emit(json.event, json);
    }

    subscribe(eventName: string, fn: (data: Map<string, string>) => void): void {
        this.emitter.addListener(eventName, fn);
    }

    removeAllListeners() {
        this.emitter = new EventEmitter();
    }

}
