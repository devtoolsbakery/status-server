import React from 'react';
import styled from 'styled-components';
import CardEndpointTimeline from './CardEndpointTimeline';


const CardEndpoint = props => {
  return (
    <CardEndpointView>
      <CardEndpointHeader>
        <CardEndpointTitle>{props.data.name}</CardEndpointTitle>
        <CardEndpointUptime>{props.data.uptime}% uptime</CardEndpointUptime>
      </CardEndpointHeader>
      <CardEndpointTimeline data={props.data} />
    </CardEndpointView>
  )
}

const CardEndpointView = styled.div`
  margin-bottom: 3.0rem;

  :last-child {
    margin-bottom: 1.6rem;
  }
`
const CardEndpointHeader = styled.div`
  display: flex;
  justify-content: space-between;
  line-height: 3.2rem;
  align-items: baseline;
`
const CardEndpointTitle = styled.h2`
  margin: 0;
  font-size: var(--base-font-size);
`
const CardEndpointUptime = styled.h3`
  margin: 0;
  font-size: 1.2rem;
  text-align: right;
  color: var(--theme-color-uptime);
`

export default CardEndpoint;
