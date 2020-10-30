import React, { Component } from 'react';
import moment from 'moment';

import Clock from './Clock';

class TodayView extends Component {
  render() {
    const TODAY_DATE = moment().format('MMMM Do YYYY');

    return <article>
      <header className="nav justify-content-center">
        <button className="btn btn-primary btn-lg nav-link">
          <span>{ TODAY_DATE }</span> <Clock style="analog" />
        </button>
      </header>
    </article>;
  }
}

export default TodayView;