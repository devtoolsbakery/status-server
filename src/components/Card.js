import React, { Component } from 'react';
import '../css/components/Card.css';
const THRESHOLD = 0.7;
const ENDPOINTS = ['API', 'Production', 'Staging', 'QA'];

class Card extends Component {
  constructor(props) {
    super();

    this.state = {
      data : this.loadMockData(props.dayLimit)
    }
  }

  render() {
    return (
      <div className="card__module">
        <div className="card">
          <h1 className="card__title card__title--online">{this.props.name}</h1>
          <div className='card__container'>
          {
            this.state.data.map((endpoint, i) => {
              return(
                <div key={i} className="card__container__endpoint">
                  <div className="card__endpoint__header">
                    <h2 className="card__endpoint__title">{endpoint.name}</h2>
                    <h3 className="card__endpoint__uptime">{endpoint.uptime}% uptime</h3>
                  </div>
                  <div className="card__endpoint__timeline">
                    {
                      endpoint.days.map((dayValue, i) => {
                        // @todo: fix undefined return of a status
                        let status;
                        if (dayValue < 1 && dayValue >= THRESHOLD) {
                          status = 'card__timeline__card-day--status-warning';
                        }
                        else if (dayValue < THRESHOLD) {
                          status = 'card__timeline__card-day--status-error';
                        }
                        return <div key={i} className={`card__timeline__card-day ${status}`}></div>;
                      })
                    }
                  </div>
                </div>
              )
            })
          }
          </div>
        </div>
      </div>
    );
  }

  loadMockData(dayLimit) {
    let data = [];

    ENDPOINTS.map(endpoint => {
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
}

export default Card;