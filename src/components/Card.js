import React, {Component} from 'react';
import '../css/Card.scss';
const THRESHOLD = 0.7;
const ENDPOINTS = ['API', 'Production', 'Staging', 'QA'];

class Card extends Component {
  constructor(props) {
    super();

    this.state = {
      data : this.loadMockData(props.dayLimit)
    }
  }

  componentDidMount() {
    // Checks for theme and loads if needed
    if (this.props.theme) {
      try {
        require(`../css/themes/${this.props.theme}.scss`); 
      } catch (error) {
        console.error(error);
      }
    }
  }
  render() {
    return (
      <div className="card">
        <h1 className="card-title status-online">{this.props.name}</h1>
        {
          this.state.data.map(endpoint =>
            <div className="card-endpoint">
              <div className="card-endpoint-header">
                <h2 className="card-endpoint-header-title">{endpoint.name}</h2>
                <h3 className="card-endpoint-header-uptime">{endpoint.uptime}% uptime</h3>
              </div>
              <div className="card-timeline">
                {
                  endpoint.days.map((dayValue, i) => {
                    let status;
                    if (dayValue < 1 && dayValue >= THRESHOLD) {
                      status = 'status-warning';
                    }
                    else if (dayValue < THRESHOLD) {
                      status = 'status-error';
                    }
                    return <div key={i} className={`card-day ${status}`}></div>;
                  })
                }
              </div>
            </div>
          )
        }
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