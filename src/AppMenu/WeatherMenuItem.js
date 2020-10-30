import React, { Component } from 'react';
import { Link } from "react-router-dom";
import localforage from 'localforage';
import WeatherIcon from 'react-icons-weather';

class WeatherMenuItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      weatherIsSetup: false,
      weather: null,
      weatherId: 200,
      temperature: 60,
    };
  }
  
  componentDidMount() {
    // Get the weather here
    // https://openweathermap.org/price
    localforage.getItem('weatherSetup').then(value => {
      if (value) {
        this.setState({ weatherIsSetup: true });
      }
    });
  }
  
  render() {
    if (this.state.weatherIsSetup) {
      return (
        <Link to="/weather" className="btn btn-outline-primary">
          <WeatherIcon name="owm" iconId={ this.state.weatherId } />
          <span>{ this.state.temperature }{ this.props.units === 'F' ? '\u2103' : '\u2109'}</span>
        </Link>
      )
    }

    return (
      <Link to="/settings#weather" className="btn btn-outline-primary">
        <span>Set up Weather &#9881;</span>
      </Link>
    );
  }
}

export default WeatherMenuItem;