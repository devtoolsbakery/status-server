import EndpointStatus from '../../domain/Endpoint/EndpointStatus';
import EndpointStatusRepository from '../../domain/Endpoint/EndpointStatusRepository';
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
      docs.push(new EndpointStatus(doc.id, data.userId, data.host, data.name, data.date, data.uptime, data.lastHealthChecks));
    });

    return docs as [EndpointStatus];
  }

  async findByUsername(username: string): Promise<EndpointStatus[]> {
    const docs = [];

    const querySnapshot = await this.db
      .collection(dbCollection)
      .where('username', '==', username)
      .get();

    querySnapshot.forEach(doc => {
      const data = doc.data();
      docs.push(new EndpointStatus(doc.id, data.userId, data.host, data.name, data.date, data.uptime, data.lastHealthChecks));
    });

    return docs as [EndpointStatus];  }


  async save (endpoint: EndpointStatus) {
    const entry = {
      document: endpoint.getId().toString(),
      name: endpoint.getName(),
      date: endpoint.getUpdated(),
      host: endpoint.getHost()
    };
    
    await this.db
      .collection(dbCollection)
      .doc(entry.document)
      .set(entry);
  }
}
