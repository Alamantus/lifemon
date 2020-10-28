import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import logo from './logo.svg';
import './App.css';

import TodayView from './TodayView';
import Tasks from './Tasks';

function App() {
  return (
    <Router>
      <main className="container">
        <header>
          <ul>
            <li>
              <Link to="/">Today</Link>
            </li>
            {/*
            <li>
              <Link to="/weather">Weather</Link>
            </li>
            */}
            <li>
              <Link to="/tasks">Tasks</Link>
            </li>
          </ul>
        </header>

        {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
        <Switch>
          <Route exact path="/">
            <TodayView />
          </Route>
          {/*
          <Route path="/weather">
            <Weather />
          </Route>
          */}
          <Route path="/tasks">
            <Tasks />
          </Route>
        </Switch>
      </main>
    </Router>
  );
}

export default App;
