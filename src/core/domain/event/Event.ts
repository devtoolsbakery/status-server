export default abstract class Event {
    
    public static eventName: string;
    protected data;
    protected version = '1.0';

    public getData() {
        return this.data;
    }

    public getJSON() {
        return {
            event: this.constructor['eventName'],
            version: this.version,
            data: this.data
        }

    }
}
