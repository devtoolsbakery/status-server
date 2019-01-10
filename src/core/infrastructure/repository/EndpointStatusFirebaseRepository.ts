const firebaseAccount = process.env['NODE_ENV'] == 'test'
  ? require('../../../../serviceAccountTestKey.json')
  : require('../../../../serviceAccountKey.json')

import * as firebase from 'firebase-admin';
import EndpointStatus from '../../domain/EndpointStatus';
import EndpointStatusRepository from '../../domain/EndpointStatusRepository';

const dbCollection = 'endpoints';
const dbDocument = 'feed';

export default class EndpointStatusFirebaseRepository implements EndpointStatusRepository {

  static instance: EndpointStatusFirebaseRepository;

  db;

  static getInstance() {
    if (this.instance) return this.instance;

    this.instance = new EndpointStatusFirebaseRepository();
    this.instance.connect();
    return this.instance;
  }

  connect() {
    firebase.initializeApp({
      credential: firebase.credential.cert(firebaseAccount)
    });
  
    this.db = firebase.firestore();
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
    return new EndpointStatus(doc.id, data.host, data.address, data.name, data.time, data.date)
  }

  findAll() {
    return this.db
      .collection(dbCollection)
      .get()
      .then(querySnapshot => {
        const docs = [];
        querySnapshot.forEach(doc => {
          const data = doc.data();
          docs.push(new EndpointStatus(doc.id, data.host, data.address, data.name, data.time, data.date));
        });
        return docs;
      });
  }

  async save (endpoint) {
    const entry = {
      document: endpoint.getId().toString(),
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

    const feed = this.db
      .collection(dbCollection)
      .doc(entry.document)
      .collection(dbDocument)
      .doc(Date.now().toString());

    await feed.set({
      date: endpoint.getUpdated(),
      time: endpoint.getTime(),
      address: endpoint.getAddress()
    })
  }
}
