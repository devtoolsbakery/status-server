const firebaseAccount = process.env['NODE_ENV'] == 'test'
  ? require('../../../../serviceAccountTestKey.json')
  : require('../../../../serviceAccountKey.json')

import * as firebase from 'firebase-admin';
import { Firestore } from '@google-cloud/firestore';

export default class FirebaseConnection {

  private static db;
  
  static getConnection(): Firestore {
    if (this.db) return this.db;
  
    firebase.initializeApp({
      credential: firebase.credential.cert(firebaseAccount)
    });
  
    this.db = firebase.firestore();

    return this.db;
  }
  
}
