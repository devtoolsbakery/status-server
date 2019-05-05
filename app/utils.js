// Utilities for different contexts

/**
 * Generate mock data for the card
 * @param {number} dayLimit Days to render (default: 90)
 */
export function loadCardMockData(dayLimit) {
  const endpoints = ['API', 'Production', 'Staging', 'QA'];
  let data = [];

  endpoints.map(endpoint => {
    let days = [];
    let temp;

    // randomize days
    for (let i = 0; i < dayLimit; i++) {
      temp = parseFloat(Math.random().toFixed(1));
      if (i % 2 === 0 || temp < 0.6 || i % 3 === 0) {
        days.push(1.0);
      } else {
        days.push(temp);
      }
    }

    let dataEndpoint = {};
    return data.push(dataEndpoint[endpoint] = {'name': endpoint,'uptime' : 95.7, 'days' : days});
  });

  return data;
}
