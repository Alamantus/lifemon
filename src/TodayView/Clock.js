import React, { Component } from 'react';
import moment from 'moment';

import './clock.css';

class Clock extends Component {
  constructor(props) {
    super(props);

    this.state = {
      time: '',
      secondAngle: 0,
      minuteAngle: 0,
      hourAngle: 0,
    };
  }

  componentDidMount() {
    this.updateTime();
    if (!this.props.staticTime) {
      this.interval = setInterval(() => this.updateTime(), 1000);
    }
  }

  componentWillUnmount() {
    if (!this.props.staticTime) {
      clearInterval(this.interval);
    }
  }

  updateTime() {
    let date;
    if (this.props.staticTime) {
      date = moment(this.props.staticTime);
    } else {
      date = moment();
    }
    this.setState({
      time: date.format('h:mm:ss a'),
      secondAngle: date.seconds() * 6,
      minuteAngle: date.minutes() * 6,
      hourAngle: ((date.hours() % 12) * 30) + (date.minutes() / 2),
    });
  }

  render() {
    if (this.props.style === 'analog') {
      return (
        <svg viewBox="0 0 100 100" style={{ width: '50px', height: '50px', }}>
          <circle className="analog-clock-face" cx="50" cy="50" r="45" />
          <g className="analog-clock-hands">
            <rect className="analog-clock-hour" x="48.5" y="12.5" width="5" height="30" rx="2.5" ry="2.55" transform={ `rotate(${ this.state.hourAngle } 50 50)` } />
            <rect className="analog-clock-min" x="48" y="12.5" width="3" height="40" rx="2" ry="2" transform={ `rotate(${ this.state.minuteAngle } 50 50)` } />
            <line className="analog-clock-sec" x1="50" y1="50" x2="50" y2="16" transform={ `rotate(${ this.state.secondAngle } 50 50)` } />
          </g>
        </svg>
      )
    }

    return (
      <span>{ this.state.time }</span>
    );
  }
};

export default Clock;