import React, { Component } from 'react';
import styled, {css} from 'styled-components';


const CardEndpointTimeline = props => {
  const theshold = 0.7;

  return (
    <div className="flex">
      {
        props.data.days.map((dayValue, i) => {
          if (dayValue < 1 && dayValue >= theshold) {
            return <CardEndpointTimelineDayError key={i} />;
          }
          else if (dayValue < theshold) {
            return <CardEndpointTimelineDayWarning key={i} />;
          }
          
          return <CardEndpointTimelineDay key={i}  />;
        })
      }
    </div>
  )
}

const CardEndpointTimelineDay = styled.div`
  width: var(--theme-card-day-width);
  height: var(--theme-card-day-height);
  margin-right: .2rem;
  background: var(--theme-color-primary);
  border-radius: .1rem;
  display: flexbox;

  :last-child {
    margin-right: 0;
  }
`
const CardEndpointTimelineDayWarning = styled(CardEndpointTimelineDay)`
  background: var(--theme-color-warning);
  opacity: .5;
`
const CardEndpointTimelineDayError = styled(CardEndpointTimelineDay)`
  background: var(--theme-color-error);
  opacity: .5;
`

export default CardEndpointTimeline;
