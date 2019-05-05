import React, { Component } from 'react';


// TODO: refactor with styled components
const CardEndpoint = props => {
  return (
    <div className="card__container__endpoint">
      <div className="card__endpoint__header">
        <h2 className="card__endpoint__title">{props.data.name}</h2>
        <h3 className="card__endpoint__uptime">{props.data.uptime}% uptime</h3>
      </div>
      <div className="card__endpoint__timeline">
        {
          props.data.days.map((dayValue, i) => {
            let status = null;
            const theshold = 0.7;

            if (dayValue < 1 && dayValue >= theshold) {
              status = 'card__timeline__card-day--status-warning';
            }
            else if (dayValue < theshold) {
              status = 'card__timeline__card-day--status-error';
            }
            return <div key={i} className={`card__timeline__card-day ${status}`}></div>;
          })
        }
      </div>
    </div>
  )
}

export default CardEndpoint;
