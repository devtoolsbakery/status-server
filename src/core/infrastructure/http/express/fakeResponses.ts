export default {
  'ivanguardado': {
    status: 'FAILURES',
    from: '2019-04-29T22:00:00.000Z',
    to: '2019-04-30T22:09:53.545Z',
    resolution: 'hour',
    endpoints: [
      {
        name: 'Ivan\'s website',
        uptime: 90.00,
        statuses: [
          {
            date: '2019-04-30T22:09:53.545Z',
            status: 'FAILURE'
          },
          {
            date: '2019-04-30T22:10:53.545Z',
            status: 'FAILURE'
          },
          {
            date: '2019-04-30T22:11:53.545Z',
            status: 'FAILURE'
          },
          ,
          {
            date: '2019-04-30T22:2:53.545Z',
            status: 'FAILURE'
          }
        ]
      }
    ]
  },
  'adrianmg': {
    status: 'HEALTH',
    from: '2019-04-29T22:00:00.000Z',
    to: '2019-04-30T22:09:53.545Z',
    resolution: 'hour',
    endpoints: [
      {
        name: 'Ivan\'s website',
        uptime: 90.00,
        statuses: [
          {
            date: '2019-04-30T22:09:53.545Z',
            status: 'OK',
            timeInMs: 110
          },
          {
            date: '2019-04-30T22:10:53.545Z',
            status: 'OK',
            timeInMs: 112
          },
          {
            date: '2019-04-30T22:11:53.545Z',
            status: 'OK',
            timeInMs: 121
          },
          ,
          {
            date: '2019-04-30T22:2:53.545Z',
            status: 'OK',
            timeInMs: 108
          }
        ]
      }
    ]
  },
  'ana': {
    status: 'HEALTH',
    from: '2019-04-29T22:00:00.000Z',
    to: '2019-04-30T22:09:53.545Z',
    resolution: 'hour',
    endpoints: [
      {
        name: 'Ana website',
        uptime: '99.99',
        statuses: [
          {
            date: '2019-04-30T22:09:53.545Z',
            status: 'OK',
            timeInMs: 150
          }
        ]
      }
    ]
  }
}
