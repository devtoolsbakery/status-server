import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import CardEndpoint from '../components/CardEndpoint';
import * as Utils from '../utils';

import '../styles/components/Card.css';

class Card extends Component {
  constructor(props) {
    super();

    this.state = {
      ready : false
    }

    const timeAnimation = 300;
  }

  componentDidMount(){
    setTimeout(() => {
      this.setState({ready : 'ready'});
    }, this.state.timeAnimation)
  }

  render() {
    const data = Utils.loadCardMockData(this.props.dayLimit);

    return (
      <CardView>
        <CardAnimation ready={this.state.ready}>
          <CardTitle className={`card__title--status ${this.props.status}`} status={this.state.status}>{this.props.name}</CardTitle>
          <CardEndPointContainer>
            {
              data.map((endpoint, i) => {
                return(
                  <CardEndpoint data={endpoint} key={i} />
                )
              })
            }
          </CardEndPointContainer>
        </CardAnimation>
      </CardView>
    );
  }
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
`

const CardEndPointContainer = styled.div`
  padding: 2.4rem 3.2rem;
  border-radius: .4rem;
  background: var(--theme-card-background);
  border: var(--theme-card-border);
`

export default Card;
