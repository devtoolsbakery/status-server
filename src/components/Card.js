import React, {Component} from 'react';
import '../css/Card.scss';

class Card extends Component {

  componentDidMount() {
    // Loads theme if needed
    if (this.props.theme) {
      try {
        require(`../css/themes/${this.props.theme}.scss`); 
      } catch (error) {
        console.error(error);
      }
    }
  }
  render() {
    return (
      <div className="card">
        <h1 className="card-title status-online">azure devops</h1>
        {/* <!-- Endpoint --> */}
        <div className="card-endpoint">
          <div className="card-endpoint-header">
            <h2 className="card-endpoint-header-title">API</h2>
            <h3 className="card-endpoint-header-uptime">99.75% uptime</h3>
          </div>
          <div className="card-timeline">
            {/* <!-- 30 days --> */}
            <div className="card-day"></div>
            <div className="card-day"></div>
            <div className="card-day"></div>
            <div className="card-day"></div>
            <div className="card-day"></div>
            <div className="card-day"></div>
            <div className="card-day"></div>
            <div className="card-day"></div>
            <div className="card-day"></div>
            <div className="card-day"></div>

            <div className="card-day"></div>
            <div className="card-day"></div>
            <div className="card-day"></div>
            <div className="card-day"></div>
            <div className="card-day"></div>
            <div className="card-day"></div>
            <div className="card-day status-warning"></div>
            <div className="card-day"></div>
            <div className="card-day"></div>
            <div className="card-day"></div>

            <div className="card-day"></div>
            <div className="card-day"></div>
            <div className="card-day"></div>
            <div className="card-day"></div>
            <div className="card-day"></div>
            <div className="card-day status-error"></div>
            <div className="card-day"></div>
            <div className="card-day"></div>
            <div className="card-day"></div>
            <div className="card-day"></div>

            {/* <!-- 60 days --> */}

            <div className="card-day"></div>
            <div className="card-day"></div>
            <div className="card-day"></div>
            <div className="card-day"></div>
            <div className="card-day"></div>
            <div className="card-day"></div>
            <div className="card-day"></div>
            <div className="card-day"></div>
            <div className="card-day"></div>
            <div className="card-day"></div>

            <div className="card-day"></div>
            <div className="card-day"></div>
            <div className="card-day"></div>
            <div className="card-day"></div>
            <div className="card-day"></div>
            <div className="card-day"></div>
            <div className="card-day"></div>
            <div className="card-day"></div>
            <div className="card-day"></div>
            <div className="card-day"></div>

            <div className="card-day"></div>
            <div className="card-day"></div>
            <div className="card-day"></div>
            <div className="card-day"></div>
            <div className="card-day"></div>
            <div className="card-day"></div>
            <div className="card-day"></div>
            <div className="card-day"></div>
            <div className="card-day"></div>
            <div className="card-day"></div>

            {/* <!-- 90 days --> */}

            <div className="card-day"></div>
            <div className="card-day"></div>
            <div className="card-day"></div>
            <div className="card-day"></div>
            <div className="card-day"></div>
            <div className="card-day"></div>
            <div className="card-day"></div>
            <div className="card-day"></div>
            <div className="card-day"></div>
            <div className="card-day"></div>

            <div className="card-day"></div>
            <div className="card-day"></div>
            <div className="card-day"></div>
            <div className="card-day"></div>
            <div className="card-day"></div>
            <div className="card-day"></div>
            <div className="card-day"></div>
            <div className="card-day"></div>
            <div className="card-day"></div>
            <div className="card-day"></div>

            <div className="card-day"></div>
            <div className="card-day"></div>
            <div className="card-day"></div>
            <div className="card-day"></div>
            <div className="card-day"></div>
            <div className="card-day"></div>
            <div className="card-day"></div>
            <div className="card-day"></div>
            <div className="card-day"></div>
            <div className="card-day"></div>
          </div>
        </div>
        <div className="card-endpoint">
          <div className="card-endpoint-header">
            <h2 className="card-endpoint-header-title">Production</h2>
            <h3 className="card-endpoint-header-uptime">99.75% uptime</h3>
          </div>
          <div className="card-timeline">
            {/* <!-- 30 days --> */}
            <div className="card-day"></div>
            <div className="card-day"></div>
            <div className="card-day"></div>
            <div className="card-day"></div>
            <div className="card-day"></div>
            <div className="card-day"></div>
            <div className="card-day"></div>
            <div className="card-day"></div>
            <div className="card-day"></div>
            <div className="card-day"></div>

            <div className="card-day"></div>
            <div className="card-day"></div>
            <div className="card-day"></div>
            <div className="card-day status-warning"></div>
            <div className="card-day"></div>
            <div className="card-day"></div>
            <div className="card-day"></div>
            <div className="card-day"></div>
            <div className="card-day"></div>
            <div className="card-day"></div>

            <div className="card-day"></div>
            <div className="card-day"></div>
            <div className="card-day"></div>
            <div className="card-day"></div>
            <div className="card-day"></div>
            <div className="card-day status-warning"></div>
            <div className="card-day status-warning"></div>
            <div className="card-day status-warning"></div>
            <div className="card-day"></div>
            <div className="card-day"></div>

            {/* <!-- 60 days --> */}

            <div className="card-day"></div>
            <div className="card-day"></div>
            <div className="card-day"></div>
            <div className="card-day"></div>
            <div className="card-day"></div>
            <div className="card-day"></div>
            <div className="card-day"></div>
            <div className="card-day"></div>
            <div className="card-day"></div>
            <div className="card-day"></div>

            <div className="card-day"></div>
            <div className="card-day"></div>
            <div className="card-day"></div>
            <div className="card-day"></div>
            <div className="card-day"></div>
            <div className="card-day"></div>
            <div className="card-day"></div>
            <div className="card-day"></div>
            <div className="card-day"></div>
            <div className="card-day status-error"></div>

            <div className="card-day"></div>
            <div className="card-day"></div>
            <div className="card-day"></div>
            <div className="card-day"></div>
            <div className="card-day"></div>
            <div className="card-day"></div>
            <div className="card-day"></div>
            <div className="card-day"></div>
            <div className="card-day"></div>
            <div className="card-day"></div>

            {/* <!-- 90 days --> */}

            <div className="card-day"></div>
            <div className="card-day"></div>
            <div className="card-day"></div>
            <div className="card-day"></div>
            <div className="card-day"></div>
            <div className="card-day"></div>
            <div className="card-day"></div>
            <div className="card-day"></div>
            <div className="card-day"></div>
            <div className="card-day"></div>

            <div className="card-day"></div>
            <div className="card-day"></div>
            <div className="card-day"></div>
            <div className="card-day"></div>
            <div className="card-day"></div>
            <div className="card-day"></div>
            <div className="card-day"></div>
            <div className="card-day"></div>
            <div className="card-day"></div>
            <div className="card-day"></div>

            <div className="card-day"></div>
            <div className="card-day status-warning"></div>
            <div className="card-day status-warning"></div>
            <div className="card-day"></div>
            <div className="card-day"></div>
            <div className="card-day"></div>
            <div className="card-day"></div>
            <div className="card-day"></div>
            <div className="card-day"></div>
            <div className="card-day"></div>
          </div>
        </div>
        <div className="card-endpoint">
          <div className="card-endpoint-header">
            <h2 className="card-endpoint-header-title">Staging</h2>
            <h3 className="card-endpoint-header-uptime">99.75% uptime</h3>
          </div>
          <div className="card-timeline">
            {/* <!-- 30 days --> */}
            <div className="card-day"></div>
            <div className="card-day"></div>
            <div className="card-day"></div>
            <div className="card-day"></div>
            <div className="card-day"></div>
            <div className="card-day"></div>
            <div className="card-day"></div>
            <div className="card-day"></div>
            <div className="card-day"></div>
            <div className="card-day"></div>

            <div className="card-day"></div>
            <div className="card-day"></div>
            <div className="card-day status-error"></div>
            <div className="card-day status-error"></div>
            <div className="card-day"></div>
            <div className="card-day"></div>
            <div className="card-day status-warning"></div>
            <div className="card-day"></div>
            <div className="card-day"></div>
            <div className="card-day"></div>

            <div className="card-day"></div>
            <div className="card-day"></div>
            <div className="card-day"></div>
            <div className="card-day"></div>
            <div className="card-day"></div>
            <div className="card-day status-warning"></div>
            <div className="card-day"></div>
            <div className="card-day"></div>
            <div className="card-day"></div>
            <div className="card-day"></div>

            {/* <!-- 60 days --> */}

            <div className="card-day"></div>
            <div className="card-day"></div>
            <div className="card-day"></div>
            <div className="card-day"></div>
            <div className="card-day"></div>
            <div className="card-day"></div>
            <div className="card-day"></div>
            <div className="card-day"></div>
            <div className="card-day"></div>
            <div className="card-day"></div>

            <div className="card-day"></div>
            <div className="card-day"></div>
            <div className="card-day"></div>
            <div className="card-day"></div>
            <div className="card-day"></div>
            <div className="card-day"></div>
            <div className="card-day"></div>
            <div className="card-day"></div>
            <div className="card-day"></div>
            <div className="card-day"></div>

            <div className="card-day"></div>
            <div className="card-day"></div>
            <div className="card-day"></div>
            <div className="card-day"></div>
            <div className="card-day"></div>
            <div className="card-day"></div>
            <div className="card-day"></div>
            <div className="card-day"></div>
            <div className="card-day"></div>
            <div className="card-day"></div>

            {/* <!-- 90 days --> */}

            <div className="card-day"></div>
            <div className="card-day"></div>
            <div className="card-day"></div>
            <div className="card-day"></div>
            <div className="card-day"></div>
            <div className="card-day"></div>
            <div className="card-day"></div>
            <div className="card-day"></div>
            <div className="card-day"></div>
            <div className="card-day"></div>

            <div className="card-day"></div>
            <div className="card-day"></div>
            <div className="card-day"></div>
            <div className="card-day"></div>
            <div className="card-day"></div>
            <div className="card-day"></div>
            <div className="card-day"></div>
            <div className="card-day"></div>
            <div className="card-day"></div>
            <div className="card-day"></div>

            <div className="card-day"></div>
            <div className="card-day"></div>
            <div className="card-day"></div>
            <div className="card-day"></div>
            <div className="card-day"></div>
            <div className="card-day"></div>
            <div className="card-day"></div>
            <div className="card-day"></div>
            <div className="card-day"></div>
            <div className="card-day"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default Card;