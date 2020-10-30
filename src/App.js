import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import logo from './logo.svg';
import './App.css';

import AppMenu from './AppMenu';
import TodayView from './TodayView';
import Tasks from './Tasks';

function App() {
  return (
    <Router>
      <main className="row">
        <AppMenu />

        <section className="col">
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
            <Route path="/plans">
              <Tasks />
            </Route>
          </Switch>
        </section>
      </main>
    </Router>
  );
}

export default App;
