import { connect } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import { toggleTodo } from '../repos/reposSlice';
import ReposList from './reposList';
import { selectAllRepos } from './reposSlice';

import { VisibilityFilters } from '../filters/filtersSlice';

const selectFilter = (state) => state.visibilityFilter;

// console.log('repos: ', selectAllRepos);
const selectVisibleRepos = createSelector(
  [selectAllRepos, selectFilter],
  (repos, filter) => {
    console.log('repos: ', repos);
    switch (filter) {
      case VisibilityFilters.SHOW_ALL:
        return repos;
      case VisibilityFilters.Javascript:
        return repos.filter((t) => t.language === 'Javascript');
      case VisibilityFilters.Typescript:
        return repos.filter((t) => t.language === 'Typescript');
      case VisibilityFilters.CSS:
        return repos.filter((t) => !t.language === 'CSS');
      default:
        throw new Error('Unknown filter: ' + filter);
    }
  }
);

const mapStateToProps = (state) => ({
  repos: selectVisibleRepos(state),
});

const mapDispatchToProps = { toggleTodo };

export default connect(mapStateToProps, mapDispatchToProps)(ReposList);
