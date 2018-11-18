// Configuration
let ping = require("ping");
let endpoints = [
  { name: "Personal site", address: "adrianmato.com" },
  { name: "PUBG US West", address: "dynamodb.us-west-1.amazonaws.com" },
  { name: "Overwatch US West", address: "24.105.30.129" },
  { name: "Overwatch Korea", address: "211.234.110.1" },
  { name: "Overwatch Taiwan", address: "203.66.81.98" }
];

// Connect to Firebase
let db = firebaseLogin();
db.settings({ timestampsInSnapshots: true });

let allPingPromises = endpoints.map(host => {
  return pingHost(host);
});
Promise.all(allPingPromises).then(() => {
  if (typeof db !== "undefined") {
    console.log("\n🏁 Promises finished!");
  }
});

// Functions
function pingHost(endpoint) {
  return ping.promise.probe(endpoint.address).then(result => {
    console.log(`\n${endpoint.name} (${endpoint.address})`);
    if (result.alive === true) {
      console.log(`✅ ${result.time}ms`);
    } else console.log(`🔴 failed`);

    firebaseSetData(db, "endpoints", endpoint, {
      date: new Date(),
      response: result.time
    });
  });
}

function firebaseLogin() {
  let firebase = require("firebase-admin");
  let firebaseAccount = require("./serviceAccountKey.json");

  firebase.initializeApp({
    credential: firebase.credential.cert(firebaseAccount)
  });

  console.log(`\n🔑 Logged into Firebase`);
  return firebase.firestore();
}

function firebaseGetData(db, collection) {
  db.collection(collection)
    .get()
    .then(snapshot => {
      console.log("\n📄 Data retrieved:");

      snapshot.forEach(doc => {
        console.log(doc.data());
      });
    })
    .catch(error => {
      console.log(`Error: ${error}`);
    });
}

function firebaseSetData(db, collection, endpoint, data) {
  // Create an entry in the feed and update parent collection fields
  let document = endpoint.address;

  return db
    .collection(collection)
    .doc(document)
    .collection("feed")
    .add({ data })
    .then(ref => {
      console.log(`✏️  New entry created: ${ref.id}`);
    })
    .then(() => {
      db.collection(collection)
        .doc(document)
        .set({
          name: endpoint.name,
          updated: data.date,
          status: data.response != "unknown" ? true : false
        });
    });
}
