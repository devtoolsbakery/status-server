const { pingAllEndpoints } = require('./src/core/usecase');
const EndpointStatus = require('./src/core/domain/entity/EndpointStatus');

// Configuration
const endpoints = [
  new EndpointStatus(1, "adrianmato.com", "Adrian Mato Web", "up", 215, Date.now())
];
const repeat = 15 * (60 * 1000); // desired minutes translated to milliseconds

// Run app
App(endpoints);

async function App(endpoints) {
  const date = new Date();
  console.log(`\n⚡️ Triggered at: ${date.getUTCHours()}:${date.getUTCMinutes()}:${date.getUTCSeconds()} (UTC)\n`);
  
  try {
    await pingAllEndpoints(endpoints)
  } 
  catch (error) {
    console.error(`\n🛑 ERROR! Exiting app… (${error})`);
    process.exit();
  }

  console.log("\n🏁 Finished!\n");
  setTimeout(() => App(endpoints), repeat);
}
