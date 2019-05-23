import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import CardEndpoint from '../components/CardEndpoint';

import '../styles/components/Card.css';


class Card extends Component {
  constructor(props) {
    super();

    this.state = {
      ready     : false
    }
  }

  componentDidMount(){
    const animationTime = 300;
    setTimeout(() => {
      this.setState({ready : 'ready'});
    }, animationTime);
  }

  render() {
    const { status, name, endpoints } = this.props;

    return (
      <>
        <CardView>
          <CardAnimation ready={this.state.ready}>
            <CardTitle className={`${status}`} status={status}>{name}</CardTitle>
            <CardEndPointContainer>
              {endpoints.map(endpointToComponent)}
            </CardEndPointContainer>
          </CardAnimation>
        </CardView>
      </>
    );
  }
  
}

const endpointToComponent = (endpointValue, i) => {
  return <CardEndpoint data={endpointValue} key={i} />;
}

const CardView = styled.div`
  display: flex;
  justify-content: center;
  color: var(--theme-body-font-color);
  background: var(--theme-body-background);
`
const CardAnimation = styled.div`
  margin: 0 auto;
  opacity: 0;
  transform: translateY(.8rem) scale(.98);

  ${props =>
    props.ready &&
    css`
      transition: all 1.0s ease;
      opacity: 1.0;
      transform: translateY(0rem) scale(1.0);
    `};
`
const CardTitle = styled.h1`
  margin: 0 0 4.4rem;
  padding-left: 3.2rem;
  font-weight: 500;
  font-size: var(--theme-card-title-font);
  line-height: var(--theme-card-title-font);
  position: relative;
  display: inline-block;

  :after {
    width: 1.2rem;
    height: 1.2rem;
    position: absolute;
    top: .4rem;
    left: 0;
    content: '';
    z-index: 1;
    border-radius: 100%;
    border: .2rem solid rgba(#000, .5);
  }
  :before {
    width: 1.6rem;
    height: 1.6rem;
    position: absolute;
    top: .2rem;
    left: -.2rem;
    content: '';
    border-radius: 100%;
    filter: blur(.4rem);
  }

  &.online {
    :after {
      background: var(--theme-color-primary);
    }
    :before {
      background: var(--theme-color-primary);
      box-shadow: 0 0 2.4rem var(--theme-color-primary);
    }
  }

  &.warning {
    :after {
      background: var(--theme-color-status-warning);
    }
    :before {
      background: var(--theme-color-status-warning);
      box-shadow: 0 0 2.4rem var(--theme-color-status-warning);
    }
  }

  &.error {
    :after {
      background: var(--theme-color-error);
    }
    :before {
      background: var(--theme-color-error);
      box-shadow: 0 0 2.4rem var(--theme-color-error);
    }
  }
`
const CardEndPointContainer = styled.div`
  padding: 2.4rem 3.2rem;
  border-radius: .4rem;
  background: var(--theme-card-background);
  border: var(--theme-card-border);
`

export default Card;
