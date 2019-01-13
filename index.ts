/* eslint-disable no-console */

import container from './src/core/infrastructure/DependencyInjection';

const pingAllEndpoints = container.get('app.usecase.PingAllEndpoints');

const repeat = 15 * (60 * 1000); // desired minutes translated to milliseconds

// Run app
App();

async function App() {
  const date = new Date();
  console.log(`\n⚡️ Triggered at: ${date.getUTCHours()}:${date.getUTCMinutes()}:${date.getUTCSeconds()} (UTC)\n`);
  
  try {
    await pingAllEndpoints.execute();
  } 
  catch (error) {
    console.error(`\n🛑 ERROR! Exiting app… (${error})`);
    process.exit();
  }

  console.log('\n🏁 Finished!\n');
  setTimeout(() => App(), repeat);
}
