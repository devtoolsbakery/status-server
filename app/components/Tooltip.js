import React, { Component, Fragment } from 'react';
import styled from 'styled-components';


class Tooltip extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      content: props.content, // TODO: pass the real data once we implement the fetch of real data
      display: false,
      // posX: 0,
      // posY: 0,
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

const TooltipView = styled.div`
  line-height: 1.2em;
  max-width: 12.0rem;
  background: #000;
  color: var(--theme-body-font-color);
  border-radius: .4rem;
  padding: .8rem 1.2rem;
  font-size: 1.3rem;
  position: absolute;
  margin-top: -900%;
  z-index: 1;

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
