import {EventEmitter} from 'events';
import Event from '../domain/Shared/event/Event';
import EventPublisher from "../domain/Shared/event/EventPublisher";
import EventSubscriber from '../domain/Shared/event/EventSubscriber';


export default class PubSub implements EventPublisher, EventSubscriber {

    emitter: EventEmitter;

    constructor() {
        this.emitter = new EventEmitter();
    }

    publish(event: Event): void {
        const json = event.getJSON();
        this.emitter.emit(json.event, json);
    }

    subscribe<T extends Event>(e: any, fn: (data: T) => void): void {
      this.emitter.addListener(e.eventName, (event) => {
        fn(new e(event.data))
      });
    }

    removeAllListeners() {
        this.emitter = new EventEmitter();
    }

}
