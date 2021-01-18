import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import Footer from '../features/filters/Footer';
import SingleRepoPage from '../features/repos/singleRepoPage';
import { VisibleRepoList } from '../features/repos/VisibleRepoList';
import LanguageList from '../features/buttons/fetchLanguages';

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
