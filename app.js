// Configuration
let ping = require("ping");
let endpoints = [
  { name: "Personal site", address: "adrianmato.com" },
  { name: "PUBG US West", address: "dynamodb.us-west-1.amazonaws.com" },
  { name: "Overwatch US West", address: "24.105.30.129" },
  { name: "Overwatch Korea", address: "211.234.110.1" },
  { name: "Overwatch Taiwan", address: "203.66.81.98" }
];

let allPingPromises = endpoints.map(host => {
  return pingHost(host);
});
Promise.all(allPingPromises).then(() => {
  // Get data from firebase
  // @TODO: Write instead of read (I'm currently just testing this)
  let db = firebaseLogin();
  if (typeof db !== "undefined") {
    firebaseGetData(db, "endpoints");
  }
});

// Functions
function pingHost(endpoint) {
  return ping.promise.probe(endpoint.address).then(result => {
    console.log(`\n${endpoint.name} (${endpoint.address})`);
    if (result.alive === true) {
      console.log(`✅ ${result.time}ms`);
    } else console.log(`🔴 failed`);

    savePing();
  });
}

function savePing() {
  console.log("⏳ saving data…");
}

function firebaseLogin() {
  let firebase = require("firebase-admin");
  let firebaseAccount = require("./serviceAccountKey.json");

  firebase.initializeApp({
    credential: firebase.credential.cert(firebaseAccount)
  });

  console.log(`\n 🔑 Logged into Firebase`);
  return firebase.firestore();
}

function firebaseGetData(db, collection) {
  db.collection(collection)
    .get()
    .then(snapshot => {
      console.log("\n📄 Data retrieved: \n");

      snapshot.forEach(doc => {
        console.log(doc.data());
      });
    })
    .catch(error => {
      console.log(`Error: ${error}`);
    });
}
