import React, { Component } from 'react';
import styled from 'styled-components';
import * as Utils from '../utils';

import '../styles/components/Card.css';

const THRESHOLD = 0.7;

class Card extends Component {
  constructor(props) {
    super();

    this.state = {
      status  : props.status,
      data    : Utils.loadCardMockData(props.dayLimit),
      ready   : false,
      time    : 300 // fade-in animation
    }
  }

  componentDidMount(){
    setTimeout(() => {
      this.setState({ready : 'card--ready'});
    }, this.state.time)
  }

  render() {
    return (
      <div className="card__module">
        <div className={`card ${this.state.ready}`}>
          <h1 className={`card__title card__title--status ${this.state.status}`}>{this.props.name}</h1>
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
}

export default Card;
