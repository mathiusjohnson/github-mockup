import { connect } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import ReposList from './reposList';
import { VisibilityFilters } from '../filters/filtersSlice';

const selectRepos = (state) => state;
const selectFilter = (state) => state.visibilityFilter;

const selectVisibleRepos = createSelector(
  [selectRepos, selectFilter],
  (repos, filter) => {
    const repoKeys = Object.keys(repos.repos.entities);
    const repoArr = []
    repoKeys.forEach(key => {
      repoArr.push(repos.repos.entities[key]);
    });
    switch (filter) {
      case VisibilityFilters.SHOW_ALL:
        return repoArr;
      case VisibilityFilters.JAVASCRIPT:
        console.log('javascript filter triggered');
        return repoArr.filter((t) => t.language === 'Javascript');
      case VisibilityFilters.TYPESCRIPT:
        return repoArr.filter((t) => t.language === 'Typescript');
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

export default connect(mapStateToProps)(ReposList);
