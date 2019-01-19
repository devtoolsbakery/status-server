export default abstract class Event {
    
    public static eventName: string;
    protected data;
    protected version = '1.0';

    public getJSON() {
        return {
            event: this.constructor['eventName'],
            version: this.version,
            data: this.data
        }

    }
}
