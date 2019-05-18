import React from 'react';
import Tooltip from '../components/Tooltip';
import styled from 'styled-components';

const theshold = 0.7;

const CardEndpointTimeline = props => {
  const days = props.data.days;
  const daysNum = days.length;
  
  return (
    <div className="flex">
      {days.map((dayValue, i) => dayToComponent(dayValue, i, daysNum))}
    </div>
  )
}

const dayToComponent = (dayValue, i, daysNum) => {
  let className = '';

  if (dayValue < 1 && dayValue >= theshold) {
    className = 'error';
  }
  else if (dayValue < theshold) {
    className = 'warning';
  }

  // last item of the row
  if (i === (daysNum - 1)) {
    className = `${className} last`;
  }  

  return(
    <Tooltip content={dayValue} key={i}>
      <CardEndpointTimelineDay className={className} />
    </Tooltip>
    );
}

const CardEndpointTimelineDay = styled.div`
  width: var(--theme-card-day-width);
  height: var(--theme-card-day-height);
  margin-right: .2rem;
  background: var(--theme-color-primary);
  border-radius: .1rem;
  display: flexbox;

  &.last {
    margin-right: 0;
  }

  &.warning {
    background: var(--theme-color-warning);
    opacity: .5;
  }

  &.error {
    background: var(--theme-color-error);
    opacity: .5;
  }
`

export default CardEndpointTimeline;
