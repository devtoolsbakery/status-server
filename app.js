// Dependencies
let ping = require("ping");
let firebase = require("firebase-admin");
let firebaseAccount = require("./serviceAccountKey.json");

// Configuration
let endpoints = [
  { name: "Personal site", address: "adrianmato.com" },
  { name: "PUBG US West", address: "dynamodb.us-west-1.amazonaws.com" },
  { name: "Overwatch US West", address: "24.105.30.129" },
  { name: "Overwatch Korea", address: "211.234.110.1" },
  { name: "Overwatch Taiwan", address: "203.66.81.98" }
];
let collection = "endpoints";

// Run app
App(endpoints);

// Functions
async function App(endpoints) {
  let db;

  try {
    db = await dbLogin();
    await pingAll(endpoints);
  } catch (error) {
    console.log("\n🛑 ERROR! Exiting app…");
    process.exit();
  }

  await dbSetData(db, collection, "host", "data");
  console.log("\n🏁 Finished!");
}

async function pingAll(endpoints) {
  console.log();
  const promises = endpoints.map(host => pingEndpoint(host.address)); // returns an array of promises [p1,p2,p3]
  await Promise.all(promises);

  return promises;
}

async function pingEndpoint(host) {
  let config = { timeout: 1 };
  let result = await ping.promise.probe(host, config);
  if (result.alive === true) {
    console.log(`✅ ${result.time}ms \t ${host}`);
  } else console.log(`🔴 failed \t ${host}`);

  return result;
}

async function dbLogin() {
  firebase.initializeApp({
    credential: firebase.credential.cert(firebaseAccount)
  });
  let db = firebase.firestore();

  if (typeof db !== "undefined") {
    db.settings({ timestampsInSnapshots: true });
    console.log("🔑 Logged into Firebase");
    return db;
  }

  throw Error("🛑 Firebase couldn't be initialized");
}

async function dbSetData(db, collection, host, data) {
  // console.log(db);
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
      console.log(`\n✏️  Entry created: ${ref.id}`);
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
