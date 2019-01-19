import Event from './Event';

export default interface EventPublisher {
    publish(event: Event): void;
}
