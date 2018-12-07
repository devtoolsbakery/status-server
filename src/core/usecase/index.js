const { ping } = require("../domain/service");
const { savePingResult } = require('../domain/service');

module.exports = {
  pingAllEndpoints: require('./pingAllEndpoints')({ savePingResult, ping })
}