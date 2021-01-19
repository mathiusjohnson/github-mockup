import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import SingleRepoPage from '../features/repos/singleRepoPage';
import { VisibleRepoList } from '../features/repos/VisibleRepoList';

function App() {
  return (
    <Router>
      <div className="App">
        {/* <CommitList /> */}
        <Switch>
          <Route
            exact={true}
            path="/"
            render={() => (
              <React.Fragment>
                <VisibleRepoList />
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
