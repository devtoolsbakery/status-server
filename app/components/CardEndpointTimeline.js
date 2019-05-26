import React from 'react';
import Tooltip from '../components/Tooltip';
import styled from 'styled-components';

const theshold = 0.7;

const CardEndpointTimeline = props => {
  const days = props.data.dailyStats;
  const daysNum = days.length;
  
  return (
    <div className="h-flex h-pointer">
      {days.map((dayValue, i) => dayToComponent(dayValue, i, daysNum))}
    </div>
  )
}

const dayToComponent = (dayStats, i, daysNum) => {
  const { status, responseTime } = dayStats;
  let className = '';

  if (status === 'ERROR') {
    className = 'error';
  }
  else if (status === 'WARNING') {
    className = 'warning';
  }

  // last item of the row
  if (i === (daysNum - 1)) {
    className = `${className} last`;
  }  

  return(
    <Tooltip content={`Day and value ${responseTime}`} key={i}>
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

  &:hover {
    transform: scale(1.5);
  }
`

export default CardEndpointTimeline;
