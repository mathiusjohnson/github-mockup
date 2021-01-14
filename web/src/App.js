import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import ReposList from './features/repos/reposList';
import SingleRepoPage from './features/repos/singleRepoPage';
function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route
            exact={true}
            path="/"
            render={() => (
              <React.Fragment>
                <ReposList />
              </React.Fragment>
            )}
          />
          <Route
            exact={true}
            path="/repos/:repoId"
            component={SingleRepoPage}
          />
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
