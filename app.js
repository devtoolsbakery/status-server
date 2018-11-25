// Dependencies
let ping = require("ping");
let firebase = require("firebase-admin");
let firebaseAccount = require("./serviceAccountKey.json");

// Configuration
let endpoints = [
  { name: "Personal site", address: "adrianmato.com" },
  { name: "Lucia's website site", address: "luciagm.net" },
  { name: "PUBG US West", address: "dynamodb.us-west-1.amazonaws.com" },
  { name: "Overwatch US West", address: "24.105.30.129" },
  { name: "Overwatch Korea", address: "211.234.110.1" },
  { name: "Overwatch Taiwan", address: "203.66.81.98" }
];
let db;
let dbCollection = "endpoints";
let dbDocument = "feed";

// Run app
App(endpoints);

// Functions
async function App(endpoints) {
  try {
    db = await dbLogin();
    await pingAll(endpoints);
  } catch (error) {
    console.log(`\n🛑 ERROR! Exiting app… (${error})`);
    process.exit();
  }

  console.log("\n🏁 Finished!");
}

async function dbLogin() {
  firebase.initializeApp({
    credential: firebase.credential.cert(firebaseAccount)
  });
  let db = firebase.firestore();

  if (typeof db !== "undefined") {
    db.settings({
      timestampsInSnapshots: true
    });
    console.log("🔑 Logged into Firebase");
    return db;
  }

  throw Error("🛑 Firebase couldn't be initialized");
}

async function pingAll(endpoints) {
  console.log();
  const promises = endpoints.map(host => pingEndpoint(host.address)); // returns an array of promises [p1,p2,p3]
  await Promise.all(promises);

  return promises;
}

async function pingEndpoint(host) {
  let config = {
    timeout: 2
  };
  let result = await ping.promise.probe(host, config);
  if (result.alive === true) {
    console.log(`✅ ${result.time}ms \t ${host}`);
  } else console.log(`🔴 failed \t ${host}`);

  await writeEndpoint(result);
}

async function writeEndpoint(result) {
  let entry = {
    document: result.host,
    response: result.time != "unknown" ? result.time : false,
    address: result.numeric_host,
    date: new Date(Date.now())
  };
  await console.log(entry);

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