import React, { Component } from 'react';
import { Link } from "react-router-dom";

class AppMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: true,
      isSmallScreen: false,
    };
  }

  componentDidMount() {
    const screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    if (screenWidth < 600) {
      this.setState({
        isOpen: false,
        isSmallScreen: true,
      });
    }
  }

  setOpen(isOpen = true) {
    this.setState({ isOpen });
  }

  render() {
    if (this.state.isOpen) {
      const mobileCSS = {
        position: 'fixed',
        zIndex: 10,
      }
      const mobileBackgroundCSS = {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1,
        background: '#000000',
        opacity: 0.6,
      }
      return [
        <aside className={ `col-${ this.state.isSmallScreen ? '9' : '3' } border bg-white` }
          style={ this.state.isSmallScreen ? mobileCSS : null }
        >
          <header className="row">
            <div className="col-10">
              <h2 className="h4">lifemon</h2>
            </div>
            <div className="col-2 text-right">
              {
                this.state.isSmallScreen
                ? <button type="button" className="close" aria-label="Close" onClick={() => this.setOpen(false)}>
                  <span aria-hidden="true">&times;</span>
                </button>
                : null
              }
            </div>
          </header>
          <nav>
            <ul className="nav flex-column nav-pills nav-fill">
              <li className="nav-item text-left">
                <Link to="/" className="nav-link active">Today</Link>
              </li>
              {/*
              <li className="nav-item text-left">
                <Link to="/weather" className="nav-link">Weather</Link>
              </li>
              */}
              <li className="nav-item text-left">
                <Link to="/plans" className="nav-link">Plans</Link>
              </li>
              <li className="nav-item text-left">
                <Link to="/journal" className="nav-link">Journal</Link>
              </li>
              <li className="nav-item text-left">
                <Link to="/time" className="nav-link">Time</Link>
              </li>
              <li className="nav-item text-left">
                <Link to="/log" className="nav-link">Log</Link>
              </li>
            </ul>
          </nav>
        </aside>,
        this.state.isSmallScreen
        ? <div style={ mobileBackgroundCSS } onClick={ () => this.setOpen(false) }></div>
        : null,
      ];
    }

    return (
      <aside className="col-1">
        <button type="button" className="btn btn-outline-secondary" onClick={() => this.setOpen()}>
          &#9776;
        </button>
      </aside>
    );
  }
}

export default AppMenu;