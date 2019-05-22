import React, { Component, Fragment } from 'react';
import styled, { keyframes } from 'styled-components';


class Tooltip extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      content: props.content, // TODO: pass the real data once we implement the fetch of real data
      display: false,
    }
  }
  
  render() {
    const { display, content } = this.state;

    return (
      <div className='h-relative' onMouseEnter={() => this.showTooltip()} onMouseLeave={() => this.hideTooltip()}>
        {this.props.children}
        {display && <TooltipView>{content}</TooltipView>}
      </div>
    )
  }

  showTooltip() {
    this.setState({ display: true });
  }

  hideTooltip() {
    this.setState({ display: false });
  }
}

const TooltipAnimation = keyframes`
  from {
    transform: translateY(.4rem);
    opacity: 1;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const TooltipView = styled.div`
  line-height: 1.2em;
  min-width: 13.2rem;
  background: #000;
  color: var(--theme-body-font-color);
  border-radius: .4rem;
  padding: .8rem 1.2rem;
  font-size: 1.3rem;
  position: absolute;
  margin-top: -950%;
  left: -200%;
  z-index: 1;
  animation: ${TooltipAnimation} .15s linear;

  :after {
    width: .8rem;
    height .8rem;
    content: '';
    position: absolute;
    margin: 0 auto;
    top: 0;
    bottom: 0;
    left: calc(100% - 4.0rem);
    right: 0;
  }
`

export default Tooltip;
