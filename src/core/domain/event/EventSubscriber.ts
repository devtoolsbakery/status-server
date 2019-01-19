export default interface EventSubscriber {
    subscribe(eventName: string, fn: (data: any) => void) : void
}
