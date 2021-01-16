import { connect } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import RepoList from './RepoList';
import { VisibilityFilters } from '../filters/filtersSlice';
// import { fetchRepos } from 'features/repos/reposSlice';

const selectRepos = (state) => state;
const selectFilter = (state) => state.visibilityFilter;

const selectVisibleRepos = createSelector(
  [selectRepos, selectFilter],
  (repos, filter) => {
    const repoKeys = Object.keys(repos.repos.entities);
    const repoArr = [];
    repoKeys.forEach((key) => {
      repoArr.push(repos.repos.entities[key]);
    });
    switch (filter) {
      case VisibilityFilters.SHOW_ALL:
        return repoArr;
      case VisibilityFilters.JAVASCRIPT:
        return repoArr.filter((t) => t.language === 'JavaScript');
      case VisibilityFilters.TYPESCRIPT:
        return repoArr.filter((t) => t.language === 'TypeScript');
      case VisibilityFilters.CSS:
        return repoArr.filter((t) => !t.language === 'CSS');
      default:
        throw new Error('Unknown filter: ' + filter);
    }
  }
);

const mapStateToProps = (state) => ({
  repos: selectVisibleRepos(state),
});

export const VisibleRepoList = connect(mapStateToProps)(RepoList);
