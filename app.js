// import libraries
let ping = require("ping");
let endpoints = [
  { name: "Personal site", address: "adrianmato.com" },
  { name: "PUBG US West", address: "dynamodb.us-west-1.amazonaws.com" },
  { name: "Overwatch US West", address: "24.105.30.129" },
  { name: "Overwatch Korea", address: "211.234.110.1" },
  { name: "Overwatch Taiwan", address: "203.66.81.98" }
];

endpoints.forEach(host => {
  pingHost(host);
});

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
  // saves last registry in firebase
  console.log("⏳ saving data…");
}
