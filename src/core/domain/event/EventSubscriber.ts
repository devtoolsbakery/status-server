export default interface EventSubscriber {
    subscribe(eventName: string, fn: (data: Map<string, string>) => void) : void
}
