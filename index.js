
// Configuration
let endpoints = [
  { name: "Personal site", address: "adrianmato.com" },
  { name: "Lucia's website site", address: "luciagm.net" },
  { name: "PUBG US West", address: "dynamodb.us-west-1.amazonaws.com" },
  { name: "Overwatch US West", address: "24.105.30.129" },
  { name: "Overwatch Korea", address: "211.234.110.1" },
  { name: "Overwatch Taiwan", address: "203.66.81.98" }
];
const dbCollection = "endpoints";
const dbDocument = "feed";
const repeat = 15 * (60 * 1000); // desired minutes translated to milliseconds
const db = require("./src/db");
const pingAll = require("./src/ping")

db.connect();

// Run app
App(endpoints);

async function App(endpoints) {
  let date = new Date();
  console.log(`\n⚡️ Triggered at: ${date.getUTCHours()}:${date.getUTCMinutes()}:${date.getUTCSeconds()} (UTC)\n`);

  try {
    const results = await pingAll(endpoints)
    await Promise.all(results.map(db.writeResult));
  } catch (error) {
    console.log(`\n🛑 ERROR! Exiting app… (${error})`);
    process.exit();
  }

  console.log("\n🏁 Finished!\n");
  setTimeout(() => App(endpoints), repeat);
}
