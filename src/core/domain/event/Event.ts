export default abstract class Event {
    public static eventName: string;
    protected data;

    public getName() { return this.constructor['eventName']; }
    public getData() { return this.data }
}
