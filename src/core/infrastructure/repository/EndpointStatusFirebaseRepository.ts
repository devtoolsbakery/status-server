import EndpointStatus from '../../domain/model/EndpointStatus';
import EndpointStatusRepository from '../../domain/model/EndpointStatusRepository';
import { Firestore } from '@google-cloud/firestore';

const dbCollection = 'endpoints';
const dbDocument = 'feed';

export default class EndpointStatusFirebaseRepository implements EndpointStatusRepository {

  private db: Firestore;
  
  constructor(db: Firestore) {
    this.db = db;
  }

  async deleteAll() {
    const docs = await this.db.collection(dbCollection).get();
    docs.forEach(async doc => {
      await this.db.collection(dbCollection).doc(doc.id).delete()
    });
  }

  async get(id) {
    const doc = await this.db.collection(dbCollection).doc(id).get();
    const data = doc.data();
    return new EndpointStatus(doc.id, data.username, data.host, data.address, data.name, data.time, data.date)
  }

  async findAll() {
    const docs = [];

    const querySnapshot = await this.db
      .collection(dbCollection)
      .get();

    querySnapshot.forEach(doc => {
      const data = doc.data();
      docs.push(new EndpointStatus(doc.id, data.username, data.host, data.address, data.name, data.time, data.date));
    });

    return docs as [EndpointStatus];
  }

  async save (endpoint) {
    const entry = {
      document: endpoint.getId().toString(),
      username: endpoint.getUsername(),
      name: endpoint.getName(),
      address: endpoint.getAddress(),
      time: endpoint.getTime(),
      date: endpoint.getUpdated(),
      host: endpoint.getHost()
    };
    
    await this.db
      .collection(dbCollection)
      .doc(entry.document)
      .set(entry);
  }
}
