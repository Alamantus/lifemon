import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom";

import WeatherMenuItem from './WeatherMenuItem';

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
      const path = this.props.location.pathname;
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
        zIndex: 9,
        background: '#000000',
        opacity: 0.6,
      }
      return [
        <aside className={ `col-${ this.state.isSmallScreen ? '9' : '3' } border bg-white` }
          style={ this.state.isSmallScreen ? mobileCSS : null }
        >
          <header className="mb-3">
            <div className="row">
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
            </div>
            <div className="text-center">
              <WeatherMenuItem unit="F" />
            </div>
          </header>
          <nav>
            <ul className="nav flex-column nav-pills nav-fill" key="AppMenu">
              <li className="nav-item text-left" key="AppMenu_Today">
                <Link to="/" className={ `nav-link${path === '/' ? ' active' : ''}` }>Today</Link>
              </li>
              <li className="nav-item text-left" key="AppMenu_Plans">
                <Link to="/plans" className={ `nav-link${path === '/plans' ? ' active' : ''}` }>Plans</Link>
              </li>
              <li className="nav-item text-left" key="AppMenu_Journal">
                <Link to="/journal" className={ `nav-link${path === '/journal' ? ' active' : ''}` }>Journal</Link>
              </li>
              <li className="nav-item text-left" key="AppMenu_Time">
                <Link to="/time" className={ `nav-link${path === '/time' ? ' active' : ''}` }>Time</Link>
              </li>
              <li className="nav-item text-left" key="AppMenu_Log">
                <Link to="/log" className={ `nav-link${path === '/log' ? ' active' : ''}` }>Log</Link>
              </li>
              <li className="nav-item text-left" key="AppMenu_Settings">
                <Link to="/settings" className={ `nav-link${path === '/settings' ? ' active' : ''}` }>Settings</Link>
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

export default withRouter(AppMenu);