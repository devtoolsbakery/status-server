const firebase = require('firebase-admin');
const dbCollection = 'endpoints';
const dbDocument = 'feed';
const firebaseAccount = require('../../../../serviceAccountKey.json');

module.exports = class EndpointStatusFirebaseRepository {

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

  async save (endpoint) {
    const entry = {
      document: endpoint.getName(),
      response: endpoint.getStatus(),
      address: endpoint.getAddress(),
      time: endpoint.getTime(),
      date: endpoint.getUpdated()
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