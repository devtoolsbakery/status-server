import EndpointUpdatedEventRepository from "../../domain/Endpoint/EndpointUpdatedEventRepository";
import { EndpointUpdatedEventData } from "../../domain/Endpoint/EndpointUpdatedEvent";
import { Firestore } from "@google-cloud/firestore";

const dbCollection = 'endpoints';
const dbDocument = 'feed';

export default class EndpointUpdatedEventFirebaseRepository implements EndpointUpdatedEventRepository {
  
  private connection: Firestore;

  constructor(connection: Firestore) {
    this.connection = connection;
  }

  async save(event: EndpointUpdatedEventData): Promise<void> {
    const feed = this.connection
      .collection(dbCollection)
      .doc(event.id)
      .collection(dbDocument)
      .doc(Date.now().toString());

    await feed.set({
      time: event.time,
      address: event.ip,
      host: event.host
    })
  } 
  
  async findAll(endpointStatusId: string): Promise<EndpointUpdatedEventData[]> {
    const docs = [];

    const querySnapshot = await this.connection
      .collection(dbCollection)
      .doc(endpointStatusId)
      .collection(dbDocument)
      .get();
    
      querySnapshot.forEach(doc => {
        const data = doc.data();
        docs.push(new EndpointUpdatedEventData(endpointStatusId, data.address, data.host, data.time));
    });

    return docs as [EndpointUpdatedEventData];
  }

  async deleteAll(endpointStatusId: string) {
    const docs = await this.connection.collection(dbCollection)
      .doc(endpointStatusId)
      .collection(dbDocument)
      .get();

    docs.forEach(async doc => {
      await this.connection.collection(dbCollection)
        .doc(endpointStatusId)
        .collection(dbDocument)
        .doc(doc.id)
        .delete()
    });
  }


}
