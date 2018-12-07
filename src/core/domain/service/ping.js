const assert = require('assert');
const PingResult = require('../value/PingResult');
const TIMEOUT_IN_SECONDS = 1;

module.exports = ({ pingImpl }) => async host => {
  const result = await pingImpl({ host, timeout: TIMEOUT_IN_SECONDS })
  assert.ok(result instanceof PingResult, 'It should return a PingResult value')
  return result  
}
