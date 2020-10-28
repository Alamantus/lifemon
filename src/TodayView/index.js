import React, { Component } from 'react';
import moment from 'moment';

import Clock from './Clock';

class TodayView extends Component {
  render() {
    const TODAY_DATE = moment().format('MMMM Do YYYY');

    return <section>
      <header>
        <button className="btn btn-primary btn-lg">
          <span>{ TODAY_DATE }</span> <Clock style="analog" />
        </button>
      </header>
    </section>;
  }
}

export default TodayView;