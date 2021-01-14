import {
  createSlice,
  createAsyncThunk,
  createSelector,
  createEntityAdapter,
} from '@reduxjs/toolkit';
import axios from 'axios';

const url = 'https://api.github.com/users/silverorange/repos';

const reposAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.created_at.localeCompare(a.created_at),
});

const initialState = reposAdapter.getInitialState({
  status: 'idle',
  error: null,
});

export const fetchRepos = createAsyncThunk('repos/fetchRepos', async () => {
  const response = await axios.get(url);
  // console.log(response.data);
  return response.data;
});

const reposSlice = createSlice({
  name: 'repos',
  initialState,
  reducers: {
    toggleTodo(state, action) {
      const todo = state.find((todoitem) => todoitem.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
  },
  extraReducers: {
    [fetchRepos.pending]: (state, action) => {
      state.status = 'loading';
    },
    [fetchRepos.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      // Add any fetched repos to the array
      reposAdapter.upsertMany(state, action.payload);
    },
    [fetchRepos.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },
  },
});

export const { toggleTodo } = reposSlice.actions;

export default reposSlice.reducer;

export const {
  selectAll: selectAllRepos,
  selectById: selectRepoById,
  selectIds: selectRepoIds,
} = reposAdapter.getSelectors((state) => state.repos);

export const selectReposByUser = createSelector(
  [selectAllRepos, (state, userId) => userId],
  (repos, userId) => repos.filter((repo) => repo.owner_id === userId)
);
