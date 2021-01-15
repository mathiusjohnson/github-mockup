import { connect } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import { toggleTodo } from '../repos/reposSlice';
import ReposList from './reposList';

import { VisibilityFilters } from '../filters/filtersSlice';
// eslint-disable-next-line react-hooks/rules-of-hooks

const selectRepos = (state) => state;
const selectFilter = (state) => state.visibilityFilter;

// console.log('repos: ', selectRepos);
const selectVisibleRepos = createSelector(
  [selectRepos, selectFilter],
  (repos, filter) => {
    console.log('repos: ', repos);
    switch (filter) {
      case VisibilityFilters.SHOW_ALL:
        return repos;
      case VisibilityFilters.Javascript:
        // console.log(repos);
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

const visibleReposList = connect(
  mapStateToProps,
  mapDispatchToProps
)(ReposList);

export default visibleReposList;
