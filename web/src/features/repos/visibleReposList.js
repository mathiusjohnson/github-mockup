import { connect } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import { toggleTodo } from 'features/todos/todosSlice';
import TodoList from './TodoList';
import { VisibilityFilters } from 'features/filters/filtersSlice';

const selectRepos = (state) => state.repos;
const selectFilter = (state) => state.visibilityFilter;

const selectVisibleRepos = createSelector(
  [selectRepos, selectFilter],
  (repos, filter) => {
    switch (filter) {
      case VisibilityFilters.SHOW_ALL:
        return repos;
      case VisibilityFilters.SHOW_COMPLETED:
        return repos.filter((t) => t.completed);
      case VisibilityFilters.SHOW_ACTIVE:
        return repos.filter((t) => !t.completed);
      default:
        throw new Error('Unknown filter: ' + filter);
    }
  }
);

const mapStateToProps = (state) => ({
  repos: selectVisibleRepos(state),
});

const mapDispatchToProps = { toggleTodo };

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
