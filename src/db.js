let firebase = require("firebase-admin");
//let firebaseAccount = require("./serviceAccountKey.json");

module.exports = function dbLogin() {
  let db;

  return {
    connect: () => {
      if (typeof db !== "undefined") {
        return db;
      }
  
      firebase.initializeApp({
        credential: firebase.credential.cert(firebaseAccount)
      });
    
      db = firebase.firestore();
      if (typeof db !== "undefined") {
        db.settings({
          timestampsInSnapshots: true
        });
        console.log("🔑 Logged into Firebase");
        return db;
      }
    
      throw Error("🛑 Firebase couldn't be initialized");
    },

    writeResult: async (result) => {
      let entry = {
        document: result.host,
        response: result.time != "unknown" ? result.time : false,
        address: result.numeric_host,
        date: new Date(Date.now())
      };
    
      try {
        // Add or update existing endpoint
        let endpoint = db.collection(dbCollection).doc(entry.document);
        await endpoint.set({
          name: entry.document,
          updated: entry.date,
          status: entry.response,
          address: entry.address
        })
        console.log(`✏️  endpoint added/updated`)
    
        // Add new entry under the feed of the endpoint
        let feed = db.collection(dbCollection).doc(entry.document).collection(dbDocument).doc(Date.now().toString());
        await feed.set({
          date: entry.date,
          response: entry.response,
          address: entry.address
        })
        console.log(`✏️  entry added under '${entry.document}'`)
      } catch (error) {
        console.log(`\n🛑 ERROR! Couldn't write into database… (${error})`);
      }
    }
  }

}()