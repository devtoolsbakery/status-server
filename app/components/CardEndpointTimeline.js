import React, { Component } from 'react';
import styled from 'styled-components';


// TODO: refactor with styled components
const CardEndpointTimeline = props => {
  return (
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
  )
}


export default CardEndpointTimeline;
