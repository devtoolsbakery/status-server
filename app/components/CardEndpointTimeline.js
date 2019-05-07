import React from 'react';
import styled from 'styled-components';

const theshold = 0.7;

const CardEndpointTimeline = props => {
  const days = props.data.days;
  
  return (
    <div className="flex">
      {days.map(dayToComponent)}
    </div>
  )
}

const dayToComponent = (dayValue, i) => {
  if (dayValue < 1 && dayValue >= theshold) {
    return <CardEndpointTimelineDayError key={i} />;
  }
  else if (dayValue < theshold) {
    return <CardEndpointTimelineDayWarning key={i} />;
  }

  return <CardEndpointTimelineDay key={i}  />;
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
